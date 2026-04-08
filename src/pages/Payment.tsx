import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CheckoutProgress from "@/components/checkout/CheckoutProgress";
import { Loader2, QrCode, CheckCircle2, XCircle, Clock, MessageCircle } from "lucide-react";
import qrisImage from "@/assets/qris-dimsumku.png";

const WA_NUMBER = "6285711152590";

function formatPrice(num: number) {
  return `Rp ${num.toLocaleString("id-ID")}`;
}

const Payment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "paid" | "failed">("pending");
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      const { data, error } = await supabase.from("orders").select("*").eq("id", orderId).single();
      if (error || !data) {
        toast({ title: "Pesanan tidak ditemukan", variant: "destructive" });
        navigate("/");
        return;
      }
      setOrder(data);
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  // Simulate payment processing
  const handleSimulatePayment = () => {
    setPaymentStatus("processing");
    setCountdown(5);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPaymentStatus("paid");
          // Update order in DB
          supabase
            .from("orders")
            .update({ payment_status: "paid", order_status: "confirmed" } as any)
            .eq("id", orderId!)
            .then(() => {
              setOrder((prev: any) => ({ ...prev, payment_status: "paid", order_status: "confirmed" }));
            });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleWhatsAppInvoice = () => {
    if (!order) return;
    const items = (order.items as any[]) || [];
    const lines = items.map((i: any) => `• ${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)}`);
    const message = [
      `✅ INVOICE PESANAN`,
      `No. Pesanan: ${order.order_number}`,
      ``,
      `Pelanggan: ${order.customer_name}`,
      `HP: ${order.customer_phone}`,
      `Alamat: ${order.customer_address}`,
      ``,
      `Detail Pesanan:`,
      ...lines,
      ``,
      `Total: ${formatPrice(order.total_price)}`,
      `Pembayaran: ${order.payment_method}`,
      `Status: LUNAS ✅`,
      ``,
      `Terima kasih telah berbelanja di Dimsumku! 🥟`,
    ].join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <CheckoutProgress currentStep={paymentStatus === "paid" ? 4 : 3} />

        <div className="mt-8">
          {paymentStatus === "paid" ? (
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border text-center space-y-4 animate-fade-up">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground">Pembayaran Berhasil!</h1>
              <p className="text-muted-foreground font-body">Pesanan Anda sedang diproses 🎉</p>

              <div className="bg-muted/50 rounded-xl p-4 text-left space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">No. Pesanan</span>
                  <span className="font-semibold text-foreground">{order.order_number}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-semibold text-primary">{formatPrice(order.total_price)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Pembayaran</span>
                  <span className="font-semibold text-foreground">{order.payment_method}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button onClick={handleWhatsAppInvoice} className="w-full gap-2" size="lg">
                  <MessageCircle className="w-5 h-5" /> Kirim Invoice ke WhatsApp
                </Button>
                <Button onClick={() => navigate(`/order-status?phone=${encodeURIComponent(order.customer_phone)}`)} variant="outline" className="w-full">
                  Cek Status Pesanan
                </Button>
                <Button onClick={() => navigate("/")} variant="ghost" className="w-full">
                  Kembali ke Menu
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border text-center space-y-6 animate-fade-up">
              {paymentStatus === "processing" ? (
                <>
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                  <h1 className="font-display text-2xl font-bold text-foreground">Memproses Pembayaran...</h1>
                  <p className="text-muted-foreground font-body">Simulasi pembayaran dalam {countdown} detik</p>
                </>
              ) : (
                <>
                  {order.payment_method === "qris" ? (
                    <img src={qrisImage} alt="QRIS Dimsumku" className="w-56 h-56 mx-auto rounded-xl border border-border shadow-sm" loading="lazy" width={512} height={640} />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                      <QrCode className="w-10 h-10 text-primary" />
                    </div>
                  )}
                  <h1 className="font-display text-2xl font-bold text-foreground">Menunggu Pembayaran</h1>
                  <p className="text-muted-foreground font-body text-sm">
                    Silakan selesaikan pembayaran untuk pesanan <span className="font-semibold text-foreground">{order.order_number}</span>
                  </p>

                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">Total Bayar</span>
                      <span className="font-display font-bold text-xl text-primary">{formatPrice(order.total_price)}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">Metode</span>
                      <span className="font-semibold text-foreground">{order.payment_method}</span>
                    </div>
                  </div>

                  <div className="border border-dashed border-primary/30 rounded-xl p-6 bg-primary/5">
                    <p className="text-xs text-muted-foreground font-body mb-3">
                      Mode simulasi — klik tombol di bawah untuk mensimulasikan pembayaran berhasil
                    </p>
                    <Button onClick={handleSimulatePayment} className="gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Simulasi Bayar Sekarang
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
