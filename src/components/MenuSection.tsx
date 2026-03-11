import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import dimsumAyam from "@/assets/dimsum-ayam.jpg";
import dimsumUdang from "@/assets/dimsum-udang.jpg";
import dimsumJamur from "@/assets/dimsum-jamur.jpg";
import dimsumKeju from "@/assets/dimsum-keju.jpg";
import dimsumMixbox from "@/assets/dimsum-mixbox.jpg";

const menuItems = [
  { img: dimsumAyam, name: "Dimsum Ayam", desc: "Dimsum lembut dengan isian ayam pilihan yang gurih dan juicy.", price: "Rp 15.000", priceNum: 15000 },
  { img: dimsumUdang, name: "Dimsum Udang", desc: "Paduan udang segar dengan kulit tipis yang kenyal sempurna.", price: "Rp 18.000", priceNum: 18000 },
  { img: dimsumJamur, name: "Dimsum Jamur", desc: "Isian jamur shiitake pilihan dengan bumbu spesial.", price: "Rp 14.000", priceNum: 14000 },
  { img: dimsumKeju, name: "Dimsum Keju", desc: "Keju lumer di setiap gigitan, favorit anak-anak dan dewasa.", price: "Rp 16.000", priceNum: 16000 },
  { img: dimsumMixbox, name: "Dimsum Mix Box", desc: "Paket lengkap berbagai varian dimsum dalam satu box spesial.", price: "Rp 45.000", priceNum: 45000 },
];

const MenuSection = () => {
  const { addItem } = useCart();

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-body font-semibold text-sm uppercase tracking-widest mb-3">Menu Kami</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Pilihan Dimsum <span className="text-primary">Terfavorit</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, i) => (
            <div
              key={item.name}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.name}</h3>
                <p className="text-muted-foreground font-body text-sm mb-3">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg font-bold text-primary">{item.price}</p>
                  <button
                    onClick={() => addItem({ name: item.name, price: item.price, priceNum: item.priceNum, img: item.img })}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary text-primary-foreground font-body text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
