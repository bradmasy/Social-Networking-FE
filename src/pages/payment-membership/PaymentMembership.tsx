import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import { ApplyOverlay, Button, CheckBox, CheckBoxProps, Header } from "../../components";
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { useApiService } from "../../contexts/ApiServiceContext";
import { LoadingOverlay } from "../../components/overlays/loading-overlay/LoadingOverlay";

import "./payment-membership.scss";
import { useNavigate } from "react-router-dom";

export const PaymentMembership: React.FC = () => {

    const apiService = useApiService();
    const navigate = useNavigate();

    const [amount, setAmount] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [display, setDisplay] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [enableButton, setEnableButton] = useState(true);
    const [appId, setAppId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [errorMessage, setErrorMessage] = useState((<><span>PAYMENT UNSUCCESSFUL, PLEASE TRY AGAIN</span></>))
    const [isTabChecked, setIsTabChecked] = useState(false);
    const [isMonthlyChecked, setIsMonthlyChecked] = useState(false);
    const [disableTab, setDisableTab] = useState(false);
    const [disableMonthly, setDisableMonthly] = useState(false);
    const [plan, setPlan] = useState("");
    const [cardName, setCardName] = useState('');
    const [disableCard, setDisableCard] = useState(false);

    const handleMembershipCheckBoxChange = (isChecked: boolean) => {
        if (isChecked) {
            setIsMonthlyChecked(isChecked);
            setDisableTab(true)
            setPlan("month")
            setEnableButton(false)
            setAmount("277")
        } else {
            setIsMonthlyChecked(isChecked);
            setDisableTab(false)
            setPlan("")
            setEnableButton(true)
            setAmount("")
        }
    };

    const handleTabCheckBoxChange = (isChecked: boolean) => {
        if (isChecked) {
            setIsTabChecked(isChecked);
            setDisableMonthly(true)
            setPlan("tab")
            setEnableButton(false)
            setAmount("0")
            setDisableCard(true)
        } else {
            setIsTabChecked(isChecked);
            setDisableMonthly(false);
            setPlan("");
            setEnableButton(true)
            setAmount("")
            setDisableCard(false)

        }
    };

    const makePayment = (body: { [key: string]: string }) => {
        apiService.make_payment_membership(body)
            .then((response) => {
                setDisplay(true);
                setTimeout(() => {
                    navigate("/payment-success") // redirect to success
                }, 2000)
            })
            .catch((error) => {
                setErrorDisplay(error)
            })
            .finally(() => {
                setEnableButton(false);
            })
    }

    useLayoutEffect(() => {
        const getCredentials = async () => {
            await apiService.get_square_credentials()
                .then((response: any) => {
                    const data = response.data;
                    setAppId(data['authData']['square']['productionAppId'])

                    // setAppId(data['authData']['square']['sandboxAppId']) // for sandbox
                    setLocationId(data['authData']['location']['id'])
                    setLoaded(true)
                })
                .catch((error: Error) => {
                    const errorMessage = error.message || "An error occurred";
                    setErrorMessage(<><span>{errorMessage}</span></>);
                    setErrorDisplay(true)
                    console.error(error)
                })
        }

        getCredentials();

    })


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
        <><div>PAYMENT SUCCESSFUL</div>
          
        </>
    )
    const buttonStyles = {
        borderRadius: "5px",
        fontWeight: "200",
        backgroundColor: "rgb(80, 178, 202)",
        color: "white",
        width: "100%"
    }

    const submitTab = () => {
        const totalMoneyConverted = processAmount();

        const body = {
            amount: totalMoneyConverted,
            plan: plan,
        }
       
        makePayment(body)
    }
    const checkboxPropsMonthly: CheckBoxProps = {
        label: "PAY MEMBERSHIP ($277.00)",
        onChange: handleMembershipCheckBoxChange,
        subText: "RENEWED MONTHLY",
        disabled: disableMonthly
    }

    const checkboxPropsTab: CheckBoxProps = {
        label: "PAY LATER WITH TAB",
        onChange: handleTabCheckBoxChange,
        subText: "NO FEE NOW",
        disabled: disableTab
    }

    const handleCardName = (event: ChangeEvent<HTMLInputElement>) => {
        setCardName(event.target.value);
    }

    return (
        <>
            <ApplyOverlay
                display={display}
                setDisplay={setDisplay}
                errorDisplay={errorDisplay}
                successMessage={successMessage}
                errorMessage={errorMessage}
                navigateOnClose="payment"
                setErrorDisplay={setErrorDisplay}
            />
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
                                    <CheckBox {...checkboxPropsMonthly} />
                                </div>
                                <div className="ss-payments-container__user-information__pay-membership">
                                    <CheckBox {...checkboxPropsTab} />
                                </div>
                                {!disableCard && (
                                    <div className="ss-payments-container__user-information__input-container">
                                        <label>NAME ON CARD</label>
                                        <input name="name" type="text" value={cardName} onChange={handleCardName}></input>
                                    </div>
                                )}
                            </div>

                            <PaymentForm
                                applicationId={appId}
                                // applicationId={`${env.SQUARE_PROD_APP_ID}`}

                                cardTokenizeResponseReceived={async (token: any, buyer: any) => {
                                    if (isMonthlyChecked) {
                                        setLoaded(true)
                                        setAmount("$277");

                                        const totalMoneyConverted = processAmount();

                                        const body = {
                                            token: token["token"],
                                            amount: totalMoneyConverted,
                                            plan: plan,
                                            name: cardName

                                        }

                                        // disable the button while the transaction is occuring...
                                        setEnableButton(false);
                                        makePayment(body)
                                        // apiService.make_payment(body)
                                        //     .then((response) => {
                                        //         console.log(response)
                                        //         setDisplay(true);
                                        //         setTimeout(() => {
                                        //             navigate("/login") // redirect to login to login and use their account
                                        //         }, 2000)
                                        //     })
                                        //     .catch((error) => {
                                        //         console.log(error)
                                        //         setErrorDisplay(error)
                                        //     })
                                        //     .finally(() => {
                                        //         setEnableButton(false);
                                        //     })
                                    } else {

                                        setErrorDisplay(true)

                                    }


                                }}


                                locationId={locationId}

                            >
                                {!disableCard ? (
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
                                            isLoading: enableButton
                                        }}
                                    />) : (<Button click={submitTab} styles={buttonStyles} text="Submit" type="button" />)}

                            </PaymentForm>

                        </main>
                    </section>
                </>
            ) : <LoadingOverlay />
            }
        </>
    )
}
