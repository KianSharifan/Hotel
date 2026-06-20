function Footer() {

  return (

    <footer className="bg-black text-white py-16 text-center">
      <div className="grid md:grid-cols-3 gap-6">
  
        <div
          className="
          text-m
          space-y-2
          py-4
          
          "
        >

          <p>
            212-308-9100
          </p>

          <p>
            contact@noire.com
          </p>

        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-bold mb-4">
            NOIRE PALACE
          </h2>

          <p className="text-gray-400">
            Luxury Resort & Spa
          </p>
        </div>

        <div className="py-2">
          <p>Location:</p>
          <p>United States,
            New York,<br></br>
            220 Central Park South,NY 10019</p>
        </div>


      </div>
    </footer>
  )
}

export default Footer