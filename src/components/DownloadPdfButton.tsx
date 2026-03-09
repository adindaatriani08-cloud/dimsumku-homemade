import { Download } from "lucide-react";
import { useState } from "react";

const DownloadPdfButton = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    const html2pdf = (await import("html2pdf.js")).default;
    const element = document.getElementById("root");
    const opt = {
      margin: 0,
      filename: "Dimsumku-Landing-Page.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };
    await html2pdf().set(opt).from(element).save();
    setLoading(false);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-body text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      <Download className="w-4 h-4" />
      {loading ? "Mengunduh..." : "Download PDF"}
    </button>
  );
};

export default DownloadPdfButton;
