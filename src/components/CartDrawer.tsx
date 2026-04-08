import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";

function formatPrice(num: number) {
  return `Rp ${num.toLocaleString("id-ID")}`;
}

const CartDrawer = () => {
  const { items, updateQty, removeItem, clearCart, totalItems, totalPrice, isOpen, setIsOpen } = useCart();
  const navigate = useNavigate();

  const handleQtyInput = (name: string, value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num <= 0) {
      if (value === "") return;
      updateQty(name, 1);
    } else {
      updateQty(name, num);
    }
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate("/checkout");
  };

  return (
    <>
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
              <ShoppingCart className="w-5 h-5 text-primary" />
              Keranjang Anda
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
                        <button
                          onClick={() => updateQty(item.name, item.qty - 1)}
                          className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <Input
                          type="number"
                          min={1}
                          max={100}
                          value={item.qty}
                          onChange={(e) => handleQtyInput(item.name, e.target.value)}
                          className="w-14 h-7 text-center text-sm font-semibold px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          onClick={() => updateQty(item.name, item.qty + 1)}
                          className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.name)}
                          className="ml-auto text-destructive hover:text-destructive/80 transition-colors"
                        >
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
                <Button onClick={handleCheckout} className="w-full gap-2" size="lg">
                  Checkout <ArrowRight className="w-4 h-4" />
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

export default CartDrawer;
