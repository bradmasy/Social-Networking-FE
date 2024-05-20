import { useEffect, useLayoutEffect, useState } from "react";
import { ApplyOverlay, Button, NavBar } from "../../components";
import { UserDashboardMenu } from "../../components/menus";
import { useApiService } from "../../contexts/ApiServiceContext";
import cardImg from "../../assets/images/card-black.png";
import { useNavigate } from "react-router-dom";
import { SSPaymentForm, SSPaymentFormProps } from "../../components/form/payment-form/SSPaymentForm";
import { LoadingOverlay } from "../../components/overlays/loading-overlay/LoadingOverlay";

import "./user-dashboard.scss";

export interface Plan {
    id: string;
    planType: string;
}
export interface Membership {
    id: string;
    locations: string[];
    active: boolean;
    expiration: string;
    balance: number;
    totalPaid: number;
    createdAt: string;
    plan: Plan
}
export interface UserData {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    socialLink: string;
    createdAt: Date;
}

export interface Receipt {
    id: number;
    user: number;
    createdAt: string;
    amount: number;
}

export const ACCOUNT_INFO = "accountInformation";
export const BILLING = "billing";
export const TAB = "tab";
export const REFERRAL = "referral";
export const MEMBERSHIP = "membership";
export const PAYMENTS = "payment"


export const UserDashboard: React.FC = () => {

    const apiService = useApiService();
    const navigate = useNavigate();

    const [userdata, setUserData] = useState<{ [key: string]: string }>({});
    const [membership, SetMembership] = useState<{ [key: string]: string }>({})
    const [locations, setLocations] = useState([{}]);
    const [locationData, setLocationData] = useState<{ [key: string]: string }[]>([]);
    const [plan, setPlan] = useState<{ [key: string]: string }>({});
    const [state, SetState] = useState(ACCOUNT_INFO)
    const [appId, setAppId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState((<><span>PAYMENT UNSUCCESSFUL, PLEASE TRY AGAIN</span></>))
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [receiptData, setReceiptData] = useState<Receipt[]>([])
    const [cardLoaded, setCardLoaded] = useState(false);
    const [display, setDisplay] = useState(false)
    const [overlayError, setOverlayError] = useState(false);

    useEffect(() => {

        apiService.get_user_receipts()
            .then((receipts) => {
                setReceiptData(receipts.data["Receipts"])
                return apiService.get_user_plan()
            })
            .then((plan) => {
                return apiService.get_user_data()
            })
            .then((response) => {
                const user_information = response.data.user
                const membership = user_information["membership"]

                // Set the user data, a series of complex objects to access more simply.

                SetMembership(membership);
                setLocations(membership['locations'])
                setPlan(membership["plan"])

                // map everything except membership because of complexities.

                const mappedInfo = Object.keys(user_information).reduce((acc: { [key: string]: string }, data: any) => {
                    if (data !== "membership") {

                        acc[data] = user_information[data];
                    }
                    return acc;
                }, {});

                setUserData(mappedInfo)
                setLoaded(true)

            })
    }, [apiService])

    useEffect(() => {

        apiService.get_locations()
            .then((locations_api) => {
                const location_data = locations_api.data["Locations"].filter((each: { [key: string]: string }) =>
                    locations.includes(each["id"])
                )
                setLocationData(location_data)
            })
    }, [apiService, locations])

    useLayoutEffect(() => {
        const getCredentials = async () => {
            await apiService.get_square_credentials()
                .then((response: any) => {
                    const data = response.data;
                    // setAppId(data['authData']['square']['productionAppId'])
                    setAppId(data['authData']['square']['sandboxAppId']) // for sandbox
                    setLocationId(data['authData']['location']['id'])
                    setCardLoaded(true)
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

    const editButtonStyles = {
        // border:"solid red 1px",
        // height:"",
        // padding: "2px 10px"
    }

    const editPassword = () => {
        navigate("/edit?type=password")
    }

    const editDetails = () => {
        navigate("/edit?type=user-details")

    }

    function formatKey(key: string): string {
        const words = key.split(/(?=[A-Z])/);
        const formattedKey = words.join(' ').toLowerCase();
        return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1).toUpperCase();
    }

    const formatDate = (date: string) => {
        const dateString = date.split("T")[0]
        return dateString
    }
    const title = "MAKE A PAYMENT ON YOUR TAB TODAY"

    const paymentFormProps: SSPaymentFormProps = {
        appId: appId,
        locationId: locationId,
        loaded: loaded,
        setLoaded: setLoaded,
        errorMessage: errorMessage,
        errorDisplay: errorDisplay,
        setErrorDisplay: setOverlayError,
        setDisplay: setDisplay,
        type: "TAB",
        title:title

    }

    const successMessage = (<>
        <div>PAYMENT SUCCESSFUL</div>
    </>)

    return (
        <>
            <ApplyOverlay
                successMessage={successMessage}
                display={display}
                setDisplay={setDisplay}
                errorDisplay={overlayError}
                setErrorDisplay={setOverlayError}
                errorMessage={<>ERROR</>} />
            <NavBar />
            {!loaded && !cardLoaded ? (<LoadingOverlay />
            ) : (<>
                <div className="ss-user-dashboard  fade-in">
                    <UserDashboardMenu setState={SetState} />
                    <section className="ss-user-dashboard-content">

                        {state === ACCOUNT_INFO && (
                            <>
                                <div className="ss-user-dashboard-content-rows">
                                    <div className="ss-user-dashboard-content-rows__row">
                                        <div className="ss-user-dashboard-content-rows__row__tile">
                                            <div className="ss-user-dashboard-content-rows__row__tile__content">
                                                <div className="ss-user-dashboard-content__title">
                                                    <p>DETAILS
                                                    </p>
                                                    <Button text="EDIT" styles={editButtonStyles} type="button" click={editDetails} />

                                                </div>
                                                <div className="ss-user-dashboard__info-snippets">
                                                    {
                                                        Object.keys(userdata).map((key: string) => (
                                                            <div className="ss-user-dashboard__info-snippets__info-snippet__row" key={`row ${key}`}>
                                                                <div className="ss-user-dashboard__info-snippets__info-snippet__key">
                                                                    <div>
                                                                        {formatKey(key)}
                                                                    </div>
                                                                </div>
                                                                <div className="ss-user-dashboard__info-snippets__info-snippet" key={key}>
                                                                    {
                                                                        key === 'createdAt' && typeof userdata[key] === 'string'
                                                                            ? new Date(userdata[key]).toLocaleString() // Convert 'createdAt' string to a Date object and format it
                                                                            : typeof userdata[key] === 'object'
                                                                                ? JSON.stringify(userdata[key]) // Convert to JSON string if it's an object
                                                                                : userdata[key] // Render the value directly if it's not an object
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                        <div className="ss-user-dashboard-content-rows__row__tile">
                                            <div className="ss-user-dashboard-content-rows__row__tile__content">
                                                <div className="ss-user-dashboard-content__title">
                                                    <p>PASSWORD MANAGEMENT
                                                    </p>

                                                </div>
                                                <div className="ss-user-dashboard__edit-password">
                                                    <Button text="EDIT PASSWORD" type="button" click={editPassword} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ss-user-dashboard-content-rows__column">
                                        <div className="ss-user-dashboard-content-rows__column__tile">
                                            <div className="ss-user-dashboard-content-rows__column__tile__content">
                                                <div className="ss-user-dashboard-content__title">
                                                    <p>MEMBERSHIP
                                                    </p>
                                                </div>
                                                <div className="ss-user-dashboard__membership-container">
                                                    <div className="ss-user-dashboard__membership-container__card-img">
                                                        <img src={cardImg} alt="card"></img>
                                                    </div>
                                                    <div className="ss-user-dashboard__membership-container__info">
                                                        <div className="ss-user-dashboard__membership-container__info__row">
                                                            <div className="ss-user-dashboard__membership-container__info__tile">
                                                                <div className="ss-user-dashboard-content__membership-title">
                                                                    <p>STATUS
                                                                    </p>
                                                                </div>
                                                                <div className="ss-user-dashboard-content__membership__info__tile__text">
                                                                    {
                                                                        membership['active'] ? 'ACTIVE' : "INACTIVE"
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="ss-user-dashboard__membership-container__info__tile" key="location-data">
                                                                <div className="ss-user-dashboard-content__membership-title" key="location-data-title">
                                                                    <p key="location-data-text">LOCATIONS</p>
                                                                </div>
                                                                <div className="ss-user-dashboard-content__membership__info__tile__text-column">
                                                                    {
                                                                        locationData.map((eachLocation: { [key: string]: string }, i) => (

                                                                            <div key={`location-${i}`}>
                                                                                {eachLocation["locationName"]}
                                                                            </div>

                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="ss-user-dashboard__membership-container__info__row">
                                                            <div className="ss-user-dashboard__membership-container__info__tile">
                                                                <div className="ss-user-dashboard-content__membership-title">
                                                                    <p>CURRENT PLAN
                                                                    </p>
                                                                </div>
                                                                <div className="ss-user-dashboard-content__membership__info__tile__text">
                                                                    {
                                                                        plan["planType"]
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="ss-user-dashboard__membership-container__info__tile">
                                                                <div className="ss-user-dashboard-content__membership-title">
                                                                    <p>NEXT PAYMENT</p>
                                                                </div>
                                                                <div className="ss-user-dashboard-content__membership__info__tile__text">
                                                                    {
                                                                        membership['renewalDate']
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>)}{(state === TAB && loaded && membership) && (
                                <>
                                    <main className="ss-user-dashboard__tab">
                                        <div className="ss-user-dashboard__tab__container">
                                            <div className="ss-user-dashboard__tab__container__column">
                                                <div className="ss-user-dashboard__tab__container__column__tile">
                                                    <div className="ss-user-dashboard__tab__container__column__tile__container">
                                                        <div className="ss-user-dashboard__tab__container__column__tile__title">
                                                            <p>CURRENT TAB
                                                            </p>
                                                        </div>
                                                        <div className="ss-user-dashboard__tab__container__column__tile__content">
                                                            {
                                                                "$" + membership['balance']
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ss-user-dashboard__tab__container__column__tile">
                                                    <div className="ss-user-dashboard__tab__container__column__tile__container">
                                                        <div className="ss-user-dashboard__tab__container__column__tile__title">
                                                            <p>LAST PAYMENT
                                                            </p>
                                                        </div>
                                                        <div className="ss-user-dashboard__tab__container__column__tile__content-receipts">
                                                            {
                                                                <div className="ss-user-dashboard__receipt-tab">
                                                                    {
                                                                        receiptData.length > 0 ? (
                                                                            <>
                                                                                <div className="ss-user-dashboard__receipt-tab__date">
                                                                                    <div>
                                                                                        <label>
                                                                                            DATE
                                                                                        </label>

                                                                                    </div>
                                                                                    {

                                                                                        formatDate(receiptData[0].createdAt)
                                                                                    }
                                                                                </div>
                                                                                <div className="ss-user-dashboard__receipt-tab__amount">
                                                                                    <div>
                                                                                        <label>AMOUNT</label>
                                                                                    </div>
                                                                                    <div>
                                                                                        {"$" + receiptData[0].amount}
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        ) : (
                                                                            <>You have no payments yet</>
                                                                        )
                                                                    }

                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ss-user-dashboard__tab__container__column-payment-form">
                                                <div className="ss-user-dashboard__tab__container__column-title">
                                                    PAY TAB
                                                </div>
                                                <SSPaymentForm {...paymentFormProps} />
                                            </div>
                                        </div>
                                    </main>
                                </>
                            )}  {/* Render referral section if state is REFERRAL */}
                        {state === REFERRAL && (
                            <>
                                COMING SOON                        </>
                        )}

                        {/* Render membership section if state is MEMBERSHIP */}
                        {state === BILLING && (
                            <>
                                <main className="ss-user-dashboard_billing">
                                    <div className="ss-user-dashboard__billing__container">

                                    </div>
                                </main>
                            </>
                        )}
                        {state === PAYMENTS && (
                            <>
                                COMING SOON                        </>
                        )}
                    </section>



                </div>   </>)}
        </>
    )
}