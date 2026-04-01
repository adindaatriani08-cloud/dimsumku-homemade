import { CartItem } from "@/context/CartContext";

function formatPrice(num: number) {
  return `Rp ${num.toLocaleString("id-ID")}`;
}

const OrderSummary = ({ items, totalPrice }: { items: CartItem[]; totalPrice: number }) => (
  <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
    <h2 className="font-display text-lg font-bold text-foreground mb-4">Ringkasan Pesanan</h2>
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.name} className="flex gap-3">
          <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
          <div className="flex-1 min-w-0">
            <p className="font-body text-sm font-semibold text-foreground truncate">{item.name}</p>
            <p className="text-xs text-muted-foreground font-body">x{item.qty}</p>
          </div>
          <p className="font-body text-sm font-semibold text-foreground">{formatPrice(item.priceNum * item.qty)}</p>
        </div>
      ))}
    </div>
    <div className="border-t border-border mt-4 pt-4 flex justify-between">
      <span className="font-body font-semibold text-foreground">Total</span>
      <span className="font-display font-bold text-xl text-primary">{formatPrice(totalPrice)}</span>
    </div>
  </div>
);

export default OrderSummary;
