import { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthProps = {
    children?: ReactNode;
}


type IAuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void;
}

const initialValue = {
    authenticated: false,
    setAuthenticated: () => { }
}

const AuthorizationContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({ children }: AuthProps) => {

    const [authenticated, setAuthenticated] = useState(initialValue.authenticated);
    const navigate = useNavigate();

    return (
        <AuthorizationContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthorizationContext.Provider>
    )
}


export { AuthorizationContext, AuthProvider }