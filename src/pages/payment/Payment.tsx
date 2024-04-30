import { useEffect, useState } from "react";
import { ApplyOverlay, Button, Header } from "../../components";
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { useApiService } from "../../contexts/ApiServiceContext";
import { LoadingOverlay } from "../../components/overlays/loading-overlay/LoadingOverlay";
import env from "react-dotenv";
import "./payment.scss";

const TIMEOUT_TO_LOAD = 2000;

export const Payment: React.FC = () => {

    const apiService = useApiService();

    const [amount, setAmount] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [display, setDisplay] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState(false);

    useEffect(() => {
        setTimeout(() => {

            setLoaded(true)

        }, TIMEOUT_TO_LOAD)

    }, [])

    const heading = (
        <>
            <span>MAKE A PAYMENT BY FILLING OUT<br /></span>
            <span> THE INFORMATION BELOW AND CLICKING <br /></span>
            <span className="highlight">PAY<br /><br /></span>
            <span className="tool-tip">IF THE CARD FORM DOES NOT LOAD, PLEASE TRY REFRESHING THE PAGE<br /></span>
            <span className="tool-tip">THANK YOU<br /></span>
            <span className="highlight tool-tip">- SEVENS SOCIAL -</span>
        </>
    )

    const adedMembershipFeeToOrder = () => {
        const feeAmount = '$277';
        setAmount(feeAmount);
    }

    const updateAmount = (moneyAmount: string) => {
        const formattedAmount = moneyAmount.charAt(0) === '$' ? moneyAmount : '$' + moneyAmount;

        setAmount(formattedAmount);
    }

    /**
     * Converts the user input into the values that square expects for the API call.
     * Square is expecting a value in the lowest denominator of a currency, by default we accept CAD so currently this function 
     * converts the users input into cents and returns the amount passed into cents
     * 
     * ie: 100 is $1 and 277.00 is 27700, also 227 is 27700
     * 
     * @returns the value converted for the API call.
     */
    const processAmount = (): string => {
        const conversionFactor = 100; // square payments values accept cents, amount:100 === $1
        const parsedAmount = amount.charAt(0) === '$' ? amount.slice(1,) : amount;
        const totalAmountInCents = parsedAmount.includes('.') ? parseInt(parsedAmount.slice(0, parsedAmount.indexOf('.'))) * conversionFactor + parseInt(parsedAmount.slice(parsedAmount.indexOf('.') + 1,)) : parseInt(parsedAmount) * conversionFactor;
        return totalAmountInCents.toString();


    }

    const successMessage = (
        <><span>PAYMENT SUCCESSFUL</span>
        </>
    )

    const errorMessage = (
        <><span>
            PAYMENT UNSUCCESSFUL, PLEASE TRY AGAIN
        </span>
        </>
    )

    return (
        <>
            <ApplyOverlay display={display} setDisplay={setDisplay} errorDisplay={errorDisplay} successMessage={successMessage} errorMessage={errorMessage} navigateOnClose="payment" />
            <Header />
            {loaded ? (
                <>
                    <section className="ss-payments-container fade-in">
                        <div className="ss-payments-container__heading">
                            <p>
                                {heading}
                            </p>
                        </div>
                        <main className="ss-payments-container__payment-information">
                            <div className="ss-payments-container__user-information">
                                <div className="ss-payments-container__user-information__pay-membership">
                                    <Button click={adedMembershipFeeToOrder} text="PAY MEMBERSHIP FEE" type="button" />
                                </div>
                                <div className="ss-payments-container__user-information__input-container">
                                    <label>FULL NAME</label>
                                    <input name="name" type="text"></input>
                                </div>
                                <div className="ss-payments-container__user-information__input-container">
                                    <label>AMOUNT</label>
                                    <input name="amount" type="text" value={amount} onChange={(e) => updateAmount(e.target.value)}></input>
                                </div>
                            </div>

                            <PaymentForm
                                // applicationId={`${env.SQUARE_PROD_APP_ID}`}
                                applicationId={`${env.SQUARE_SANDBOX_PROD_APP_ID}`}

                                cardTokenizeResponseReceived={async (token: any, buyer: any) => {
                                    const totalMoneyConverted = processAmount();
                                    const body = {
                                        token: token["token"],
                                        amount: totalMoneyConverted
                                    }
                                  
                                    apiService.make_payment(body)
                                        .then((response) => {
                                            setDisplay(true);
                                            console.log(response.data)
                                        })
                                        .catch((error) => {
                                            setErrorDisplay(error)

                                        })
                                }}
                                locationId={`${env.SQUARE_LOCATION_ID_DUNDAS}`}
                            >
                                <CreditCard
                                    buttonProps={{
                                        css: {
                                            backgroundColor: "#50B2CA",
                                            fontSize: "14px",
                                            color: "#fff",
                                            transition: "0.5s ease-in-out",
                                            "&:hover": {
                                                scale: '1.05'

                                            },
                                        },
                                    }}
                                />
                            </PaymentForm>
                        </main>
                    </section>
                </>
            ) : <LoadingOverlay />
            }
        </>
    )
}