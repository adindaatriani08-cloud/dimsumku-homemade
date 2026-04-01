import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimoniSection from "@/components/TestimoniSection";
import PaymentSection from "@/components/PaymentSection";
import CtaSection from "@/components/CtaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <>
      <Navbar />
      <DownloadPdfButton />
      <CartDrawer />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <FeaturesSection />
      <TestimoniSection />
      <PaymentSection />
      <CtaSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Index;
