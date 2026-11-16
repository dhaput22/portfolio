import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import Background from "./components/Background";
import Stage from "./components/Stage";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { LITE } from "./lib/motion";

// three.js dimuat belakangan supaya halaman tampil cepat
const NeuralField = lazy(() => import("./components/three/NeuralField"));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Background />
      {/* latar 3D (three.js) tidak dimuat sama sekali di HP / mode ringan: hemat ~525 KB dan baterai */}
      {!LITE && (
        <Suspense fallback={null}>
          <NeuralField />
        </Suspense>
      )}
      <Cursor />
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
        </Stage>
        <Stage divider>
          <Projects />
        </Stage>
        <Stage divider>
          <Experience />
        </Stage>
        <Stage divider>
          <Contact />
        </Stage>
      </main>
      <Footer />
    </MotionConfig>
  );
}