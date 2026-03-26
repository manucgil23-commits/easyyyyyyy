import logo from "@/assets/logo-teletaquilla.png";

const Footer = () => {
  return (
    <footer className="bg-footer-bg text-primary-foreground py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={logo} alt="TeleTaquilla" className="h-8 brightness-0 invert mb-4" />
            <p className="text-sm text-primary-foreground/60">
              La plataforma de venta de entradas para eventos en vivo más fiable de España.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3">Eventos</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Toros</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Conciertos</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Teatro</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Cine</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Deportes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3">Empresa</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Trabaja con nosotros</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Política de privacidad</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/40">
          © 2026 TeleTaquilla. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
