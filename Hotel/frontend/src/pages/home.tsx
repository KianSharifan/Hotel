// import Navbar from "../components/navbar"
// import Hero from "../components/Hero"
// import FeaturedRooms from "../components/FeaturedRooms"
// import Amenities from "../components/Amenities"
// import Footer from "../components/Footer"

// function Home() {

//   return (

//     <div>

//       <Navbar />

//       <Hero />

//       <FeaturedRooms />

//       <Amenities />

//       <Footer /> 

//     </div>
//   )
// }

// export default Home


import { useState } from "react"
import Navbar from "../components/navbar"
import Hero from "../components/Hero"
import FeaturedRooms from "../components/FeaturedRooms"
import Amenities from "../components/Amenities"
import Footer from "../components/Footer"
import IntroScreen from "../components/IntroScreen"

function Home() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <div>
      {/* Intro sits fixed on top — the real page is always underneath */}
      {!introDone && <IntroScreen onDone={() => setIntroDone(true)} />}

      {/* Real page is always rendered, just beneath the intro overlay */}
      <Navbar />
      <Hero />
      <FeaturedRooms />
      <Amenities />
      <Footer />
    </div>
  )
}

export default Home
