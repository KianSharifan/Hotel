import hotelImage from "../assets/hero.png"

function Hero() {

  return (

    <section
      className="
      relative
      h-screen
      bg-fixed
      bg-cover
      bg-center
      flex
      items-center
      justify-center
      "
    //   style={{
    //     backgroundImage:
    //       "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070')"
    //   }}

    style={{
        backgroundImage: `url(${hotelImage})`
    }}
    >

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl px-6">

        <p className="uppercase tracking-[10px] mb-6 text-lg">

          Luxury Resort & Spa

        </p>

        <h1 className="text-7xl md:text-8xl font-bold leading-tight mb-8">

          Experience Timeless Elegance

        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-10">

          Discover world-class hospitality,
          breathtaking suites,
          and unforgettable moments.

        </p>

        <div className="flex justify-center gap-6">

          <button
            className="
            bg-white
            text-black
            px-8
            py-4
            rounded-xl
            text-lg
            hover:bg-gray-300
            transition
            "
          >
            Explore Rooms
          </button>

          <button
            className="
            border
            border-white
            px-8
            py-4
            rounded-xl
            text-lg
            hover:bg-white
            hover:text-black
            transition
            "
          >
            Book Now
          </button>

        </div>

      </div>

    </section>
  )
}

export default Hero