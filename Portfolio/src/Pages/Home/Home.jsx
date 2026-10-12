import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const roles = ["Front-End Developer", "React Engineer"];

  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(currentRole.substring(0, text.length + 1));

        if (text.length === currentRole.length) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));

        if (text.length === 0) {
          setDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, deleting ? 60 : 100);

    return () => clearTimeout(timer);
  }, [text, deleting, roleIndex]);

  return (
    <section className="home" id="home">
      <div className="background-dots">
  {Array.from({ length: 35 }).map((_, index) => (
    <span key={index}></span>
  ))}
</div>

      <div className="home-content">

        <div className="availability">
          <span className="status-dot"></span>
          Available for opportunities
        </div>

        <h1>
          Hi! I'm <span>Badawi</span>
          <br />
          Ahmed
        </h1>

        <h2 className="home-title">
          {text}
          <span className="cursor">|</span>
        </h2>

        <p className="home-description">
          I build modern, responsive web applications with clean code,
          elegant interfaces, and a strong focus on creating smooth,
          engaging user experiences.
        </p>

        <div className="home-buttons">
          <a href="#projects" className="btn-primary">
            View My Projects
          </a>

          <a href="#contact" className="btn-secondary">
            Get In Touch
          </a>
        </div>

      </div>


      <div className="home-visual">

        <div className="react-badge">
          ⚛ React Dev
        </div>

        <div className="code-card">

          <div className="code-header">
            <span></span>
            <span></span>
            <span></span>
            <p>badawi.jsx</p>
          </div>

          <div className="code-content">
            <p>
              <span className="purple">const</span>{" "}
              <span className="blue">developer</span> = {"{"}
            </p>

            <p>
              &nbsp;&nbsp;name:{" "}
              <span className="green">"Badawi Ahmed"</span>,
            </p>
              <p>
              &nbsp;&nbsp;role:{" "}
              <span className="green">"Front-End Developer"</span>,
            </p>

            <p>
              &nbsp;&nbsp;stack: [
            </p>
          
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="green">"HTML"</span>,{" "}
              <span className="green">"CSS"</span>,
            </p>

            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="green">"JavaScript"</span>,{" "}
              <span className="green">"React"</span>,
            </p>

            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="green">"Tailwind"</span>
            </p>

            <p>&nbsp;&nbsp;]</p>

            <p>{"}"}</p>

            <p className="ready">
              &gt; ready_to_build() ✓
            </p>
          </div>

        </div>

        <div className="ui-badge">
          UI / UX
        </div>

      </div>


      <div className="scroll-indicator">
        <span>SCROLL</span>
        <div></div>
      </div>

    </section>
  );
}

export default Home;