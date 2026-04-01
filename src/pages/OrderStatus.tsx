import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search, Package, Clock, CheckCircle2, Truck, XCircle, Loader2 } from "lucide-react";

function formatPrice(num: number) {
  return `Rp ${num.toLocaleString("id-ID")}`;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  processing: { label: "Diproses", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  confirmed: { label: "Dikonfirmasi", color: "bg-blue-100 text-blue-700", icon: CheckCircle2 },
  shipped: { label: "Dikirim", color: "bg-indigo-100 text-indigo-700", icon: Truck },
  delivered: { label: "Selesai", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-700", icon: XCircle },
};

const paymentStatusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Menunggu Pembayaran", color: "bg-yellow-100 text-yellow-700" },
  paid: { label: "Lunas", color: "bg-green-100 text-green-700" },
  failed: { label: "Gagal", color: "bg-red-100 text-red-700" },
  expired: { label: "Kadaluarsa", color: "bg-muted text-muted-foreground" },
};

const OrderStatus = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialPhone = searchParams.get("phone") || "";

  const [query, setQuery] = useState(initialPhone);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(!!initialPhone);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    const trimmed = query.trim();

    // Search by phone OR order number
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .or(`customer_phone.eq.${trimmed},order_number.eq.${trimmed.toUpperCase()}`)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    } else {
      setOrders([]);
    }
    setLoading(false);
  };

  // Auto-search if phone provided
  useState(() => {
    if (initialPhone) handleSearch();
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button onClick={() => navigate("/")} variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Button>

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Status Pesanan</h1>
          <p className="text-muted-foreground font-body">Cek status pesanan Anda dengan nomor HP atau ID transaksi</p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-6">
          <div className="flex gap-3">
            <div className="flex-1 space-y-2">
              <Label className="font-body text-sm">Nomor HP atau No. Pesanan</Label>
              <Input
                placeholder="08xxxxxxxx atau ORD-XXXXXXXX"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} disabled={loading} className="gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Cari
              </Button>
            </div>
          </div>
        </div>

        {searched && !loading && orders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto opacity-30 mb-3" />
            <p className="font-body">Pesanan tidak ditemukan</p>
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.order_status] || statusConfig.processing;
            const payStatus = paymentStatusConfig[order.payment_status] || paymentStatusConfig.pending;
            const StatusIcon = status.icon;
            const items = (order.items as any[]) || [];

            return (
              <div key={order.id} className="bg-card rounded-2xl p-6 shadow-sm border border-border space-y-4 animate-fade-up">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display font-bold text-foreground">{order.order_number}</p>
                    <p className="text-xs text-muted-foreground font-body">
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold font-body ${status.color}`}>
                      <StatusIcon className="w-3 h-3 inline mr-1" />
                      {status.label}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold font-body ${payStatus.color}`}>
                      {payStatus.label}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-3 space-y-2">
                  {items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm font-body">
                      <span className="text-muted-foreground">{item.name} x{item.qty}</span>
                      <span className="font-semibold text-foreground">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-body font-semibold">Total</span>
                    <span className="font-display font-bold text-primary">{formatPrice(order.total_price)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
