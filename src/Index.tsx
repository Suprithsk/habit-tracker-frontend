
import CTA from "./components/CTA";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import Testimonials from "./components/Testimonials";
import { Analytics } from "@vercel/analytics/react"
const Index = () => {
  return (
    <>
      <Analytics />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
};

export default Index;
