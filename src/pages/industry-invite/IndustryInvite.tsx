import { useEffect, useState } from "react";
import { ApplyOverlay, Header, Spinner } from "../../components"
import { Form } from "../../components/index";
import { ButtonProps } from "../../components/button/Button";
import { Input } from "../../components/form/Form";
import passwordIcon from "../../assets/images/icons/view-50.png";
import { ValidationService } from "../../services";
import { useApiService } from "../../contexts/ApiServiceContext";
import { useAuth } from "../../contexts/AuthorizationContext";
import { useNavigate } from "react-router-dom";


import "./industry-invite.scss";


export const IndustryInvite: React.FC = () => {
    const apiService = useApiService();
    const auth = useAuth();
    const navigate = useNavigate();

    const [formData, sendFormData] = useState({});
    const [display, setDisplay] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (ValidationService.validateForm(formData)) {
            setLoading(true)
            apiService.industryInvite(formData)
                .then((response: any) => {
                    if (response.status === 200) {
                        const passcode = response.data.data.password;
                        auth.setIndustryAuth(passcode);

                        navigate("/signup")
                    }
                })
                .catch((error: Error) => {
                    setLoading(false)

                    sendFormData({}); // reset the form data so they can re-submit0
                    setErrorDisplay(true);
                })
        }

    }, [apiService, auth, errorDisplay, formData, navigate])

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

    const errorMessage = (
        <>
            <div>ERROR</div>
            <div>INVALID PASSCODE</div>
            <div>ENSURE THE CODE IS CORRECT</div>
            <div>AND TRY AGAIN</div>

        </>
    )

    return (
        <>
            <Spinner display={loading} />
            <ApplyOverlay 
                display={display} 
                errorDisplay={errorDisplay} 
                errorMessage={errorMessage} 
                setDisplay={setDisplay}
                setErrorDisplay={setErrorDisplay} 
                />
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