import LuxurySection from "../components/Amenitiesformat";

export default function Spa() {
  return (
    <div className="bg-gradient-to-b from-rose-50 via-white to-white min-h-screen">
      <div className="h-[60vh] flex items-center justify-center text-center bg-[url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874')] bg-cover bg-center">
        <div className="bg-black/40 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-light tracking-widest">
            Serenity Spa
          </h1>
        </div>
      </div>

      <LuxurySection
        title="Healing & Relaxation"
        subtitle="A sanctuary of calm and luxury"
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef"
      >
        Experience world-class spa treatments designed to restore balance,
        reduce stress, and rejuvenate your body and mind.
      </LuxurySection>

      <LuxurySection
        reverse
        title="Signature Treatments"
        subtitle="Exclusive wellness rituals"
        image="https://images.unsplash.com/photo-1556228720-195a672e8a03"
      >
        Aromatherapy, deep tissue massage, hot stone therapy, and personalized
        wellness sessions crafted by expert therapists.
      </LuxurySection>
    </div>
  );
}