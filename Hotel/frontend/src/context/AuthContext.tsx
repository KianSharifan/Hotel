import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    nameid: string;
    unique_name: string;
    role: string;
    exp: number;
};

type User = {
    id: number;
    username: string;
    role: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [user, setUser] = useState<User | null>(null);

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {

        const savedToken =
            localStorage.getItem("token");

        if (!savedToken)
            return;

        try {

            const decoded =
                jwtDecode<JwtPayload>(savedToken);

            if (decoded.exp * 1000 < Date.now()) {

                localStorage.removeItem("token");
                return;

            }

            setToken(savedToken);

            setUser({

                id: Number(decoded.nameid),

                username: decoded.unique_name,

                role: decoded.role

            });

        }

        catch {

            localStorage.removeItem("token");

        }

    }, []);

    function login(newToken: string) {

        localStorage.setItem("token", newToken);

        const decoded =
            jwtDecode<JwtPayload>(newToken);

        setToken(newToken);

        setUser({

            id: Number(decoded.nameid),

            username: decoded.unique_name,

            role: decoded.role

        });

    }

    function logout() {

        localStorage.removeItem("token");

        setUser(null);

        setToken(null);

    }

    return (

        <AuthContext.Provider
            value={{

                user,

                token,

                isAuthenticated: !!user,

                login,

                logout

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    const context =
        useContext(AuthContext);

    if (!context)
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );

    return context;

}