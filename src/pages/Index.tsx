import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoSlider from "@/components/LogoSlider";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import TeamworkQuote from "@/components/TeamworkQuote";
import ConsultationForm from "@/components/ConsultationForm";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BrochurePopup from "@/components/BrochurePopup";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      {/* <LogoSlider /> */}
      <Services />
      <Projects />
      <About />
      <TeamworkQuote />
      <ConsultationForm />
      <Testimonials />
      <Contact />
      <Footer />
      {/* <BrochurePopup /> */}
    </div>
  );
};

export default Index;
