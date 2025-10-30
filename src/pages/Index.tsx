import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BrochurePopup from "@/components/BrochurePopup";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
      <Footer />
      <BrochurePopup />
    </div>
  );
};

export default Index;
