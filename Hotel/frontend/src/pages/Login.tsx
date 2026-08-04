import { useState } from "react"
import {Link, useNavigate, useLocation  } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { login as loginApi } from "../api/loginApi"
import { jwtDecode } from "jwt-decode";
import roleRoutes from "../utils/roleRoutes";

function Login() {
    const navigate = useNavigate()
    const location = useLocation();
    const { login } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const params = new URLSearchParams(location.search)
    const returnTo = params.get("return") ?? "/"

    async function handleLogin(e: React.FormEvent) {
      e.preventDefault();

      if (!username || !password) {
        alert("Please enter username and password.");
        return;
      }

      try {
        const data = await loginApi({
            username,
            password
        });

        login(data.token);

        const decoded = jwtDecode<Record<string, any>>(data.token);

        const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        alert("Login successful!");

        if (returnTo !== "/") {
            navigate(returnTo);
        }
        else {
            navigate(roleRoutes[role] ?? "/");
        }
      }
      catch (err: any) {
        alert(err.message);
      }
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
            type="text"
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
                navigate(`/register?return=${encodeURIComponent(returnTo)}`)
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