import { ShieldCheck, Zap, Armchair, MessageCircle } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Pago 100% seguro", desc: "Todas las transacciones están protegidas con encriptación de nivel bancario." },
  { icon: Zap, title: "Entrada instantánea", desc: "Recibe tu entrada digital en segundos, sin esperas ni colas." },
  { icon: Armchair, title: "Elige tu butaca", desc: "Selecciona el asiento exacto que quieres con nuestro mapa interactivo." },
  { icon: MessageCircle, title: "Soporte en español", desc: "Nuestro equipo te atiende en español, siempre que lo necesites." },
];

const TrustFeatures = () => {
  return (
    <section className="container py-20">
      <h2 className="text-3xl font-bold text-center mb-12">¿Por qué TeleTaquilla?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrustFeatures;
