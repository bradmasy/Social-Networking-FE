import { useEffect, useState } from "react";
import { Button, Header } from "../../components";
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import "./payment.scss";
import { useApiService } from "../../contexts/ApiServiceContext";
import { LoadingOverlay } from "../../components/overlays/loading-overlay/LoadingOverlay";


export const Payment: React.FC = () => {
    const apiService = useApiService();
    const [locationId, setLocationId] = useState("");
    const [appId, setAppId] = useState("");
    const [amount, setAmount] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [cardNonce, setCardNonce] = useState("");

    useEffect(() => {
        apiService.get_square_credentials()
            .then((response) => {
                console.log(response)
                const data = response.data;
                setAppId(data['authData']['square']['sandboxAppId'])
                setLocationId(data['authData']['location']['id'])
                setLoaded(true)
            })
            .catch((error) => {
                console.log(error);
            })
        // api for square creds
        // const payments = Square.payments('sandbox-sq0idb-RT3u-HhCpNdbMiGg5aXuVg', 'TC4Z3ZEBKRXRH');
        // const appId = credentials['authData']['square']['sandboxAppId'];
        // const locationId = credentials['authData']['location']['id'];
    }, [])

    const heading = (
        <>
            <span>MAKE A PAYMENT BY FILLING OUT<br /></span>
            <span> THE INFORMATION BELOW AND CLICKING <br /></span>
            <span className="highlight">PAY</span>
        </>
    )

    const adedMembershipFeeToOrder = () => {
        const feeAmount = '$277';
        setAmount(feeAmount);
    }

    const getOrderData = () => {
        console.log('hello')
    }

    const handleCardNonceResponse = (nonce: string) => {
        console.log("Card nonce:", nonce);
        setCardNonce(nonce);
        // Here you can perform further actions with the card nonce, such as sending it to your server
    };
    return (
        <>
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
                                    <input name="amount" type="text" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                                </div>
                            </div>

                            <PaymentForm
                                applicationId={appId}

                                cardTokenizeResponseReceived={async (token: any, buyer: any) => {
                                    console.log('here')
                                    console.log(token)
                                    const body = {
                                        token:token["token"],
                                        amount:`${amount.slice(1,)}`
                                    }
                                    console.log(body)
                                    apiService.make_payment(body)
                                    .then((response) => {
                                        console.log(response.data)
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })
                                    // const response = await fetch("/api/pay", {
                                    //     method: "POST",
                                    //     headers: {
                                    //         "Content-type": "application/json",
                                    //     },
                                    //     body: JSON.stringify({
                                    //         sourceId: token.token,
                                    //     }),
                                    // });
                                    // console.log(await response.json());
                                }}


                                // createVerificationDetails={() => ({
                                //     amount: `${amount}`,
                                //     billingContact: {
                                //         addressLines: ['123 Main Street', 'Apartment 1'],
                                //         familyName: 'Doe',
                                //         givenName: 'John',
                                //         countryCode: 'CAN',
                                //         city: 'London',
                                //     },
                                //     currencyCode: 'CAD',
                                //     intent: 'CHARGE',
                                // })}
                                locationId={locationId}
                                // createPaymentRequest={() => ({
                                //     total: {
                                //         label: "Total",
                                //         amount: `${amount}`,
                                //     },
                                //     countryCode: "US",
                                //     currencyCode: "USD",
                                // })}


                            >
                                <CreditCard 
                                 buttonProps={{
                                    css: {
                                      backgroundColor: "#50B2CA",
                                      fontSize: "14px",
                                      color: "#fff",
                                      transition:"0.5s ease-in-out",
                                      "&:hover": {
                                        scale:'1.05'
                                        // backgroundColor: "#530f16",
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