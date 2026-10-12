import { useEffect, useState } from "react";
import "./Header.css";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

function Header() {
  const [active, setActive] = useState("home");


  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();

    const section = document.getElementById(id);

    if (!section) return;

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

    setActive(id);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">

        <a
          href="#home"
          className="logo"
          onClick={(e) => handleNavClick(e, "home")}
        >
          <span>BA</span>
          <strong>Protfolio</strong>
        </a>

        <nav className="navbar">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? "active" : ""}
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="social-links">

          <a
            href="https://www.linkedin.com/in/badawi-ahmed-hewady-566a89399?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>

          <a
            href="https://www.facebook.com/share/1HMcKUrn8p/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <i className="fa-brands fa-square-facebook"></i>
          </a>

          <a
            href="https://www.instagram.com/badawyahmedhewady?stkn=bnVmcmExNjAyMWhu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-square-instagram"></i>
          </a>

          <a
            href="https://github.com/badawi-ahmed"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github"></i>
          </a>

        </div>

        <div className="connect-wrapper">
          <a
            href="#contact"
            className="connect-btn"
            onClick={(e) => handleNavClick(e, "contact")}
          >
            <span>Let's Connect</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <i
            className={
              menuOpen
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars"
            }
          ></i>
        </button>

        <nav
          className={`mobile-navbar ${
            menuOpen ? "show" : ""
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? "active" : ""}
              onClick={(e) =>
                handleNavClick(e, link.id)
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

      </div>
    </header>
  );
}

export default Header;