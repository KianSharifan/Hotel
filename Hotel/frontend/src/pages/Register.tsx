import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createGuest} from "../api/loginApi"
import { useAuth } from "../context/AuthContext"



export default function Register() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { login } = useAuth()

  async function handleRegister() {
    if (!username ||!email ||!password) {
        alert("Please fill all fields")
        return
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
    }

    try {
          const token = await createGuest({
              username,
              email,
              password
          })

          login(token)
          // alert("Account created successfully!")
          const params = new URLSearchParams(location.search)
          const returnTo = params.get("return") ?? "/"
          navigate(returnTo)
    }
    catch (err) {
        if (err instanceof Error)
            alert(err.message)
        else
            alert("Registration failed.")
    }
  }

  return (

    <div
      className="
      min-h-screen
      bg-[#080808]
      flex
      items-center
      justify-center
      px-4
      py-4
      "
    >

      <div
        className="
        w-full
        max-w-2xl
        bg-white/[0.03]
        border
        border-[#c8a84b]/20
        rounded-3xl
        p-8
        md:p-12
        backdrop-blur-sm
        "
      >

        <div className="text-center mb-10">

          <p
            className="
            uppercase
            tracking-[8px]
            text-[#c8a84b]
            text-sm
            mb-4
            "
          >
            Noire Palace
          </p>

          <h1
            className="
            text-4xl
            md:text-5xl
            font-bold
            text-white
            "
          >
            Create Account
          </h1>

        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await handleRegister()
          }}
          className="space-y-5"
        >

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
              w-full
              bg-black/30
              border
              border-white/10
              rounded-xl
              px-4
              py-4
              text-white
              outline-none
              "
            />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
            w-full
            bg-black/30
            border
            border-white/10
            rounded-xl
            px-4
            py-4
            text-white
            outline-none
            "
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
            w-full
            bg-black/30
            border
            border-white/10
            rounded-xl
            px-4
            py-4
            text-white
            outline-none
            "
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="
            w-full
            bg-black/30
            border
            border-white/10
            rounded-xl
            px-4
            py-4
            text-white
            outline-none
            "
          />

          <button
            type="submit"
            className="
            w-full
            py-4
            rounded-xl
            bg-[#c8a84b]
            text-black
            font-semibold
            hover:scale-[1.02]
            transition
            "
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-gray-400 mt-8">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-[#c8a84b]"
          >
            Login
          </Link>

        </p>

        <Link to="/">
          <p className="text-center text-white opacity-70 underline mt-2">Go home</p>
        </Link>

      </div>
    </div>
  )
}