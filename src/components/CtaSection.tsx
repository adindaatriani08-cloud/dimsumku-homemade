const CtaSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
          Yuk Pesan Dimsum Favoritmu Sekarang! 🥟
        </h2>
        <p className="text-secondary-foreground/70 font-body max-w-lg mx-auto mb-8">
          Tinggal klik tombol di bawah, langsung terhubung dengan WhatsApp kami. Gampang banget!
        </p>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-body text-lg font-bold hover:scale-105 transition-transform"
        >
          💬 Chat WhatsApp
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
