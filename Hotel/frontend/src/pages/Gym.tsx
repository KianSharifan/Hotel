import LuxurySection from "../layouts/AmenitiesLayout";

export default function Gym() {
  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-white min-h-screen">
      <div className="h-[60vh] flex items-center justify-center text-center bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48')] bg-cover bg-center">
        <div className="bg-black/40 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-light tracking-widest">
            Fitness Center
          </h1>
        </div>
      </div>

      <LuxurySection
        title="Strength & Endurance"
        subtitle="Train without limits"
        image="https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
      >
        State-of-the-art equipment and open, sunlit space designed to power
        every kind of workout, from strength training to high-intensity cardio.
      </LuxurySection>

      <LuxurySection
        reverse
        title="Personal Training"
        subtitle="Guidance built around you"
        image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
      >
        Certified trainers offer personalized sessions, tailored programs,
        and expert coaching to help you reach your goals during your stay.
      </LuxurySection>
    </div>
  );
}