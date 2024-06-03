import { useEffect, useLayoutEffect, useState } from "react";
import { ApplyOverlay, Button, NavBar, UserDashboardBookingProps, UserDashboardBookings } from "../../components";
import { UserDashboardMenu } from "../../components/menus";
import { useApiService } from "../../contexts/ApiServiceContext";
import cardImg from "../../assets/images/card-black.png";
import { useNavigate } from "react-router-dom";
import { SSPaymentForm, SSPaymentFormProps } from "../../components/form/payment-form/SSPaymentForm";
import { LoadingOverlay } from "../../components/overlays/loading-overlay/LoadingOverlay";

import "./user-dashboard.scss";
import { Booking } from "../booking-date/BookingDate";
import { Location, Space } from "../location-details/LocationDetails";
import { ConfirmationDialog } from "../../components/dialogs/confirmation-dialog/ConfirmationDialog";
import { UserDashboardUser } from "../../components/user-dashboard/user-dashboard-user/UserDashboardUser";
import { UserDashboardTab } from "../../components/user-dashboard/user-dashboard-tab/UserDashboardTab";

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
export const BOOKINGS = "booking"


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
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [spaces, setSpaces] = useState<Space[]>([]);

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
            .catch((error) => {
                // silently fail right now
                return apiService.get_user_data()
            })
    }, [apiService])

    useEffect(() => {

        apiService.get_locations()
            .then((locations_api) => {
                const location_data = locations_api.data["Locations"].filter((each: { [key: string]: string }) =>
                    locations.includes(each["id"])
                )
                setLocationData(location_data);
                return apiService.get_all_spaces()
                    .then((spaceData) => {
                        setSpaces(spaceData.data["data"])
                        return apiService.get_my_bookings();

                    })
            }).then((userBookings) => {
                const bookings = userBookings.data['results'];
                setBookings(bookings);

            })
    }, [apiService, locations])

    useLayoutEffect(() => {
        const getCredentials = async () => {
            await apiService.get_square_credentials()
                .then((response: any) => {
                    const data = response.data;
                    setAppId(data['authData']['square']['productionAppId'])
                    // setAppId(data['authData']['square']['sandboxAppId']) // for sandbox
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
        title: title

    }

    const successMessage = (<>
        <div>PAYMENT SUCCESSFUL</div>
    </>)

    const bookingsProps: UserDashboardBookingProps = {
        bookings: bookings,
        spaceMaps: spaces.reduce((acc: { [key: string]: string }, obj: Space) => {
            acc[obj.id] = obj.name;
            return acc;
        }, {}),
        locationMaps: locationData.reduce((acc: { [key: string]: string }, obj) => {
            acc[obj.id] = obj.locationName;
            return acc;
        }, {}),
    }

    const dialogProps = {
        title: "DELETE BOOKING?",
        message: "ARE YOU SURE YOU WANT TO DELETE YOUR BOOKING?"
    }

    const userDashboardProps = {
        userData: userdata,
        membership: membership,
        locationData: locationData,
        plan: plan

    }

    const userDashboardTabProps = {
        membership: membership,
        receiptData: receiptData,
        paymentFormProps: paymentFormProps
    }

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
                                <UserDashboardUser {...userDashboardProps} />
                            </>

                        )}{(state === TAB && loaded && membership) && (
                            <>
                                <UserDashboardTab {...userDashboardTabProps} />
                            </>
                        )}
                        {state === REFERRAL && (
                            <>
                                COMING SOON </>
                        )}

                        {state === BOOKINGS && (
                            <>
                                <UserDashboardBookings {...bookingsProps} />
                            </>
                        )}
                        {state === BILLING && (
                            <>
                                COMING SOON
                                {/* <main className="ss-user-dashboard_billing">
                                    <div className="ss-user-dashboard__billing__container">

                                    </div>
                                </main> */}
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