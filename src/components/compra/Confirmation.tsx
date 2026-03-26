import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Download, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { SelectedSeat } from "@/pages/Compra";

interface Props {
  event: { title: string; date: string; venue: string };
  orderRef: string;
  selectedSeats: SelectedSeat[];
  total: number;
}

const Confirmation = ({ event, orderRef, selectedSeats, total }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      {/* Success */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 animate-fade-in-up">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">¡Compra completada!</h1>
        <p className="text-muted-foreground">
          Hemos enviado tus entradas a <strong>tu@email.com</strong>
        </p>
      </div>

      {/* Order Card */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Referencia</span>
          <span className="font-mono font-bold text-primary text-lg">{orderRef}</span>
        </div>
        <div className="border-t border-border" />
        <p className="font-bold text-foreground">{event.title}</p>
        <p className="text-sm text-muted-foreground">{event.date}</p>
        <p className="text-sm text-muted-foreground">{event.venue}</p>
        <div className="border-t border-border" />
        {selectedSeats.map((s) => (
          <div key={`${s.row}-${s.number}`} className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fila {s.row}, Butaca {s.number}</span>
            <span className="text-foreground">{s.price}€</span>
          </div>
        ))}
        <div className="border-t border-border" />
        <div className="flex justify-between items-center">
          <span className="font-bold text-foreground">Total pagado</span>
          <span className="text-2xl font-bold text-accent">{total}€</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold">
          <Download className="h-4 w-4 mr-2" />
          Descargar entradas (PDF)
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1 rounded-full font-semibold"
          onClick={() => navigate("/")}
        >
          Volver a eventos
        </Button>
      </div>

      {/* Lookup */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-bold text-foreground mb-2">¿Ya tienes entradas?</h3>
        <p className="text-sm text-muted-foreground mb-4">Busca tu pedido introduciendo tu referencia y email.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input placeholder="Referencia (TTK-XXXX)" className="flex-1" />
          <Input type="email" placeholder="tu@email.com" className="flex-1" />
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
