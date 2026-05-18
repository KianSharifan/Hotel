function FeaturedRooms() {

  return (

    <section className="bg-white py-28 px-10">

      <div className="text-center mb-20">

        <p className="uppercase tracking-[8px] text-gray-500 mb-4">
          Accommodation
        </p>

        <h2 className="text-6xl font-bold">
          Featured Suites
        </h2>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        <div className="rounded-3xl overflow-hidden shadow-xl">

          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974"
            className="h-80 w-full object-cover"
          />

          <div className="p-8">

            <h3 className="text-3xl font-bold mb-4">
              Presidential Suite
            </h3>

            <p className="text-gray-600 mb-6">

              Elegant luxury suite with breathtaking ocean views.

            </p>

            <button className="bg-black text-white px-6 py-3 rounded-xl">

              View Details

            </button>

          </div>

        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl">

                <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974"
                    className="h-80 w-full object-cover"
                />

                <div className="p-8">

                    <h3 className="text-3xl font-bold mb-4">
                    Presidential Suite
                    </h3>

                    <p className="text-gray-600 mb-6">

                    Elegant luxury suite with breathtaking ocean views.

                    </p>

                    <button className="bg-black text-white px-6 py-3 rounded-xl">

                    View Details

                    </button>

                </div>

                </div>

                
                <div className="rounded-3xl overflow-hidden shadow-xl">

                        <img
                            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974"
                            className="h-80 w-full object-cover"
                        />

                        <div className="p-8">

                            <h3 className="text-3xl font-bold mb-4">
                            Presidential Suite
                            </h3>

                            <p className="text-gray-600 mb-6">

                            Elegant luxury suite with breathtaking ocean views.

                            </p>

                            <button className="bg-black text-white px-6 py-3 rounded-xl">

                            View Details

                            </button>

                        </div>

                        </div>


      </div>

    </section>
  )
}

export default FeaturedRooms