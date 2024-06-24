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
            <div className="ss-payment-highlight">WELCOME.</div>
            <div>YOUR PAYMENT WAS SUCCESSFUL.</div>
            <div>YOU ARE NOW AN INDUSTRY MEMBER OF</div>
            <div>SEVENS SOCIAL.</div>
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