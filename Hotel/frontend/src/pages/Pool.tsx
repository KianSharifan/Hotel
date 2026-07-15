import LuxurySection from "../components/Amenitiesformat";

export default function Pool() {
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-white min-h-screen">
      <div className="h-[60vh] bg-[url('https://images.unsplash.com/photo-1572331165267-854da2b10ccc')] bg-cover bg-center flex items-center justify-center">
        <div className="bg-black/40 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-light tracking-widest">
            Infinity Pool
          </h1>
        </div>
      </div>

      <LuxurySection
        title="Skyline Infinity Pool"
        subtitle="Swim above the horizon"
        image="https://images.unsplash.com/photo-1530971013997-e06bb52a2372"
      >
        A breathtaking infinity pool blending seamlessly with ocean and sky.
        Designed for ultimate relaxation and luxury.
      </LuxurySection>

      <LuxurySection
        reverse
        title="Poolside Service"
        subtitle="Luxury at every moment"
        image="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba"
      >
        Enjoy cocktails, gourmet snacks, and private cabana service without
        leaving the water.
      </LuxurySection>
    </div>
  );
}