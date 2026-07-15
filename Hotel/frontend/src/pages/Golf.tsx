import LuxurySection from "../components/Amenitiesformat";

export default function Golf() {
  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-white min-h-screen">
      <div className="h-[60vh] bg-[url('https://images.unsplash.com/photo-1592919505780-303950717480')] bg-cover bg-center flex items-center justify-center">
        <div className="bg-black/40 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-light tracking-widest">
            Oceanview Golf
          </h1>
        </div>
      </div>

      <LuxurySection
        title="Championship Course"
        subtitle="Designed for precision and beauty"
        image="https://images.unsplash.com/photo-1535131749006-b7f58c99034b"
      >
        Play on a world-class 18-hole golf course surrounded by breathtaking
        coastal views and perfect fairways.
      </LuxurySection>

      <LuxurySection
        reverse
        title="Elite Training"
        subtitle="Perfect your swing"
        image="https://images.unsplash.com/photo-1600679472829-3044539ce8ed"
      >
        Private coaching, advanced simulators, and pro-level facilities for all
        skill levels.
      </LuxurySection>
    </div>
  );
}