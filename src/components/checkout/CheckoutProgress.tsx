import { ShoppingCart, ClipboardList, CreditCard, CheckCircle2 } from "lucide-react";

const steps = [
  { label: "Keranjang", icon: ShoppingCart },
  { label: "Checkout", icon: ClipboardList },
  { label: "Pembayaran", icon: CreditCard },
  { label: "Selesai", icon: CheckCircle2 },
];

const CheckoutProgress = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center gap-0">
    {steps.map((step, i) => {
      const Icon = step.icon;
      const isActive = i + 1 <= currentStep;
      const isCurrent = i + 1 === currentStep;
      return (
        <div key={step.label} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isCurrent
                  ? "bg-primary text-primary-foreground shadow-md"
                  : isActive
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-body font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 sm:w-16 h-0.5 mx-1 mt-[-1rem] ${i + 1 < currentStep ? "bg-primary" : "bg-border"}`} />
          )}
        </div>
      );
    })}
  </div>
);

export default CheckoutProgress;
