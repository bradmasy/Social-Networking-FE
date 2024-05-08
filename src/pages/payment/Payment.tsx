import { useLayoutEffect, useState } from "react";
import { ApplyOverlay, CheckBox, CheckBoxProps, Header } from "../../components";
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { useApiService } from "../../contexts/ApiServiceContext";
import { LoadingOverlay } from "../../components/overlays/loading-overlay/LoadingOverlay";
import "./payment.scss";

export const Payment: React.FC = () => {

    const apiService = useApiService();

    const [amount, setAmount] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [display, setDisplay] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const [appId, setAppId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [errorMessage, setErrorMessage] = useState((<><span>PAYMENT UNSUCCESSFUL, PLEASE TRY AGAIN</span></>))
    const [isChecked, setIsChecked] = useState(false);


    const handleCheckBoxChange = (isChecked: boolean) => {
        setIsChecked(isChecked);
        // Do something with the isChecked value
    };

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

    // const adedMembershipFeeToOrder = () => {
    //     const feeAmount = '$277';
    //     setAmount(feeAmount);
    // }

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

    const checkboxProps: CheckBoxProps = {
        label: "PAY MEMBERSHIP ($277.00)",
        onChange: handleCheckBoxChange
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
                                    {/* <Button click={adedMembershipFeeToOrder} text="PAY MEMBERSHIP FEE" type="button" /> */}
                                    <CheckBox {...checkboxProps} />
                                </div>
                                <div className="ss-payments-container__user-information__input-container">
                                    <label>NAME ON CARD</label>
                                    <input name="name" type="text"></input>
                                </div>
                                {/* <div className="ss-payments-container__user-information__input-container">
                                    <label>AMOUNT</label>
                                    <input name="amount" type="text" value={amount} onChange={(e) => updateAmount(e.target.value)}></input>
                                </div> */}
                            </div>

                            <PaymentForm
                                applicationId={appId}
                                // applicationId={`${env.SQUARE_PROD_APP_ID}`}

                                cardTokenizeResponseReceived={async (token: any, buyer: any) => {
                                    if (isChecked) {
                                        setLoaded(true)
                                        setAmount("$277");

                                        const totalMoneyConverted = processAmount();

                                        const body = {
                                            token: token["token"],
                                            amount: totalMoneyConverted
                                        }

                                        // disable the button while the transaction is occuring...
                                        setEnableButton(true);

                                        apiService.make_payment(body)
                                            .then((response) => {
                                                setDisplay(true);
                                            })
                                            .catch((error) => {
                                                setErrorDisplay(error)
                                            })
                                            .finally(() => {
                                                setEnableButton(false);
                                            })
                                    } else {

                                        setErrorDisplay(true)

                                    }


                                }}


                                locationId={locationId}

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
                                        isLoading: enableButton
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
