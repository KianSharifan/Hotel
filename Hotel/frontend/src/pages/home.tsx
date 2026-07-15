import { useState } from "react"
import Navbar from "../components/navbar"
import Hero from "../components/Hero"
import Events from "../components/Events"
import Amenities from "../components/Amenities"
import Footer from "../components/Footer"
import IntroScreen from "../components/IntroScreen"

function Home() {
  const [introDone, setIntroDone] = useState(
    () => sessionStorage.getItem("introSeen") === "true"
  )

  const handleIntroDone = () => {
    sessionStorage.setItem("introSeen", "true")
    setIntroDone(true)
  }

  return (
    <div>
      {!introDone && <IntroScreen onDone={handleIntroDone} />}

      <Navbar />
      <Hero />
      <Events />
      <Amenities />
      <Footer />
    </div>
  )
}

export default Home
