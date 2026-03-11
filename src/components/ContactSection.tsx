import { Phone, Instagram, MapPin } from "lucide-react";

const contacts = [
  { icon: Phone, label: "WhatsApp", value: "08998003723", href: "https://wa.me/628998003723" },
  { icon: Instagram, label: "Instagram", value: "@dimsumku", href: "https://instagram.com/dimsumku" },
  { icon: MapPin, label: "Lokasi", value: "Jakarta, Indonesia", href: "#" },
];

const ContactSection = () => {
  return (
    <section id="kontak" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-body font-semibold text-sm uppercase tracking-widest mb-3">Kontak</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Hubungi <span className="text-primary">Kami</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <c.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-body font-bold text-foreground">{c.label}</p>
              <p className="text-muted-foreground font-body text-sm">{c.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
