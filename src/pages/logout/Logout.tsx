import { useNavigate } from "react-router-dom"
import { Button, NavBar } from "../../components"
import { useAuth } from "../../contexts/AuthorizationContext";
import "./logout.scss";
import { MobileMenu } from "../../components/menus/mobile-menu/MobileMenu";

export const Logout: React.FC = () => {

    const navigate = useNavigate();
    const auth = useAuth();

    const logoutCopy = (
        <>
            <div>
                CLICK THE LOGOUT BUTTON
            </div>
            <div>
                TO LOGOUT FROM YOUR ACCOUNT
            </div>

        </>
    )

    const logout = () => {
        auth.logout();
        navigate("/")
    }

    
    return (
        <>
            <NavBar />
            <section className="ss-logout-section">
                <div className="ss-logout-section__copy">
                    {logoutCopy}
                </div>
                <Button text="LOGOUT" type="button" click={logout} />

            </section>
        </>
    )
}