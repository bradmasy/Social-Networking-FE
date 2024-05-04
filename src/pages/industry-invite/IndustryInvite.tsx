import { useState } from "react";
import { Header } from "../../components"
import { Form } from "../../components/index";
import { ButtonProps } from "../../components/button/Button";
import { Input } from "../../components/form/Form";
import passwordIcon from "../../assets/images/icons/view-50.png";

import "./industry-invite.scss";

export const IndustryInvite: React.FC = () => {
    const [formData, sendFormData] = useState({});

    const industry = (
        <>
            <div className="password-message">
                <span>WELCOME INDUSTRY MEMBERS<br /></span>
                <span>PLEASE ENTER THE PASSCODE<br /></span>
                <span>TO PROCEED<br /><br /></span>
                <span className="highlight">- SEVENS SOCIAL -<br /></span>

            </div>
        </>
    )

    const formInputs: Input[] = [

        {
            name: "passcode",
            type: "password",
            label: "ENTER PASSCODE",
            icon: passwordIcon
        },

    ]

    const buttonProps: ButtonProps = {
        type: "submit",
        text: "ENTER"
    }
    return (
        <>
            <Header />
            <section className="ss-industry-invite">
            <div className="ss-industry-invite__password-message">
                        {industry}
                    </div>
                <Form
                    formInputs={formInputs}
                    sendFormData={sendFormData}
                    buttonProps={buttonProps}
                />
            </section>
        </>
    )
}