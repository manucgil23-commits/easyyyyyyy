import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[500px] md:min-h-[550px] flex items-center overflow-hidden">
      <img
        src={heroBg}
        alt="Evento en vivo"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
      <div className="relative container py-20">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-4">
            Compra tus entradas en segundos
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-md">
            La plataforma de confianza para eventos en vivo. Elige tu butaca, paga seguro, recibe tu entrada al instante.
          </p>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 text-base font-semibold shadow-lg"
            asChild
          >
            <a href="#eventos">Ver eventos disponibles</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
