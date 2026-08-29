const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <span className="logo">
              DKM<b>.</b>
            </span>
            <p className="foot-claim">
              Web design &amp; development for small businesses. Websites from{" "}
              <b>$600</b>.
            </p>
          </div>

          <div>
            <h4>Menu</h4>
            <ul>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:hello@dkmstudio.co">hello@dkmstudio.co</a>
                {/* EDIT:EMAIL */}
              </li>
              <li>
                <a href="#pricing">Care plan — $50/mo</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {YEAR} DKM. All prices USD.</span>
          <span>No hidden fees. Ever.</span>
        </div>
      </div>
    </footer>
  );
}
