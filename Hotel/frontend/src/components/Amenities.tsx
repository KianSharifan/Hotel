function Amenities() {

  return (

    <section className="bg-gray-100 py-28 px-10">

      <div className="text-center mb-20">

        <h2 className="text-6xl font-bold mb-6">

          Resort Experiences

        </h2>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        <div className="bg-white p-10 rounded-3xl text-center shadow-lg">
          <h3 className="text-3xl font-bold mb-4">Restaurant</h3>
          <p>Fine dining experience with world-class chefs.</p>
        </div>

        <div className="bg-white p-10 rounded-3xl text-center shadow-lg">
          <h3 className="text-3xl font-bold mb-4">Spa</h3>
          <p>Relax and rejuvenate in our luxury spa.</p>
        </div>

        <div className="bg-white p-10 rounded-3xl text-center shadow-lg">
          <h3 className="text-3xl font-bold mb-4">Golf</h3>
          <p>Exclusive championship golf courses.</p>
        </div>

        <div className="bg-white p-10 rounded-3xl text-center shadow-lg">
          <h3 className="text-3xl font-bold mb-4">Pool</h3>
          <p>Infinity pools with breathtaking views.</p>
        </div>

      </div>

    </section>
  )
}

export default Amenities