import { useNavigate } from "react-router-dom";
import { Button, Header } from "../../components/index";

import "./payment-success.scss";

export const PaymentSuccess: React.FC = () => {

    const navigate = useNavigate()

    const redirectToLogin = (): void => {
        navigate("/login");
    }
    const message = (
        <>
            <div className="ss-payment-highlight">CONGRATULATIONS</div>
            <div>THE PAYMENT WAS SUCCESSFUL</div>
            <div>YOU ARE NOW AN INDUSTRY MEMBER OF</div>
            <div>SEVENS SOCIAL</div>
            <div className="ss-payment-padding">
                <div>PLEASE USE THE LOGIN BUTTON TO REDIRECT TO THE LOGIN PAGE</div>
                <div>AND LOGIN</div>
            </div>
            <div className="ss-payment-padding">
                <div>THANK YOU</div>
                <div className="ss-payment-highlight">- SEVENS SOCIAL -</div>
            </div>


        </>
    )

    return (
        <>
            <div className=" fade-in">
                <Header />
                <section className="ss-payment-success">
                    <main className="ss-payment-success__container">
                        <div className="ss-payment-success__copy-container">
                            {message}
                        </div>
                        <div className="ss-payment-success__redirect">
                            <Button type="button" text="LOGIN" click={redirectToLogin} />
                        </div>
                    </main>

                </section>
            </div>

        </>
    )
}