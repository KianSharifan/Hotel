import { createContext, useContext, useState, useEffect } from "react"

type User = {
  username: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {}
})

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("user")

    if (saved) {
      setUser(JSON.parse(saved))
    }
  }, [])

  function login(userData: User) {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    )

    setUser(userData)
  }

  function logout() {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () =>
  useContext(AuthContext)