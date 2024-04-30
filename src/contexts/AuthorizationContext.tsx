import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

type AuthProps = {
    children?: ReactNode;
}

type IAuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void;
    setAuthenticationToken: (data: { [key: string]: string }) => void;
    logout: () => void;
    retrieveAuth: () => boolean;
}

const initialValue = {
    authenticated: false,
    setAuthenticated: () => { },
    setAuthenticationToken: () => { },
    logout: () => { },
    retrieveAuth: () => false
}


const AuthorizationContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({ children }: AuthProps) => {

    const [authenticated, setAuthenticated] = useState(initialValue.authenticated);

    const retrieveAuth = (): boolean => {
        const token = Cookies.get("token")
        const userId = Cookies.get("userId");
        // const token = localStorage.getItem("token");
        // const userId = localStorage.getItem("userId");

        if (token) {
            // setAuthenticated(true);
            return true;
        }
        return false;
    }

    const setAuthenticationToken = (data: { [key: string]: string }) => {
        const expiration = new Date(Date.now() + 3600 * 1000);
        // localStorage.setItem("token", data["Token"]);
        // localStorage.setItem("userId", data["UserId"]);

        Cookies.set('token', data["Token"], {
            expires: expiration,
            // path: "/",
            // secure: true,
            // HttpOnly: true,
            SameSite: "Lax"
        })

        Cookies.set('userId', data["UserId"], {
            expires: expiration,
            // path: "/",
            // secure: true,
            // HttpOnly: true,
            SameSite: "Lax"
        })
    }

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('userId');
        setAuthenticated(false);
    };
    return (
        <AuthorizationContext.Provider value={{ authenticated, setAuthenticated, setAuthenticationToken, logout, retrieveAuth }}>
            {children}
        </AuthorizationContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthorizationContext);
};

export { AuthorizationContext, AuthProvider }