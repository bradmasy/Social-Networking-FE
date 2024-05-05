import { ReactNode, createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';
import { useApiService } from "./ApiServiceContext";

type AuthProps = {
    children?: ReactNode;
}

type IAuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void;
    setAuthenticationToken: (data: { [key: string]: string }) => void;
    setIndustryAuth: (data: string) => void;
    logout: () => void;
    retrieveAuth: () => boolean;
    retrieveIndustry: () => Promise<boolean>;
}

const initialValue = {
    authenticated: false,
    setAuthenticated: () => { },
    setAuthenticationToken: () => { },
    setIndustryAuth: () => { },
    logout: () => { },
    retrieveAuth: () => false,
    retrieveIndustry: () => Promise.resolve(false)
}


const AuthorizationContext = createContext<IAuthContext>(initialValue)
const expiration = new Date(Date.now() + 3600 * 1000);

const AuthProvider = ({ children }: AuthProps) => {

    const [authenticated, setAuthenticated] = useState(initialValue.authenticated);
    const apiService = useApiService();

    const retrieveAuth = (): boolean => {
        const token = Cookies.get("token")

        if (token) {
            // authenticate token

            return true;
        }

        return false;
    }

    const setAuthenticationToken = (data: { [key: string]: string }) => {


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

    const setIndustryAuth = (passcode: string) => {

        Cookies.set('IAuth', passcode, {
            expires: expiration,
            SameSite: "Lax"
        })
    }

    const retrieveIndustry = async () => {
        const token = Cookies.get("IAuth") ?? "";

        try {
            const body = { passcode: token };
            const response = await apiService.industryInvite(body);

            if (response.status === 200) {
                return true;
            } else {
                return false; 
            }
        } catch (error) {
            console.error("Error:", error);
            return false; 
        }
    };

    return (
        <AuthorizationContext.Provider value={{ authenticated, setAuthenticated, setAuthenticationToken, logout, retrieveAuth, retrieveIndustry, setIndustryAuth }}>
            {children}
        </AuthorizationContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthorizationContext);
};

export { AuthorizationContext, AuthProvider }