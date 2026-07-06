import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

function Restaurant() {
  const navigate= useNavigate()
  const expRef = useRef<HTMLDivElement | null>(null)
  const [expVisible, setExpVisible] = useState(false)

  useEffect(() => {

    const observer = new IntersectionObserver(([entry]) => {setExpVisible(entry.isIntersecting)}, 
    {threshold: 0.2})

    if (expRef.current) 
      observer.observe(expRef.current)
    }, [])



  const dishesRef = useRef<HTMLDivElement | null>(null)
  const [dishesVisible, setDishesVisible] = useState(false)

  useEffect(() => {

    const observer = new IntersectionObserver(([entry]) => {setDishesVisible(entry.isIntersecting)}, 
    {threshold: 0.2})

    if (dishesRef.current) 
      observer.observe(dishesRef.current)
  }, [])



  const dishes = [
    {
      name: "Wagyu Royal Steak",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2070",
      description: "Premium Japanese Wagyu with truffle sauce."
    },
    {
      name: "Ocean Lobster",
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1974",
      description: "Fresh lobster with herb butter."
    },
    {
      name: "Golden Dessert",
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1974",
      description: "Signature dessert with edible gold."
    }
  ]


  return (

    <div className="bg-black text-white">
{/* hero */}
      <section
        className="
          h-screen
          bg-cover
          bg-center
          flex
          items-center
          justify-center
          relative
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070')"
        }}
      >

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-6">

          <h1 className="text-7xl font-bold mb-6">
            Noire Restaurant
          </h1>

          <p className="text-xl text-gray-300 mb-10">
            Luxury fine dining experience
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={()=>navigate("/restaurant/menu")}
              className="w-52 bg-white text-black px-8 py-4 rounded-xl border-2 border-gray-700/50
              transition-all
              duration-300
              hover:bg-gray-300
              hover:scale-105">
              Menu
            </button>

            <button
              onClick={()=>navigate("/restaurant/restaurantReservation")}
              className="w-52 bg-white text-black px-8 py-4 rounded-xl border-2 border-gray-700/50
              transition-all
              duration-300
              hover:bg-gray-300
              hover:scale-105">
              Reserve Table
            </button>
        </div>



        </div>

      </section>


      {/*experience*/}
      <section
        ref={expRef}
        className={`
          py-32 px-10 max-w-6xl mx-auto
          transition-all duration-1000
          ${expVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
        `}
      >

        <div className="grid md:grid-cols-2 gap-16 items-center">

          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
            className="rounded-3xl h-[600px] object-cover w-full"
          />

          <div>

            <h2 className="text-5xl font-bold mb-6">
              Michelin-Level Dining
            </h2>

            <p className="text-gray-300 text-lg">
              Experience world-class cuisine crafted by elite chefs.
            </p>

          </div>

        </div>

      </section>


      {/*dishes*/}
      <section
        ref={dishesRef}
        className="bg-white text-black py-32 px-10"
      >

        <div className="text-center mb-20">

          <h2 className="text-6xl font-bold">
            Signature Dishes
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {dishes.map((dish, index) => (

            <div
              key={index}
              className={`
                rounded-3xl overflow-hidden shadow-xl
                transition-all duration-700
                ${dishesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
              `}
            >

              <img
                src={dish.image}
                className="h-80 w-full object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold mb-2">
                  {dish.name}
                </h3>

                <p className="text-gray-600">
                  {dish.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  )
}

export default Restaurant