import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import posterCorrida from "@/assets/poster-corrida.jpg";
import posterConcierto from "@/assets/poster-concierto.jpg";
import posterTeatro from "@/assets/poster-teatro.jpg";
import posterCine from "@/assets/poster-cine.jpg";
import posterDeportes from "@/assets/poster-deportes.jpg";

export const events = [
  {
    id: 1,
    title: "Feria de San Isidro 2026",
    category: "Toros",
    date: "15 May 2026 · 18:00",
    venue: "Plaza de Las Ventas, Madrid",
    price: "25€",
    image: posterCorrida,
  },
  {
    id: 2,
    title: "Rosalía — Motomami World Tour",
    category: "Conciertos",
    date: "22 Jun 2026 · 21:00",
    venue: "WiZink Center, Madrid",
    price: "45€",
    image: posterConcierto,
  },
  {
    id: 3,
    title: "El Rey León — El Musical",
    category: "Teatro",
    date: "10 Jul 2026 · 20:30",
    venue: "Teatro Lope de Vega, Madrid",
    price: "35€",
    image: posterTeatro,
  },
  {
    id: 4,
    title: "Noche de Estrenos",
    category: "Cine",
    date: "3 Ago 2026 · 20:00",
    venue: "Cines Callao, Madrid",
    price: "12€",
    image: posterCine,
  },
  {
    id: 5,
    title: "Real Madrid vs FC Barcelona",
    category: "Deportes",
    date: "5 Ago 2026 · 21:00",
    venue: "Santiago Bernabéu, Madrid",
    price: "90€",
    image: posterDeportes,
  },
];

interface Props {
  activeCategory: string | null;
  searchQuery: string;
}

const FeaturedEvents = ({ activeCategory, searchQuery }: Props) => {
  const navigate = useNavigate();

  const filtered = events.filter((e) => {
    const matchCat = !activeCategory || e.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <section id="eventos" className="container py-12">
      <h2 className="text-3xl font-bold text-center mb-2">Eventos destacados</h2>
      <p className="text-muted-foreground text-center mb-8 max-w-lg mx-auto">
        Descubre los eventos más populares y consigue tus entradas antes de que se agoten.
      </p>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No se encontraron eventos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((event) => (
            <div key={event.id} className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={800}
                  height={512}
                />
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {event.category}
                </span>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-foreground line-clamp-2">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {event.venue}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm font-semibold text-foreground">Desde {event.price}</span>
                  <Button
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-4"
                    onClick={() => navigate(`/compra/${event.id}`)}
                  >
                    Comprar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedEvents;
