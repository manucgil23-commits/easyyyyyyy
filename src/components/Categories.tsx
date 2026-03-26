import { useState } from "react";
import { Music, Theater, Film, Trophy, Flame } from "lucide-react";

const categories = [
  { label: "Toros", icon: Flame },
  { label: "Conciertos", icon: Music },
  { label: "Teatro", icon: Theater },
  { label: "Cine", icon: Film },
  { label: "Deportes", icon: Trophy },
];

interface Props {
  active: string | null;
  onSelect: (cat: string | null) => void;
}

const Categories = ({ active, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-8">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = active === cat.label;
        return (
          <button
            key={cat.label}
            onClick={() => onSelect(isActive ? null : cat.label)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all ${
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-md"
                : "bg-background text-foreground border-border hover:border-primary/40 hover:shadow-sm"
            }`}
          >
            <Icon className="h-4 w-4" />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
