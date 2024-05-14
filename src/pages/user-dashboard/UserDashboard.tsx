import { useEffect, useState } from "react";
import { Button, Header } from "../../components";
import { UserDashboardMenu } from "../../components/menus";
import { useApiService } from "../../contexts/ApiServiceContext";
import cardImg from "../../assets/images/card-black.png";

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
    // membership: Membership;
    createdAt: Date;
}

export const ACCOUNT_INFO = "accountInformation";
export const BILLING = "billing";
export const REFERRAL = "referral";
export const MEMBERSHIP = "membership";


export const UserDashboard: React.FC = () => {

    const apiService = useApiService();
    const [userdata, setUserData] = useState<{ [key: string]: string }>({}
    );
    const [membership, SetMembership] = useState<{ [key: string]: string }>({})
    const [locations, setLocations] = useState([{}]);
    const [locationData, setLocationData] = useState<{ [key: string]: string }[]>([]);
    const [plan, setPlan] = useState<{ [key: string]: string }>({});
    const [state, SetState] = useState(ACCOUNT_INFO)

    useEffect(() => {

        apiService.get_user_data()
            .then((response) => {
                console.log(response)
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
            })
    }, [apiService])

    useEffect(() => {

        apiService.get_locations()
            .then((locations_api) => {
                const location_data = locations_api.data["Locations"].filter((each: { [key: string]: string }) =>
                    locations.includes(each["id"])
                )
                setLocationData(location_data)
                console.log(location_data)
            })
    }, [apiService, locations])

    const editButtonStyles = {
        // border:"solid red 1px",
        // height:"",
        // padding: "2px 10px"
    }


    function formatKey(key: string): string {
        const words = key.split(/(?=[A-Z])/);
        const formattedKey = words.join(' ').toLowerCase();
        return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1).toUpperCase();
    }
    return (
        <>
            <Header />
            <div className="ss-user-dashboard">
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
                                                <Button text="EDIT" styles={editButtonStyles} type="button" />

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
                                                <Button text="EDIT PASSWORD" type="button" />
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
                        </>)}{state === BILLING && (
                            <>
                                COMING SOON
                            </>
                        )}  {/* Render referral section if state is REFERRAL */}
                    {state === REFERRAL && (
                        <>
                            COMING SOON                        </>
                    )}

                    {/* Render membership section if state is MEMBERSHIP */}
                    {state === MEMBERSHIP && (
                        <>
                            COMING SOON                        </>
                    )}
                </section>

            </div>
        </>
    )
}