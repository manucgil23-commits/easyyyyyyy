import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import SearchBar from "@/components/SearchBar";
import FeaturedEvents from "@/components/FeaturedEvents";
import HowItWorks from "@/components/HowItWorks";
import TrustFeatures from "@/components/TrustFeatures";
import ForPromoters from "@/components/ForPromoters";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Categories active={activeCategory} onSelect={setActiveCategory} />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <FeaturedEvents activeCategory={activeCategory} searchQuery={searchQuery} />
      <HowItWorks />
      <TrustFeatures />
      <ForPromoters />
      <Footer />
    </div>
  );
};

export default Index;
