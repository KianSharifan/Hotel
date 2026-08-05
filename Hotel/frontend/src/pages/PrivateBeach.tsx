import LuxurySection from "../layouts/AmenitiesLayout";

export default function PrivateBeach() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-white min-h-screen">
      <div className="h-[60vh] bg-[url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21')] bg-cover bg-center flex items-center justify-center">
        <div className="bg-black/40 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-light tracking-widest">
            Private Beach
          </h1>
        </div>
      </div>

      <LuxurySection
        title="Exclusive Shoreline"
        subtitle="Secluded luxury experience"
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
      >
        Enjoy crystal-clear waters, soft white sand, and absolute privacy in
        your own luxury beachfront escape.
      </LuxurySection>

      <LuxurySection
        reverse
        title="Sunset Lounge"
        subtitle="Unforgettable evenings"
        image="https://images.unsplash.com/photo-1493558103817-58b2924bce98"
      >
        Private cabanas, cocktail service, and sunset views designed for pure
        relaxation.
      </LuxurySection>
    </div>
  );
}