import { Star } from "lucide-react";

const testimonials = [
  { name: "Rina S.", text: "Dimsum Dimsumku terbaik! Anak-anak saya selalu minta lagi. Rasanya fresh banget dan nggak berminyak.", rating: 5 },
  { name: "Budi P.", text: "Harga terjangkau tapi rasanya premium. Mix Box-nya jadi favorit buat arisan keluarga.", rating: 5 },
  { name: "Sari M.", text: "Dimsum kejunya lumer banget! Pengiriman juga cepat dan packaging rapi. Recommended!", rating: 5 },
];

const TestimoniSection = () => {
  return (
    <section id="testimoni" className="py-20 bg-warm">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-body font-semibold text-sm uppercase tracking-widest mb-3">Testimoni</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Apa Kata <span className="text-primary">Pelanggan</span> Kami?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-card rounded-2xl p-8 shadow-sm animate-fade-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-foreground/80 font-body text-sm leading-relaxed mb-6">"{t.text}"</p>
              <p className="font-body font-bold text-foreground text-sm">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniSection;
