import { useLayoutEffect, useState } from "react";
import { ApplyOverlay , Header, NavBar } from "../../components";
import { useApiService } from "../../contexts/ApiServiceContext";
import { LoadingOverlay } from "../../components/overlays/loading-overlay/LoadingOverlay";
import { SSPaymentForm } from "../../components/form/payment-form/SSPaymentForm";

import "./payment.scss";

export const Payment: React.FC = () => {

    const apiService = useApiService();

    const [loaded, setLoaded] = useState(false);
    const [display, setDisplay] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [appId, setAppId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [errorMessage, setErrorMessage] = useState((<><span>PAYMENT UNSUCCESSFUL, PLEASE TRY AGAIN</span></>))
    const [type, setType] = useState<"TAB" | "MONTH">("MONTH");


    useLayoutEffect(() => {
        const getCredentials = async () => {
            await apiService.get_square_credentials()
                .then((response: any) => {
                    const data = response.data;
                   setAppId(data['authData']['square']['productionAppId'])

                //  setAppId(data['authData']['square']['sandboxAppId']) // for sandbox
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


    const successMessage = (
        <><div>PAYMENT SUCCESSFUL</div>
        </>
    )


   
    const title ="MAKE A PAYMENT ON YOUR ACCOUNT TODAY"

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
            <NavBar />
            {loaded ? (
                <>
                    <section className="ss-payments-container fade-in">
                        <div className="ss-payments-container__heading">
                            <p>
                                {heading}
                            </p>
                        </div>
                        <main className="ss-payments-container__payment-information">
                          

                            <SSPaymentForm 
                                appId={appId} 
                                locationId={locationId} 
                                loaded={loaded}
                                setLoaded={setLoaded}
                                errorMessage={errorMessage}
                                errorDisplay={errorDisplay}
                                setErrorDisplay={setErrorDisplay}
                                type={type}
                                setDisplay={setDisplay}
                                title={title}
                                />
                        

                        </main>
                    </section>
                </>
            ) : <LoadingOverlay />
            }
        </>
    )
}
