import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-teletaquilla.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center">
          <img src={logo} alt="TeleTaquilla" className="h-8" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#eventos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Eventos</a>
          <a href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Cómo funciona</a>
          <a href="#promotores" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Para promotores</a>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-5">Mis entradas</Button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background py-4 px-4 space-y-3">
          <a href="#eventos" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Eventos</a>
          <a href="#como-funciona" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Cómo funciona</a>
          <a href="#promotores" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Para promotores</a>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full w-full">Mis entradas</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
