import { useState } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"
import { createEmployee} from "../api/loginApi"
import { useAuth } from "../context/AuthContext"

export default function EmployeeRegister() {

  const navigate = useNavigate()
  const { user, loading } = useAuth();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [roleId, setRoleId] = useState("")
  const [departmentId, setDepartmentId] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [position, setPosition] = useState("")
  const [salary,setSalary]=useState("")
  const [birthDate,setBirthDate]=useState("")

  if (loading) {
    return null; 
  }
  if(
    user?.role !== "HotelManager" && user?.role !== "DirectorOfHR"
  ){
    return <Navigate to="/" replace />;
  }

  async function handleRegister() {
  if (!username || !email || !roleId || !departmentId ||!password ||  !position || !salary || !birthDate) 
  {
    alert("Please fill all fields")
    return
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match")
    return
  }

  try {
    await createEmployee({
        userName: username,
        email,
        password,
        roleId: Number(roleId),
        departmentId: Number(departmentId),
        salary:Number(salary),
        position,
        birthDate
    })

    alert("Employee account created successfully.")
    navigate("/dashboard/employees")
    //!!!!!
  }
  catch (err) {
    if (err instanceof Error)
      alert(err.message)
    else
      alert("Failed to create account.")
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
            type="number"
            placeholder="Role ID"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
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
            type="number"
            placeholder="Department ID"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
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
            type="date"
            value={birthDate}
            onChange={(e)=>setBirthDate(e.target.value)}
            placeholder="BirthDate"
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
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e)=>setPosition(e.target.value)}
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
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e)=>setSalary(e.target.value)}
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