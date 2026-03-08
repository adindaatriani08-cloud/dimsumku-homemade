const Footer = () => {
  return (
    <footer className="bg-foreground py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#home" className="font-display text-2xl font-bold text-primary-foreground">
            Dimsumku
          </a>

          <ul className="flex items-center gap-6">
            {["Home", "Menu", "Tentang", "Testimoni", "Kontak"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="font-body text-sm text-primary-foreground/50">
            © 2026 Dimsumku. Fresh, Halal, Homemade.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
