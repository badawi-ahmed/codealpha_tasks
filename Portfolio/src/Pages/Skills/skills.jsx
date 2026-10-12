import { useEffect, useRef, useState } from "react";
import "./Skills.css";

const skills = [
  { name: "HTML5", percentage: 95, color: "#e8664a" },
  { name: "CSS3", percentage: 90, color: "#2fb6c4" },
  { name: "JavaScript", percentage: 85, color: "#d4a94a" },
  { name: "React.js", percentage: 85, color: "#5b9bd8" },
  { name: "Tailwind CSS", percentage: 88, color: "#14b8a6" },
  { name: "Bootstrap", percentage: 80, color: "#8b6fd4" },
];

const ITEMS_PER_PAGE = 4;

function chunkSkills(list, size) {
  const chunks = [];
  for (let i = 0; i < list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }
  return chunks;
}

const pages = chunkSkills(skills, ITEMS_PER_PAGE);

function Skills() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState("next");
  const [values, setValues] = useState(pages[0].map(() => 0));
  const rafId = useRef(null);

  useEffect(() => {
    const current = pages[page];
    setValues(current.map(() => 0));

    const start = performance.now();
    const duration = 1100;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValues(current.map((skill) => Math.round(skill.percentage * eased)));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      }
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [page]);

  const goPrev = () => {
    if (page === 0) return;
    setDirection("prev");
    setPage((p) => p - 1);
  };

  const goNext = () => {
    if (page === pages.length - 1) return;
    setDirection("next");
    setPage((p) => p + 1);
  };

  const goToPage = (i) => {
    if (i === page) return;
    setDirection(i > page ? "next" : "prev");
    setPage(i);
  };

  return (
    <section className="skills" id="skills">
      <div className="skills-header">
        <span className="skills-label">TECHNICAL EXPERTISE</span>

        <h2>Front-End Skills</h2>

        <div className="skills-line"></div>

        <p>
          The front-end technologies I use to build modern,
          responsive web experiences.
        </p>
      </div>

      <div className="skills-slider">
        <button
          type="button"
          className={`skills-nav-btn prev ${page === 0 ? "is-hidden" : ""}`}
          onClick={goPrev}
          aria-label="Previous skills"
          disabled={page === 0}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="skills-container" key={page} data-direction={direction}>
          {pages[page].map((skill, index) => (
            <div className="skill-item" key={skill.name}>
              <div
                className="skill-circle"
                style={{
                  "--progress": `${(values[index] || 0) * 3.6}deg`,
                  "--skill-color": skill.color,
                }}
              >
                <div className="skill-inner">
                  <span>{values[index] || 0}%</span>
                </div>
              </div>

              <h3>{skill.name}</h3>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`skills-nav-btn next ${
            page === pages.length - 1 ? "is-hidden" : ""
          }`}
          onClick={goNext}
          aria-label="Next skills"
          disabled={page === pages.length - 1}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="skills-dots">
        {pages.map((_, i) => (
          <span
            key={i}
            className={i === page ? "active" : ""}
            onClick={() => goToPage(i)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default Skills;