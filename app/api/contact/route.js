import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 🔍 1. DIAGNOSTICS: Read environment credentials on server execution
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const n8nUrl = process.env.N8N_WEBHOOK_URL;

    // Defensively check environment variable presence before initializing client context
    if (!url || !key) {
      console.error(
        "❌ CONFIG FAILURE: Your .env.local file is either missing, misplaced at the wrong directory root, or its keys are spelled incorrectly.",
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Database configuration error. Please look at your server terminal console.",
        },
        { status: 500 },
      );
    }

    // Securely instantiate the master Supabase connection client
    const supabase = createClient(url, key);

    // 2. Ingest the layout request payload submitted from your React form page
    const body = await request.json();
    const { name, email, company, message, needs } = body;

    // Quick baseline verification check
    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and Email are required input parameters.",
        },
        { status: 400 },
      );
    }

    console.log(
      `📥 Inbound submission received from: ${name}. Attempting to write records to Supabase...`,
    );

    // 3. Direct secure injection write execution to your Supabase table
    // ⚠️ DEFENSIVE: Standardize all structures precisely to avoid mapping exceptions
    const { error: dbError } = await supabase.from("leads").insert([
      {
        name: String(name),
        email: String(email),
        company: company ? String(company) : "Not Specified",
        message: message ? String(message) : "No message provided",
        needs: Array.isArray(needs) ? needs : [],
      },
    ]);

    // Handle structural schema rejections cleanly
    if (dbError) {
      console.error(
        "❌ SUPABASE POSTGRES WRITE ERROR REJECT:",
        dbError.message,
      );
      return NextResponse.json(
        {
          success: false,
          error: `Supabase database write rejected: ${dbError.message}`,
        },
        { status: 500 },
      );
    }

    console.log(
      "🗄️ Success! Entry safely logged in your Supabase leads table.",
    );

    // 4. Safely forward data payload to your active n8n automation webhook pipeline
    if (n8nUrl) {
      try {
        const n8nResponse = await fetch(n8nUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            company,
            message,
            needs,
            timestamp: new Date(),
          }),
        });

        if (n8nResponse.ok) {
          console.log(
            "🚀 Webhook data payload cleanly pushed to your active n8n canvas!",
          );
        } else {
          console.warn(
            `⚠️ n8n webhook returned an error status code: ${n8nResponse.status}`,
          );
        }
      } catch (webhookErr) {
        console.warn(
          "⚠️ WARNING: Lead logged in Supabase, but failed to connect to n8n webhook target path:",
          webhookErr.message,
        );
        // We do not crash the user request if n8n is temporarily offline, as your core lead data is safe inside the database!
      }
    }

    return NextResponse.json(
      { success: true, message: "Lead recorded successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("💥 SYSTEM EXCEPTION CRASH TRIGGERED:", error);
    return NextResponse.json(
      { success: false, error: "Internal system synchronization failure." },
      { status: 500 },
    );
  }
}
