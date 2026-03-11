import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingCart, MessageCircle } from "lucide-react";

const WA_NUMBER = "6281234567890";

const CartDrawer = () => {
  const { items, updateQty, removeItem, clearCart, totalItems, totalPrice, isOpen, setIsOpen } = useCart();

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    const lines = items.map((i) => `• ${i.name} x${i.qty} — ${formatPrice(i.priceNum * i.qty)}`);
    const message = `Halo, saya ingin memesan:\n\n${lines.join("\n")}\n\nTotal: ${formatPrice(totalPrice)}\n\nTerima kasih!`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Floating cart button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground font-body text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity"
      >
        <ShoppingCart className="w-5 h-5" />
        Keranjang
        {totalItems > 0 && (
          <span className="ml-1 bg-primary-foreground text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-xl flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" /> Keranjang Anda
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-3">
              <ShoppingCart className="w-12 h-12 opacity-30" />
              <p className="font-body">Keranjang masih kosong</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.name} className="flex gap-3 bg-muted/50 rounded-xl p-3">
                    <img src={item.img} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-foreground text-sm truncate">{item.name}</h4>
                      <p className="text-primary font-body text-sm font-semibold">{item.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => updateQty(item.name, item.qty - 1)} className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-body text-sm font-semibold w-6 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.name, item.qty + 1)} className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                        <button onClick={() => removeItem(item.name)} className="ml-auto text-destructive hover:text-destructive/80 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between font-body">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-display font-bold text-lg text-foreground">{formatPrice(totalPrice)}</span>
                </div>
                <Button onClick={handleWhatsAppOrder} className="w-full gap-2" size="lg">
                  <MessageCircle className="w-5 h-5" />
                  Pesan via WhatsApp
                </Button>
                <Button onClick={clearCart} variant="outline" className="w-full" size="sm">
                  Kosongkan Keranjang
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

function formatPrice(num: number) {
  return `Rp ${num.toLocaleString("id-ID")}`;
}

export default CartDrawer;
