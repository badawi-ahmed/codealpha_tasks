import { useState } from "react";
import "./projects.css";

const projects = [
  {
    id: 1,
    title: "TechNova – Electronics Store",
    description: "Landing page for an electronics store featuring the latest laptops, smartphones and smart accessories, with pricing cards and a full team/about section.",
    tags: ["HTML", "CSS"],
    category: "webapps",
    badge: "Completed",
    accent: "#4fb0e0",
    image: `${import.meta.env.BASE_URL}images/project1.jpeg`,
    link: "https://github.com/Badawi-Ahmed/First-Project1",
  },

  {
    id: 2,
    title: "Royal Thread – Suits Fashion Store",
    description:
      "An e-commerce landing page for a premium men's suits & fashion brand, with product cards, sale banners, trending items and customer testimonials.",
    tags: ["HTML", "CSS"],
    category: "webapps",
    badge: "Completed",
    accent: "#e07fb0",
    image: `${import.meta.env.BASE_URL}images/project2.png`,
    link: "https://github.com/Badawi-Ahmed/Project-2",
  },

  {
    id: 3,
    title: "CodeCraft – Programming Academy",
    description:
      "A landing page for a coding academy: learning programs (Frontend, Backend, Full-Stack), instructor profiles, stats, and a working contact section.",
    tags: ["HTML", "CSS", "Tailwind"],
    category: "webapps",
    badge: "Completed",
    accent: "#8fce6b",
    image: `${import.meta.env.BASE_URL}images/project3.jpeg`,
    link: "https://github.com/Badawi-Ahmed/Project-3",
  },

  {
    id: 4,
    title: "Mini Quiz App",
    description:
      "A small interactive quiz application built with vanilla JavaScript — question navigation, answer selection, and score tracking.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "tools",
    badge: "Completed",
    accent: "#d4a94a",
    image: `${import.meta.env.BASE_URL}images/mini-quiz.jpg`,
    link: "https://github.com/Badawi-Ahmed/Mini-Quiz-",
  },

  {
    id: 5,
    title: "VYRON – Gaming Store",
    description:
      "A multi-page gaming store: product search/filter, shopping cart with quantity controls, favorites, and login/register pages, all wired with JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    category: "webapps",
    badge: "Completed",
    accent: "#8b6fd4",
    image: `${import.meta.env.BASE_URL}images/VYRON.jpeg`,
    link: "https://github.com/Badawi-Ahmed/VYRON",
  },

  {
    id: 6,
    title: "Badawi Ahmed – Portfolio",
    description:
      "A modern responsive personal portfolio showcasing my front-end skills, projects, and contact information.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    category: "portfolio",
    badge: "Completed",
    accent: "#14b8a6",
    image: `${import.meta.env.BASE_URL}images/Protfolio.jpeg`,
    link: "https://badawi-ahmed.github.io/Badawi-Protfolio/",
  },
];

const filters = [
  { key: "all", label: "All Projects" },
  { key: "webapps", label: "Web Apps" },
  { key: "tools", label: "Tools" },
  { key: "portfolio", label: "Protfolio" },
];

function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section className="projects" id="projects">

      <div className="projects-header">
        <span className="projects-label">MY WORK</span>
        <h2>Featured Projects</h2>
        <div className="projects-line"></div>
        <p> Real-world applications built with modern technologies and best  practices.
        </p>
      </div>

      <div className="projects-filters">
        {filters.map((filter) => (
          <button key={filter.key}  type="button"  className={activeFilter === filter.key ? "active" : ""}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {visibleProjects.map((project) => (
          <article
            className="project-card"
            key={project.id}
            style={{ "--accent": project.accent }}
          >

            <div className="project-thumb">
              <img
                src={project.image}
                alt={project.title}
                className="project-thumb-img"
                loading="lazy"
              />

              <div className="project-thumb-overlay"></div>


              {project.badge && (
                <span className="project-badge">{project.badge}</span>
              )}


              {project.link !== "#" && (
                <a
                  href={project.link}
                  className="project-view-btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Source
                </a>
              )}
            </div>

            <div className="project-body">
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;