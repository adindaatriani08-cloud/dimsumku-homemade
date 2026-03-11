import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimoniSection from "@/components/TestimoniSection";
import CtaSection from "@/components/CtaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <CartProvider>
      <Navbar />
      <DownloadPdfButton />
      <CartDrawer />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <FeaturesSection />
      <TestimoniSection />
      <CtaSection />
      <ContactSection />
      <Footer />
    </CartProvider>
  );
};

export default Index;
