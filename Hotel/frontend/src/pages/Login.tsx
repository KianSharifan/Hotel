import { useState } from "react"
import {Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {
    const navigate = useNavigate()

    const { login } = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    login({
      username: "setayesh",
      email,
    })

    navigate("/")
  }

  return (
    <div
      className="
      min-h-screen
      bg-black
      flex
      items-center
      justify-center
      px-4
      "
    >
      <div
        className="
        w-full
        max-w-md
        bg-zinc-950
        border
        border-[#c8a84b]/20
        rounded-3xl
        p-8
        md:p-10
        "
      >
        <p
          className="
          text-[#c8a84b]
          uppercase
          tracking-[6px]
          text-center
          mb-4
          "
        >
          Noire Palace
        </p>

        <h1
          className="
          text-white
          text-4xl
          font-bold
          text-center
          mb-10
          "
        >
          Welcome Back
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e)=>
              setUsername(e.target.value)
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-black
            border
            border-zinc-800
            text-white
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>
              setPassword(e.target.value)
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-black
            border
            border-zinc-800
            text-white
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
            "
          >
            Login
          </button>
        </form>

        <div className="text-center mt-8">
           <span className="text-gray-400">
                Don't have an account?
            </span>

            <button
                onClick={() =>
                navigate("/register")
                }
                className="
                ml-2
                text-[#c8a84b]
                "
            >
                Create one
            </button>
    
            <Link to="/">
            <p className="underline text-center text-white opacity-70 mt-2">Go home</p>
            </Link>
        </div>
      </div>
    </div>
  )
}


export default Login