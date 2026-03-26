import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Clock } from "lucide-react";
import type { SelectedSeat } from "@/pages/Compra";

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const SEATS_PER_ROW = 16;

const generateSeatMap = () => {
  const sold = new Set<string>();
  const reserved = new Set<string>();
  // Mark random seats as sold/reserved
  for (let i = 0; i < 30; i++) {
    const row = ROWS[Math.floor(Math.random() * ROWS.length)];
    const num = Math.floor(Math.random() * SEATS_PER_ROW) + 1;
    sold.add(`${row}-${num}`);
  }
  for (let i = 0; i < 10; i++) {
    const row = ROWS[Math.floor(Math.random() * ROWS.length)];
    const num = Math.floor(Math.random() * SEATS_PER_ROW) + 1;
    if (!sold.has(`${row}-${num}`)) reserved.add(`${row}-${num}`);
  }
  return { sold, reserved };
};

const { sold, reserved } = generateSeatMap();

interface Props {
  zone: string;
  selectedSeats: SelectedSeat[];
  onToggleSeat: (seat: SelectedSeat) => void;
  onContinue: () => void;
  onBack: () => void;
}

const SeatSelection = ({ zone, selectedSeats, onToggleSeat, onContinue, onBack }: Props) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isUrgent = timeLeft < 120;

  const getPrice = (row: string) => {
    const idx = ROWS.indexOf(row);
    return idx < 3 ? 35 : idx < 6 ? 25 : 15;
  };

  const total = selectedSeats.reduce((s, seat) => s + seat.price, 0);

  return (
    <div className="space-y-4">
      {/* Timer */}
      <div className={`rounded-xl p-3 flex items-center justify-center gap-2 text-sm font-semibold ${isUrgent ? 'bg-destructive/10 text-destructive' : 'bg-accent/10 text-accent'}`}>
        <Clock className="h-4 w-4" />
        Tu reserva expira en {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Seat map */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">Zona: {zone} — Selecciona hasta 6 butacas</h3>
          
          {/* Stage */}
          <div className="w-48 h-8 mx-auto mb-6 rounded-t-full bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium">
            Escenario
          </div>

          <div className="space-y-2 overflow-x-auto">
            {ROWS.map((row) => (
              <div key={row} className="flex items-center gap-1 justify-center">
                <span className="w-6 text-xs text-muted-foreground font-mono">{row}</span>
                {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                  const num = i + 1;
                  const key = `${row}-${num}`;
                  const isSold = sold.has(key);
                  const isReserved = reserved.has(key);
                  const isSelected = selectedSeats.some((s) => s.row === row && s.number === num);
                  const price = getPrice(row);

                  let bgClass = "bg-green-500 hover:bg-green-400 cursor-pointer"; // available
                  if (isSold) bgClass = "bg-muted cursor-not-allowed";
                  else if (isReserved) bgClass = "bg-destructive/60 cursor-not-allowed";
                  else if (isSelected) bgClass = "bg-accent cursor-pointer ring-2 ring-accent ring-offset-1";

                  return (
                    <div key={key} className="relative">
                      <button
                        className={`w-6 h-6 md:w-7 md:h-7 rounded-full ${bgClass} transition-all text-[9px] font-bold text-primary-foreground`}
                        disabled={isSold || isReserved}
                        onClick={() => onToggleSeat({ row, number: num, price })}
                        onMouseEnter={() => setHoveredSeat(key)}
                        onMouseLeave={() => setHoveredSeat(null)}
                      >
                        {num}
                      </button>
                      {hoveredSeat === key && !isSold && !isReserved && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background rounded px-2 py-1 text-[10px] whitespace-nowrap z-10 shadow-lg">
                          Fila {row}, Butaca {num} — {price}€
                        </div>
                      )}
                    </div>
                  );
                })}
                <span className="w-6 text-xs text-muted-foreground font-mono">{row}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-green-500" /> Disponible</div>
            <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-accent" /> Tu selección</div>
            <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-destructive/60" /> Reservada</div>
            <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-muted" /> Vendida</div>
          </div>
        </div>

        {/* Selection panel */}
        <div className="bg-card rounded-xl border border-border p-5 h-fit sticky top-20">
          <h3 className="font-bold text-foreground mb-4">Tu selección</h3>
          {selectedSeats.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">Selecciona butacas en el mapa</p>
          ) : (
            <div className="space-y-2 mb-4">
              {selectedSeats.map((s) => (
                <div key={`${s.row}-${s.number}`} className="flex items-center justify-between text-sm bg-muted rounded-lg px-3 py-2">
                  <span>Fila {s.row}, Butaca {s.number}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{s.price}€</span>
                    <button onClick={() => onToggleSeat(s)} className="text-muted-foreground hover:text-destructive">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="border-t border-border pt-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground">Total</span>
              <span className="text-2xl font-bold text-accent">{total}€</span>
            </div>
          </div>
          <Button
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-semibold"
            disabled={selectedSeats.length === 0}
            onClick={onContinue}
          >
            Continuar al pago
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
