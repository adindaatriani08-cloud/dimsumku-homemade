import { Sparkles, DollarSign, Salad, Users } from "lucide-react";

const features = [
  { icon: Salad, title: "Bahan Segar", desc: "Dipilih langsung setiap hari dari supplier terpercaya." },
  { icon: Sparkles, title: "Rasa Premium", desc: "Resep khas dengan standar rasa yang konsisten." },
  { icon: DollarSign, title: "Harga Terjangkau", desc: "Kualitas bintang lima, harga ramah kantong." },
  { icon: Users, title: "Untuk Semua Usia", desc: "Dari anak-anak hingga orang tua, semua suka." },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
            Keunggulan Dimsumku
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-2">{f.title}</h3>
              <p className="text-primary-foreground/80 font-body text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
