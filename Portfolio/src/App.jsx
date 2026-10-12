import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Skills from "./Pages/Skills/skills";
import Projects from "./Pages/Projects/projects";
import Contact from "./Pages/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Home />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </BrowserRouter>
  );
}

export default App;