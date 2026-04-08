import { useState } from "react";
import { QrCode, Building2, Wallet, Banknote, MessageCircle, ZoomIn, Copy, Check } from "lucide-react";
import qrisImage from "@/assets/qris-dimsumku.png";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const WA_NUMBER = "6285711152590";

const bankAccounts = [
  { bank: "BCA", number: "123456789", name: "Dimsumku" },
  { bank: "BRI", number: "987654321", name: "Dimsumku" },
];

const eWallets = ["Dana", "OVO", "GoPay"];

const PaymentSection = () => {
  const [qrOpen, setQrOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleConfirm = () => {
    const message = "Halo, saya sudah melakukan pembayaran untuk pesanan Dimsumku";
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="pembayaran" className="py-20 bg-[hsl(var(--warm-bg))]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Metode Pembayaran
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Pilih metode pembayaran yang paling nyaman untuk Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* QRIS */}
          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground">QRIS</h3>
              <img src={qrisImage} alt="QRIS Dimsumku" className="w-36 h-44 rounded-lg border border-border object-contain" loading="lazy" width={512} height={640} />
              <p className="font-body text-xs text-muted-foreground">
                Scan QRIS untuk pembayaran cepat
              </p>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setQrOpen(true)}>
                <ZoomIn className="w-4 h-4" /> Perbesar QR
              </Button>
            </CardContent>
          </Card>

          {/* Transfer Bank */}
          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground">Transfer Bank</h3>
              <div className="w-full space-y-3">
                {bankAccounts.map((acc, i) => (
                  <div key={acc.bank} className="bg-muted/60 rounded-lg p-3 text-left">
                    <p className="font-body text-xs text-muted-foreground">{acc.bank}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-body font-semibold text-foreground text-sm">{acc.number}</p>
                      <button onClick={() => handleCopy(acc.number, i)} className="text-primary hover:text-primary/80 transition-colors">
                        {copiedIndex === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="font-body text-xs text-muted-foreground">a.n {acc.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* E-Wallet */}
          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground">E-Wallet</h3>
              <div className="w-full space-y-2">
                {eWallets.map((name) => (
                  <div key={name} className="flex items-center gap-3 bg-muted/60 rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-body font-semibold text-foreground text-sm">{name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* COD */}
          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Banknote className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground">COD</h3>
              <p className="font-body text-sm text-muted-foreground">
                Cash on Delivery — bayar langsung saat pesanan diterima
              </p>
              <div className="bg-muted/60 rounded-lg p-3 w-full">
                <p className="font-body text-xs text-muted-foreground">
                  Siapkan uang pas untuk mempermudah transaksi
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Confirm button & note */}
        <div className="mt-10 flex flex-col items-center gap-4 max-w-md mx-auto">
          <Button onClick={handleConfirm} size="lg" className="w-full gap-2">
            <MessageCircle className="w-5 h-5" /> Konfirmasi Pembayaran
          </Button>
          <p className="font-body text-xs text-muted-foreground text-center">
            Pesanan akan diproses setelah pembayaran dikonfirmasi
          </p>
        </div>
      </div>

      {/* QR Modal */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-center">QRIS Dimsumku</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            <img src={qrisImage} alt="QRIS Dimsumku" className="w-64 h-80 rounded-lg border border-border object-contain" loading="lazy" width={512} height={640} />
          </div>
          <p className="font-body text-xs text-muted-foreground text-center">
            Scan menggunakan aplikasi e-wallet atau mobile banking Anda
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PaymentSection;
