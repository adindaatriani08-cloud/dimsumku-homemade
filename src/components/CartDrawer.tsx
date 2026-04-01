import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingCart, MessageCircle, MapPin, User, CreditCard } from "lucide-react";

const WA_NUMBER = "6285711152590";

type PaymentMethod = "cod" | "transfer" | "qris";

const paymentLabels: Record<PaymentMethod, string> = {
  cod: "COD (Bayar di Tempat)",
  transfer: "Transfer Antar Bank",
  qris: "QRIS",
};

const CartDrawer = () => {
  const { items, updateQty, removeItem, clearCart, totalItems, totalPrice, isOpen, setIsOpen } = useCart();
  const [buyerName, setBuyerName] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [step, setStep] = useState<"cart" | "checkout">("cart");

  const handleQtyInput = (name: string, value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num <= 0) {
      // Allow empty for typing, but don't update to 0
      if (value === "") return;
      updateQty(name, 1);
    } else {
      updateQty(name, num);
    }
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0 || !buyerName.trim() || !buyerAddress.trim()) return;
    const lines = items.map((i) => `• ${i.name} x${i.qty} — ${formatPrice(i.priceNum * i.qty)}`);
    const message = [
      `Halo, saya ingin memesan:`,
      ``,
      ...lines,
      ``,
      `Total: ${formatPrice(totalPrice)}`,
      ``,
      `Nama: ${buyerName.trim()}`,
      `Alamat: ${buyerAddress.trim()}`,
      `Pembayaran: ${paymentLabels[paymentMethod]}`,
      ``,
      `Terima kasih!`,
    ].join("\n");
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const canCheckout = buyerName.trim().length > 0 && buyerAddress.trim().length > 0;

  const handleClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) setStep("cart");
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

      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="flex flex-col w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-xl flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              {step === "cart" ? "Keranjang Anda" : "Checkout"}
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-3">
              <ShoppingCart className="w-12 h-12 opacity-30" />
              <p className="font-body">Keranjang masih kosong</p>
            </div>
          ) : step === "cart" ? (
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
                <Button onClick={() => setStep("checkout")} className="w-full gap-2" size="lg">
                  Lanjut ke Checkout
                </Button>
                <Button onClick={clearCart} variant="outline" className="w-full" size="sm">
                  Kosongkan Keranjang
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-5 py-4">
                {/* Buyer Info */}
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-foreground flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-primary" /> Data Pemesan
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="buyer-name" className="text-xs text-muted-foreground">Nama Lengkap</Label>
                    <Input
                      id="buyer-name"
                      placeholder="Masukkan nama Anda"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buyer-address" className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Alamat Pengiriman
                    </Label>
                    <textarea
                      id="buyer-address"
                      placeholder="Masukkan alamat lengkap"
                      value={buyerAddress}
                      onChange={(e) => setBuyerAddress(e.target.value)}
                      maxLength={500}
                      rows={3}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-foreground flex items-center gap-2 text-sm">
                    <CreditCard className="w-4 h-4 text-primary" /> Metode Pembayaran
                  </h3>
                  <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)} className="space-y-2">
                    {(Object.entries(paymentLabels) as [PaymentMethod, string][]).map(([key, label]) => (
                      <label
                        key={key}
                        className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                          paymentMethod === key ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <RadioGroupItem value={key} />
                        <span className="font-body text-sm text-foreground">{label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Order Summary */}
                <div className="space-y-2 bg-muted/50 rounded-xl p-3">
                  <h3 className="font-display font-bold text-foreground text-sm">Ringkasan Pesanan</h3>
                  {items.map((item) => (
                    <div key={item.name} className="flex justify-between text-sm font-body">
                      <span className="text-muted-foreground">{item.name} x{item.qty}</span>
                      <span className="text-foreground font-semibold">{formatPrice(item.priceNum * item.qty)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-body font-semibold text-foreground">Total</span>
                    <span className="font-display font-bold text-lg text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <Button onClick={handleWhatsAppOrder} className="w-full gap-2" size="lg" disabled={!canCheckout}>
                  <MessageCircle className="w-5 h-5" />
                  Pesan via WhatsApp
                </Button>
                <Button onClick={() => setStep("cart")} variant="outline" className="w-full" size="sm">
                  Kembali ke Keranjang
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
