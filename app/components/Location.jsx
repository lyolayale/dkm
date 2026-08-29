import Image from "next/image";

export default function Location({ darkMode }) {
  return (
    <section
      id="location"
      className={`pb-24 pt-10 border-t transition-colors duration-300 relative ${
        darkMode ? "bg-slate-950 border-slate-900" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-24 h-12 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-1 shadow-md mb-5">
          <Image
            src="/dkm-logo-final-01.jpeg"
            alt="Digital Keys & Marketing Core Form Asset Logo"
            width={80}
            height={40}
            className="object-contain brightness-190"
            loading="eager"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-600 font-bold">
                Global Agency Core
              </span>

              <h3
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Our Headquarters
              </h3>
            </div>

            <div className="space-y-4 text-sm font-normal">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">📍</span>
                <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                  <strong>Digital Keys & Marketing LLC</strong>
                  <br />
                  8025 Woodrow Rd
                  <br />
                  Stonecrest, GA 30038
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">⏰</span>
                <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                  <strong>Hours of Operation:</strong>
                  <br />
                  Monday – Friday: 9:00 AM – 6:00 PM EST
                  <br />
                  Weekend Dispatch: Closed
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">✉️</span>
                <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                  <strong>Inquiries:</strong> ops@digitalkeysmarketing.com
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <SocialLink
                  href="https://instagram.com"
                  label="Follow Digital Keys & Marketing on Instagram"
                  darkMode={darkMode}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.014-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.28-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </SocialLink>

                <SocialLink
                  href="https://x.com"
                  label="Follow Digital Keys & Marketing on X"
                  darkMode={darkMode}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z" />
                  </svg>
                </SocialLink>

                <SocialLink
                  href="https://linkedin.com"
                  label="Connect with Digital Keys & Marketing on LinkedIn"
                  darkMode={darkMode}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </SocialLink>
              </div>
            </div>
          </div>

          <div
            className={`lg:col-span-7 w-full h-95 sm:h-112.5 relative rounded-2xl border overflow-hidden shadow-xl group transition-all duration-300 ${
              darkMode ? "border-slate-800" : "border-slate-200"
            }`}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13259.756686098852!2d-84.40318792878818!3d33.81388280013965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f505a89add1e3d%3A0x8537ff21165ef27b!2s123%20Atlanta%20Rd%2C%20Atlanta%2C%20GA%2030309!5e0!3m2!1sen!2sus!4v1787512056646!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full transition-all duration-500"
              title="Digital Keys & Marketing Corporate Office Location Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label, darkMode, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
        darkMode
          ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-400/40 shadow-md shadow-slate-950/50"
          : "bg-slate-50 border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-500/50 shadow-inner"
      }`}
    >
      {children}
    </a>
  );
}
