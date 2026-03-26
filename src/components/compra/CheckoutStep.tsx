import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Lock, ShieldCheck, CreditCard } from "lucide-react";
import type { SelectedSeat } from "@/pages/Compra";

interface Props {
  event: { title: string; date: string; venue: string };
  zone: string;
  selectedSeats: SelectedSeat[];
  total: number;
  onConfirm: () => void;
  onBack: () => void;
}

const CheckoutStep = ({ event, zone, selectedSeats, total, onConfirm, onBack }: Props) => {
  const [timeLeft, setTimeLeft] = useState(12 * 60);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [terms, setTerms] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isUrgent = timeLeft < 120;
  const managementFee = Math.round(total * 0.1 * 100) / 100;
  const grandTotal = total + managementFee;

  const canSubmit = name.trim() && email.trim() && email === emailConfirm && terms;

  return (
    <div className="space-y-4">
      {/* Timer */}
      <div className={`rounded-xl p-3 flex items-center justify-center gap-2 text-sm font-semibold ${isUrgent ? 'bg-destructive/10 text-destructive' : 'bg-accent/10 text-accent'}`}>
        <Clock className="h-4 w-4" />
        Tu reserva expira en {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Form */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div>
            <h3 className="font-bold text-foreground mb-4">Datos del comprador</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Nombre completo *</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Confirmar email *</label>
                <Input type="email" value={emailConfirm} onChange={(e) => setEmailConfirm(e.target.value)} placeholder="Repite tu email" />
                {emailConfirm && email !== emailConfirm && (
                  <p className="text-xs text-destructive mt-1">Los emails no coinciden</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Teléfono (opcional)</label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+34 600 000 000" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Método de pago</h3>
            <div className="bg-muted rounded-xl p-4 flex items-center gap-4">
              <CreditCard className="h-8 w-8 text-primary" />
              <div className="flex gap-2">
                <div className="bg-background rounded px-2 py-1 text-xs font-bold text-primary border border-border">VISA</div>
                <div className="bg-background rounded px-2 py-1 text-xs font-bold text-accent border border-border">MC</div>
              </div>
              <span className="text-sm text-muted-foreground">Tarjeta de crédito/débito</span>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={terms} onChange={() => setTerms(!terms)} className="mt-1 accent-accent" />
            <span className="text-sm text-muted-foreground">
              Acepto los <a href="#" className="text-primary underline">términos y condiciones</a> y la <a href="#" className="text-primary underline">política de privacidad</a>.
            </span>
          </label>

          <Button
            size="lg"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-semibold text-base"
            disabled={!canSubmit}
            onClick={onConfirm}
          >
            <Lock className="h-4 w-4 mr-2" />
            Pagar {grandTotal.toFixed(2)}€
          </Button>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-bold text-foreground mb-4">Resumen del pedido</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Evento</span>
                <span className="font-medium text-foreground text-right">{event.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha</span>
                <span className="text-foreground">{event.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Zona</span>
                <span className="text-foreground capitalize">{zone}</span>
              </div>
              <div className="border-t border-border my-2" />
              {selectedSeats.map((s) => (
                <div key={`${s.row}-${s.number}`} className="flex justify-between">
                  <span className="text-muted-foreground">Fila {s.row}, Butaca {s.number}</span>
                  <span className="text-foreground">{s.price}€</span>
                </div>
              ))}
              <div className="border-t border-border my-2" />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{total}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gastos de gestión</span>
                <span className="text-foreground">{managementFee.toFixed(2)}€</span>
              </div>
              <div className="border-t border-border my-2" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-foreground text-base">TOTAL</span>
                <span className="text-2xl font-bold text-accent">{grandTotal.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-green-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-800">Pago 100% seguro</p>
              <p className="text-xs text-green-600">Encriptación SSL de nivel bancario</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutStep;
