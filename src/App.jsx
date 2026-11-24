import { MotionConfig } from "framer-motion";
import Stage from "./components/Stage";
// Kursor custom (components/Cursor.jsx) dimatikan: situs memakai kursor bawaan sistem.
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Navbar />
      <main>
        <Stage>
          <Hero />
        </Stage>
        <Stage divider>
          <About />
        </Stage>
        <Stage divider>
          <Skills />
          <Projects />
        </Stage>
        <Stage divider>
          <Experience />
        </Stage>
        <Stage divider>
          <Certificates />
        </Stage>
        <Stage divider>
          <Contact />
        </Stage>
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}