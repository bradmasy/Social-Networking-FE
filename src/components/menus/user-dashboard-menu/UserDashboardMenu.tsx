import { useState } from "react";
import "./user-dashboard-menu.scss";
import { ACCOUNT_INFO, BILLING, MEMBERSHIP, TAB, REFERRAL, PAYMENTS, BOOKINGS } from "../../../pages/user-dashboard/UserDashboard";

export interface MenuOption {
    text: string;
    value: string;
}


export interface UserDashboardMenuProps {
    setState: (state: string) => void;


}

export const UserDashboardMenu: React.FC<UserDashboardMenuProps> = (props) => {

    const [active, setActive] = useState(ACCOUNT_INFO)

    const menuOptions: MenuOption[] = [
        {
            text: "ACCOUNT INFORMATION",
            value: ACCOUNT_INFO,
        },

        {
            text: "TAB",
            value: TAB,
        },
        {
            text: "BILLING",
            value: BILLING,
        },
        {
            text: "REFERRAL",
            value: REFERRAL,
        },
        {
            text: "BOOKINGS",
            value: BOOKINGS,
        },

    ]



    return (
        <>
            <div className="ss-user-dashboard-menu">
                <div className="ss-user-dashboard-menu-options">
                    {
                        menuOptions.map((option, index) => (
                            <div onClick={() => {
                                props.setState(option.value);
                                setActive(option.value)

                            }}
                                className={`ss-menu-option ${active === option.value ? 'active' : ''}`}
                            >
                                {option.text}
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}