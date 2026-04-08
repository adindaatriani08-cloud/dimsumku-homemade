import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import CheckoutProgress from "@/components/checkout/CheckoutProgress";
import OrderSummary from "@/components/checkout/OrderSummary";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";

const WA_NUMBER = "6285711152590";

type PaymentMethod = "qris" | "va_bca" | "va_bri" | "va_mandiri" | "va_bni" | "gopay" | "ovo" | "dana" | "shopeepay" | "credit_card" | "cod";

const paymentOptions = [
  { group: "QRIS", items: [{ value: "qris" as PaymentMethod, label: "QRIS (Scan QR)" }] },
  {
    group: "Virtual Account",
    items: [
      { value: "va_bca" as PaymentMethod, label: "BCA Virtual Account" },
      { value: "va_bri" as PaymentMethod, label: "BRI Virtual Account" },
      { value: "va_mandiri" as PaymentMethod, label: "Mandiri Virtual Account" },
      { value: "va_bni" as PaymentMethod, label: "BNI Virtual Account" },
    ],
  },
  {
    group: "E-Wallet",
    items: [
      { value: "gopay" as PaymentMethod, label: "GoPay" },
      { value: "ovo" as PaymentMethod, label: "OVO" },
      { value: "dana" as PaymentMethod, label: "Dana" },
      { value: "shopeepay" as PaymentMethod, label: "ShopeePay" },
    ],
  },
  { group: "Kartu", items: [{ value: "credit_card" as PaymentMethod, label: "Kartu Debit / Kredit" }] },
  { group: "Bayar di Tempat", items: [{ value: "cod" as PaymentMethod, label: "COD (Cash on Delivery)" }] },
];

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qris");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = name.trim().length >= 2 && phone.trim().length >= 8 && address.trim().length >= 5 && items.length > 0;

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const orderItems = items.map((i) => ({
        name: i.name,
        price: i.priceNum,
        qty: i.qty,
        img: i.img,
      }));

      const { data, error } = await supabase
        .from("orders")
        .insert({
          customer_name: name.trim(),
          customer_phone: phone.trim(),
          customer_address: address.trim(),
          order_notes: notes.trim() || null,
          items: orderItems as any,
          total_price: totalPrice,
          payment_method: paymentMethod,
          payment_status: "pending",
          order_status: "processing",
        })
        .select("id, order_number")
        .single();

      if (error) throw error;

      // Navigate to payment simulation page
      navigate(`/payment/${data.id}`, { state: { orderNumber: data.order_number } });
      clearCart();
    } catch (err: any) {
      console.error("Order error:", err);
      toast({
        title: "Gagal membuat pesanan",
        description: err.message || "Terjadi kesalahan, silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="font-display text-2xl font-bold text-foreground">Keranjang Kosong</h1>
        <p className="text-muted-foreground font-body">Belum ada produk di keranjang Anda.</p>
        <Button onClick={() => navigate("/")} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button onClick={() => navigate("/")} variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Button>

        <CheckoutProgress currentStep={2} />

        <div className="grid md:grid-cols-5 gap-8 mt-8">
          {/* Form */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Data Pemesan</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-body text-sm">Nama Lengkap</Label>
                  <Input id="name" placeholder="Masukkan nama Anda" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-body text-sm">Nomor HP</Label>
                  <Input id="phone" placeholder="08xxxxxxxxxx" value={phone} onChange={(e) => { const val = e.target.value.replace(/\D/g, ""); setPhone(val); }} maxLength={15} inputMode="numeric" pattern="[0-9]*" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="font-body text-sm">Alamat Pengiriman</Label>
                  <textarea
                    id="address"
                    placeholder="Masukkan alamat lengkap"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    maxLength={500}
                    rows={3}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes" className="font-body text-sm">Catatan Pesanan (opsional)</Label>
                  <Input id="notes" placeholder="Misalnya: jangan pakai sambal" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={300} />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Metode Pembayaran
              </h2>
              <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                <div className="space-y-4">
                  {paymentOptions.map((group) => (
                    <div key={group.group}>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 font-body">{group.group}</p>
                      <div className="space-y-2">
                        {group.items.map((item) => (
                          <label
                            key={item.value}
                            className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
                              paymentMethod === item.value ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                            }`}
                          >
                            <RadioGroupItem value={item.value} />
                            <span className="font-body text-sm text-foreground">{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-2">
            <div className="sticky top-8 space-y-4">
              <OrderSummary items={items} totalPrice={totalPrice} />
              <Button onClick={handleSubmit} disabled={!canSubmit || isSubmitting} className="w-full gap-2" size="lg">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
              </Button>
              <p className="text-xs text-muted-foreground text-center font-body">
                Pesanan akan diproses setelah pembayaran dikonfirmasi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
