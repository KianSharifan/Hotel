import { useState } from "react"
import { Link } from "react-router-dom"
import { createEmployee} from "../api/loginApi"
import { useAuth } from "../context/AuthContext"

export default function EmployeeRegister() {

  // const navigate = useNavigate()
  const { user, loading } = useAuth();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [departmentName, setDepartmentName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [position, setPosition] = useState("")
  const [salary,setSalary]=useState("")
  const [birthDate,setBirthDate]=useState("")

  if (loading) {
    return null; 
  }
  if(user?.role !== "HotelManager" && user?.role !== "DirectorOfHR"){
    return (
      <div className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
        You don't have permission to access this page.
      </div>
    );
  }

  async function handleRegister() {
  if (!username || !email || !role || !departmentName ||!password ||  !position || !salary || !birthDate) 
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
        roleName: role,
        departmentName:departmentName,
        salary:Number(salary),
        position,
        birthDate
    })

    alert("Employee account created successfully.")
    // navigate("/dashboard/employees")
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
        bg-white
        border
        border-black
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
            // text-[#c8a84b]
            text-black
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
            text-black
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
            type="text"
            placeholder="Role Name"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
            placeholder="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
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
            // bg-[#c8a84b]
            bg-black
            text-white
            font-semibold
            hover:scale-[1.02]
            transition
            "
          >
            Create Account
          </button>
        </form>

        <Link to="/">
          <p className="text-center text-white opacity-70 underline mt-2">Go home</p>
        </Link>

      </div>
    </div>
  )
}