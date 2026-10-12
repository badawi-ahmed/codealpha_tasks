import "./Footer.css";

function Footer() {
  // ==============================
  // NAVIGATION
  // ==============================

  const goToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      const header = document.querySelector(".header");
      const headerHeight = header ? header.offsetHeight : 0;

      const top =
        section.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  // ==============================
  // SUBSCRIBE
  // ==============================

  const handleSubscribe = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    window.location.href =
      `mailto:abadawy955@gmail.com?subject=Portfolio Subscription&body=My email is: ${email}`;
  };

  return (
    <footer className="footer">

      {/* =========================================
          NEWSLETTER
      ========================================== */}

      <section className="footer-newsletter">

        <div className="newsletter-text">
          <h3>Stay Updated</h3>

          <p>
            Subscribe to see my latest projects &amp; articles.
          </p>
        </div>

        <form
          className="newsletter-form"
          onSubmit={handleSubscribe}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <button type="submit">
            Subscribe
          </button>
        </form>

      </section>


      {/* =========================================
          MAIN FOOTER
      ========================================== */}

      <section className="footer-main">

        {/* =========================================
            ABOUT
        ========================================== */}

        <div className="footer-about">

          <h2 className="footer-logo">
            <span className="footer-ba">BA</span>
            <strong>Badawi Ahmed</strong>
          </h2>

          <p>
            Front-End Developer building clean,
            responsive web experiences with modern
            front-end technologies.
          </p>


          {/* =========================================
              SOCIAL ICONS
          ========================================== */}

          <div className="footer-socials">

            {/* LinkedIn */}

            <a
              href="https://www.linkedin.com/in/badawi-ahmed-hewady-566a89399?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>


            {/* Facebook */}

            <a
              href="https://www.facebook.com/share/1HMcKUrn8p/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-square-facebook"></i>
            </a>


            {/* Instagram */}

            <a
              href="https://www.instagram.com/badawyahmedhewady?stkn=bnVmcmExNjAyMWhu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-square-instagram"></i>
            </a>


            {/* GitHub */}

            <a
              href="https://github.com/badawi-ahmed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>

          </div>

        </div>


        {/* =========================================
            NAVIGATION
        ========================================== */}

        <div className="footer-column">

          <h3>Navigation</h3>

          <button
            type="button"
            onClick={() => goToSection("home")}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => goToSection("skills")}
          >
            Skills
          </button>

          <button
            type="button"
            onClick={() => goToSection("projects")}
          >
            Projects
          </button>

          <button
            type="button"
            onClick={() => goToSection("contact")}
          >
            Contact
          </button>

        </div>


        {/* =========================================
            WHAT I DO
        ========================================== */}

        <div className="footer-column what-i-do">

          <h3>What I Do</h3>

          <p>Front-End Development</p>

          <p>Responsive Web Design</p>

          <p>React &amp; Tailwind Projects</p>

          <p>UI / UX Implementation</p>

          <p>Component Architecture</p>

        </div>

      </section>


      {/* =========================================
          FOOTER BOTTOM
      ========================================== */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Badawi Ahmed — All Rights Reserved
        </p>

      </div>

    </footer>
  );
}

export default Footer;