import heroBg from "@/assets/hero-dimsum.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold text-primary-foreground leading-tight animate-fade-up">
          Dimsum Lezat,{" "}
          <span className="text-secondary">Fresh</span> Setiap Hari
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 font-body animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Nikmati berbagai pilihan dimsum homemade dari Dimsumku, cocok untuk
          camilan maupun makan bersama keluarga.
        </p>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-body text-lg font-bold hover:scale-105 transition-transform animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          🛒 Pesan Sekarang
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
