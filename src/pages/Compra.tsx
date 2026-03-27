import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { events } from "@/components/FeaturedEvents";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventDetail from "@/components/compra/EventDetail";
import SeatSelection from "@/components/compra/SeatSelection";
import CheckoutStep from "@/components/compra/CheckoutStep";
import Confirmation from "@/components/compra/Confirmation";
import PurchaseBreadcrumb from "@/components/compra/PurchaseBreadcrumb";

export type SelectedSeat = {
  row: string;
  number: number;
  price: number;
};

export type PurchaseStep = 1 | 2 | 3 | 4;

const Compra = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === Number(id));

  const [step, setStep] = useState<PurchaseStep>(1);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  const [orderRef, setOrderRef] = useState("");

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Evento no encontrado</h2>
            <button onClick={() => navigate("/")} className="text-accent hover:underline">Volver a eventos</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const eventData = {
    title: event.title,
    date: event.date,
    venue: event.venue,
    category: event.category,
    description: "Disfruta de un espectáculo único en vivo. Una experiencia inolvidable en uno de los mejores recintos de España.",
    image: event.image,
  };

  const goToZoneSelection = (zone: string) => {
    setSelectedZone(zone);
    setStep(2);
  };

  const goToCheckout = () => setStep(3);

  const goToConfirmation = () => {
    setOrderRef(`TTK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    setStep(4);
  };

  const goBack = () => {
    if (step === 2) { setStep(1); setSelectedSeats([]); }
    else if (step === 3) setStep(2);
  };

  const toggleSeat = (seat: SelectedSeat) => {
    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.row === seat.row && s.number === seat.number);
      if (exists) return prev.filter((s) => !(s.row === seat.row && s.number === seat.number));
      if (prev.length >= 6) return prev;
      return [...prev, seat];
    });
  };

  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <div className="container py-4">
        <PurchaseBreadcrumb step={step} zone={selectedZone} eventTitle={event.title} onBack={goBack} />
      </div>
      <div className="flex-1 container pb-12">
        {step === 1 && <EventDetail event={eventData} onSelectZone={goToZoneSelection} />}
        {step === 2 && <SeatSelection zone={selectedZone!} selectedSeats={selectedSeats} onToggleSeat={toggleSeat} onContinue={goToCheckout} onBack={goBack} />}
        {step === 3 && <CheckoutStep event={eventData} zone={selectedZone!} selectedSeats={selectedSeats} total={total} onConfirm={goToConfirmation} onBack={goBack} />}
        {step === 4 && <Confirmation event={eventData} orderRef={orderRef} selectedSeats={selectedSeats} total={total} zone={selectedZone ?? undefined} />}
      </div>
      <Footer />
    </div>
  );
};

export default Compra;
