import { ArrowLeft, ChevronRight } from "lucide-react";
import type { PurchaseStep } from "@/pages/Compra";
import { useNavigate } from "react-router-dom";

interface Props {
  step: PurchaseStep;
  zone: string | null;
  eventTitle: string;
  onBack?: () => void;
}

const PurchaseBreadcrumb = ({ step, zone, eventTitle, onBack }: Props) => {
  const navigate = useNavigate();

  const crumbs: string[] = [];
  if (step === 4) {
    crumbs.push("Confirmación");
  } else {
    crumbs.push("Eventos");
    crumbs.push(eventTitle);
    if (step >= 2) crumbs.push(zone ?? "Zona");
    if (step >= 3) crumbs.push("Pago");
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {step > 1 && step < 4 && (
        <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mr-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
      )}
      {step === 1 && (
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mr-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
      )}
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
          <span className={i === crumbs.length - 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
            {c}
          </span>
        </span>
      ))}
    </div>
  );
};

export default PurchaseBreadcrumb;
