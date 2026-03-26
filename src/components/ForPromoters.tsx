import { Button } from "@/components/ui/button";
import { BarChart3, Settings, Ticket } from "lucide-react";

const ForPromoters = () => {
  return (
    <section id="promotores" className="relative py-20 overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      </div>
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">¿Organizas eventos?</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Gestiona tu recinto, configura precios por zona y vende entradas con nuestra plataforma. Sin complicaciones, sin cuotas mensuales.
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8">
              Saber más
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Settings, title: "Panel de control", desc: "Gestiona eventos, aforos y precios desde un único dashboard." },
              { icon: BarChart3, title: "Analítica en tiempo real", desc: "Controla ventas, ingresos y ocupación al instante." },
              { icon: Ticket, title: "Venta multicanal", desc: "Vende online, en taquilla y a través de distribuidores." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-primary-foreground/10 backdrop-blur rounded-xl p-5 border border-primary-foreground/20">
                  <Icon className="h-8 w-8 mb-3 text-accent" />
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-primary-foreground/70">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForPromoters;
