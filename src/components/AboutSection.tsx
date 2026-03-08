import { Leaf, Heart, Award } from "lucide-react";

const values = [
  { icon: Leaf, title: "Bahan Segar", desc: "Kami hanya menggunakan bahan-bahan segar pilihan setiap hari." },
  { icon: Heart, title: "Dibuat dengan Cinta", desc: "Setiap dimsum dibuat homemade dengan resep turun-temurun." },
  { icon: Award, title: "Rasa Autentik", desc: "Cita rasa premium yang konsisten di setiap gigitan." },
];

const AboutSection = () => {
  return (
    <section id="tentang" className="py-20 bg-warm">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-body font-semibold text-sm uppercase tracking-widest mb-3">Tentang Kami</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Kenapa Harus <span className="text-primary">Dimsumku</span>?
          </h2>
          <p className="mt-4 text-muted-foreground font-body">
            Dimsumku hadir untuk menyajikan dimsum terbaik dengan bahan segar, halal, dan
            dibuat secara homemade. Kami percaya makanan enak dimulai dari bahan berkualitas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((item, i) => (
            <div
              key={item.title}
              className="bg-card rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow animate-fade-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground font-body text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
