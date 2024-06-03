
import { useNavigate } from "react-router-dom";
import { Button } from "../../button/Button";
import cardImg from "../../../assets/images/card-black.png";
import { useState } from "react";

import "./user-dashboard-user.scss";

interface UserDashboardUserProps {
    userData: { [key: string]: string };
    membership: { [key: string]: string };
    locationData: { [key: string]: string }[];
    plan: { [key: string]: string };
}

export const UserDashboardUser: React.FC<UserDashboardUserProps> = (props) => {

    const navigate = useNavigate();

    const editDetails = () => {
        navigate("/edit?type=user-details")
    }

    function formatKey(key: string): string {
        const words = key.split(/(?=[A-Z])/);
        const formattedKey = words.join(' ').toLowerCase();
        return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1).toUpperCase();
    }

    const editPassword = () => {
        navigate("/edit?type=password")
    }


    return (
        <>
            <div className="ss-user-dashboard-content-rows">
                <div className="ss-user-dashboard-content-rows__row">
                    <div className="ss-user-dashboard-content-rows__row__tile">
                        <div className="ss-user-dashboard-content-rows__row__tile__content">
                            <div className="ss-user-dashboard-content__title">
                                <p>DETAILS
                                </p>
                                <Button text="EDIT" type="button" click={editDetails} />

                            </div>
                            <div className="ss-user-dashboard__info-snippets">
                                {
                                    Object.keys(props.userData).map((key: string) => (
                                        <div className="ss-user-dashboard__info-snippets__info-snippet__row" key={`row ${key}`}>
                                            <div className="ss-user-dashboard__info-snippets__info-snippet__key">
                                                <div>
                                                    {formatKey(key)}
                                                </div>
                                            </div>
                                            <div className="ss-user-dashboard__info-snippets__info-snippet" key={key}>
                                                {
                                                    key === 'createdAt' && typeof props.userData[key] === 'string'
                                                        ? new Date(props.userData[key]).toLocaleString() // Convert 'createdAt' string to a Date object and format it
                                                        : typeof props.userData[key] === 'object'
                                                            ? JSON.stringify(props.userData[key]) // Convert to JSON string if it's an object
                                                            : props.userData[key] // Render the value directly if it's not an object
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
                                                    props.membership['active'] ? 'ACTIVE' : "INACTIVE"
                                                }
                                            </div>
                                        </div>
                                        <div className="ss-user-dashboard__membership-container__info__tile" key="location-data">
                                            <div className="ss-user-dashboard-content__membership-title" key="location-data-title">
                                                <p key="location-data-text">LOCATIONS</p>
                                            </div>
                                            <div className="ss-user-dashboard-content__membership__info__tile__text-column">
                                                {
                                                    props.locationData.map((eachLocation: { [key: string]: string }, i) => (

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
                                                    props.plan["planType"] || "NONE"
                                                }
                                            </div>
                                        </div>
                                        <div className="ss-user-dashboard__membership-container__info__tile">
                                            <div className="ss-user-dashboard-content__membership-title">
                                                <p>NEXT PAYMENT</p>
                                            </div>
                                            <div className="ss-user-dashboard-content__membership__info__tile__text">
                                                {
                                                    props.membership['renewalDate']
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
        </>
    )
}