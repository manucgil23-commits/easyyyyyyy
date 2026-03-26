import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

interface Zone {
  id: string;
  name: string;
  priceRange: string;
  available: number;
  color: string;
  path: string;
}

const ZONES: Zone[] = [
  { id: "sol", name: "Sol", priceRange: "15€ - 25€", available: 142, color: "hsl(21 79% 51%)", path: "M200,180 L300,140 L380,180 L380,280 L300,320 L200,280 Z" },
  { id: "sombra", name: "Sombra", priceRange: "30€ - 50€", available: 86, color: "hsl(218 58% 34%)", path: "M80,140 L200,80 L200,180 L200,280 L200,380 L80,320 Z" },
  { id: "tendido-alto", name: "Tendido Alto", priceRange: "20€ - 35€", available: 210, color: "hsl(142 60% 45%)", path: "M300,80 L420,80 L480,140 L380,180 L300,140 Z" },
  { id: "palcos", name: "Palcos VIP", priceRange: "60€ - 120€", available: 24, color: "hsl(0 70% 55%)", path: "M80,320 L200,380 L300,380 L380,280 L380,340 L300,400 L200,420 L80,380 Z" },
];

interface Props {
  event: { title: string; date: string; venue: string; category: string; description: string; image: string };
  onSelectZone: (zoneId: string) => void;
}

const EventDetail = ({ event, onSelectZone }: Props) => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="space-y-8">
      {/* Event Banner */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 aspect-video md:aspect-auto">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-6 md:p-8 flex-1">
            <Badge className="bg-primary text-primary-foreground mb-3">{event.category}</Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{event.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CalendarDays className="h-4 w-4" />
              <span className="text-sm">{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{event.venue}</span>
            </div>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Zone Selection */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-6">Selecciona una zona</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SVG Map */}
          <div className="bg-card rounded-xl border border-border p-4 relative">
            <div className="flex justify-end gap-2 mb-2">
              <button onClick={() => setZoom(Math.min(zoom + 0.2, 2))} className="p-1.5 rounded bg-muted hover:bg-muted/80">
                <ZoomIn className="h-4 w-4" />
              </button>
              <button onClick={() => setZoom(Math.max(zoom - 0.2, 0.6))} className="p-1.5 rounded bg-muted hover:bg-muted/80">
                <ZoomOut className="h-4 w-4" />
              </button>
            </div>
            <svg viewBox="0 0 560 500" className="w-full" style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.3s' }}>
              {/* Arena outline */}
              <ellipse cx="280" cy="250" rx="250" ry="220" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
              <ellipse cx="280" cy="250" rx="100" ry="80" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
              <text x="280" y="255" textAnchor="middle" fontSize="12" fill="hsl(var(--muted-foreground))">Ruedo</text>
              {ZONES.map((zone) => (
                <g key={zone.id}>
                  <path
                    d={zone.path}
                    fill={hoveredZone === zone.id ? zone.color : `${zone.color.replace(')', ' / 0.6)')}`}
                    stroke={zone.color}
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredZone(zone.id)}
                    onMouseLeave={() => setHoveredZone(null)}
                    onClick={() => onSelectZone(zone.id)}
                  />
                  {hoveredZone === zone.id && (
                    <foreignObject x="150" y="200" width="260" height="80">
                      <div className="bg-foreground text-background rounded-lg p-3 text-xs shadow-lg">
                        <p className="font-bold">{zone.name}</p>
                        <p>Desde {zone.priceRange}</p>
                        <p>{zone.available} butacas disponibles</p>
                      </div>
                    </foreignObject>
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Zone list */}
          <div className="space-y-3">
            {ZONES.map((zone) => (
              <div
                key={zone.id}
                className="bg-card rounded-xl border border-border p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full shrink-0" style={{ background: zone.color }} />
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{zone.name}</h3>
                    <p className="text-xs text-muted-foreground">{zone.priceRange}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block w-24">
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.min((zone.available / 250) * 100, 100)}%`, background: zone.color }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{zone.available} disponibles</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-4"
                    onClick={() => onSelectZone(zone.id)}
                  >
                    Seleccionar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
