import { ReactNode, createContext, useContext, useState } from "react";
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

        if (token) {
            return true;
        }
        return false;
    }

    const setAuthenticationToken = (data: { [key: string]: string }) => {
        const expiration = new Date(Date.now() + 3600 * 1000);


        Cookies.set('token', data["Token"], {
            expires: expiration,
            SameSite: "Lax"
        })

        Cookies.set('userId', data["UserId"], {
            expires: expiration,
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