import { useContext, useEffect, useState } from "react";
import { ButtonProps } from "../../components/button/Button";
import { Input } from "../../components/form/Form";
import { Header, Spinner } from "../../components/index";
import { Form, ApplyOverlay } from "../../components/index";
import eyeIcon from "../../assets/images/icons/view-100.png";
import { ValidationService } from "../../services";
import { useApiService } from "../../contexts/ApiServiceContext";
import { AuthorizationContext } from "../../contexts/AuthorizationContext";
import { useNavigate } from "react-router-dom";
import "./login.scss";

export const Login: React.FC = () => {
    const apiService = useApiService();
    const { setAuthenticated, setAuthenticationToken } = useContext(AuthorizationContext);

    const [formData, sendFormData] = useState({});
    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [displayOverlayError, setDisplayOverlayError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(
        <>
            <div>ERROR LOGGING IN</div>
            <div>PLEASE TRY AGAIN</div>
        </>
    )

    const navigate = useNavigate();

    const buttonProps: ButtonProps = {
        type: "submit",
        text: "LOGIN"
    }

    const formInputs: Input[] = [
        {
            name: "username",
            type: "text",
            label: "USERNAME"
        }, {
            name: "password",
            type: "password",
            label: "PASSWORD",
            icon: eyeIcon
        },
    ]


    const submit = () => {

        if (ValidationService.validateForm(formData)) {
            setLoading(true)
            apiService.login(formData)
                .then((response) => {
                    setAuthenticationToken(response["data"])
                    setAuthenticated(true)
                    navigate("/user-dashboard")
                })
                .catch((error: Error) => {
                    setLoading(false)

                    //       sendFormData({});
                    setErrorMessage(<>

                        <div>WRONG PASSWORD</div>
                        <div>TRY AGAIN</div>

                    </>)
                    setDisplayOverlayError(true);
                    console.error(error)
                })
        } else {
            setErrorMessage(<>
                <div>PLEASE FILL IN ALL </div>
                <div> FIELDS OF THE FORM</div>

            </>)
            //  sendFormData({});
            setDisplayOverlayError(true);
        }
    }
    const message = (
        <>
            <span>WELCOME BACK TO<br /></span>
            <span className="highlight">SEVENS SOCIAL<br /></span>
            <span>PLEASE USE THE FORM BELOW<br /></span>
            <span>TO LOGIN<br /></span>
        </>
    )

    const successMessage = (
        <>
            <span>THANK YOU FOR YOUR APPLICATION<br /></span>
            <span>SEVENS SOCIAL WILL <br /></span>
            <span>CAREFULLY REVIEW IT <br /></span>
            <span> AND REACH OUT TO YOU SOON<br /></span>
            <span><br /></span>
        </>
    )

    return (
        <>
            <Spinner display={loading} />
            <ApplyOverlay
                navigateOnClose={"/login"}
                errorMessage={errorMessage}
                successMessage={successMessage}
                setDisplay={setDisplayOverlay}
                errorDisplay={displayOverlayError}
                display={displayOverlay}
                setErrorDisplay={setDisplayOverlayError} />
            <Header />
            <div className="ss-login-container">
                <Form text={message} setSubmitClicked={submit} formInputs={formInputs} buttonProps={buttonProps} sendFormData={sendFormData} />
            </div>
        </>
    )
}