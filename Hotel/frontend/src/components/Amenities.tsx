import { Link } from "react-router-dom"
// import { useNavigate } from "react-router-dom"


function Amenities() {
  // const navigate = useNavigate()

  return (

    <section className="bg-gray-100 py-28 px-10">

      <div className="text-center mb-20">

        <h2 className="text-6xl font-bold mb-6">

          Resort Experiences

        </h2>

      </div>

      <div  className="grid grid-cols-1 md:grid-cols-4 gap-8">

        <Link to="/restaurant" className="block bg-white p-10 rounded-3xl text-center shadow-lg 
          hover:bg-gray-200 
          transition-all 
          duration-700 
          hover:scale-[1.1]">
          <h3 className="text-3xl font-bold mb-4">Restaurant</h3>
          <p>Fine dining experience with world-class chefs.</p>
        </Link>


        <Link to="/amenities/spa" className="bg-white p-10 rounded-3xl text-center shadow-lg
          hover:bg-gray-200
          transition
          transition-all
          duration-700
          hover:scale-[1.1]">
          <h3 className="text-3xl font-bold mb-4">Spa</h3>
          <p>Relax and rejuvenate in our luxury spa.</p>
        </Link>

        <Link to="/amenities/golf" className="bg-white p-10 rounded-3xl text-center shadow-lg
          hover:bg-gray-200
          transition
          transition-all
          duration-700
          hover:scale-[1.1]">
          <h3 className="text-3xl font-bold mb-4">Golf</h3>
          <p>Exclusive championship golf courses.</p>
        </Link>

        <Link to="/amenities/pool" className="bg-white p-10 rounded-3xl text-center shadow-lg
          hover:bg-gray-200
          transition
          transition-all
          duration-700
          hover:scale-[1.1]">
          <h3 className="text-3xl font-bold mb-4">Pool</h3>
          <p>Infinity pools with breathtaking views.</p>
        </Link>

      </div>

    </section>
  )
}

export default Amenities