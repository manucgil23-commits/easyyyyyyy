import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className="w-full flex justify-center px-4 pb-6">
      <div className="relative w-full md:w-[60%]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar eventos, artistas, recintos..."
          className="w-full pl-12 pr-4 py-3.5 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:shadow-md transition-all"
        />
      </div>
    </div>
  );
};

export default SearchBar;
