import { useEffect, useState } from "react";
import { Form, Header, Spinner } from "../../components";
import { Input } from "../../components/form/Form";
import { ButtonProps } from "../../components/button/Button";
import { ApplyOverlay } from "../../components/overlays/apply-overlay/ApplyOverlay";
import { ValidationService } from "../../services/validation/ValidationService";
import { useApiService } from "../../contexts/ApiServiceContext";
import iconImage from '../../assets/images/icons/view-100.png';
import "./signup.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthorizationContext";

export const Signup: React.FC = () => {
    const apiService = useApiService()
    const authService = useAuth();
    const navigate = useNavigate();

    const [formData, sendFormData] = useState({});
    const [displayOverlayError, setDisplayOverlayError] = useState(false);
    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(
        <>
            <div>PLEASE FILL OUT</div>
            <div>ALL FIELDS IN</div>
            <div>THE FORM BEFORE</div>
            <div>SUBMITTING</div>
        </>
    )
    const submit = () => {

        if (ValidationService.validateForm(formData)) {
            setLoading(true);
            apiService.signup(formData)
                .then((response: any) => {
                    authService.setAuthenticationToken(response.data)
                    navigate('/payment/membership')
                })
                .catch((err: { [key: string]: any }) => {
                    setErrorMessage(
                        <>
                            <p>{err.response.data.error}</p>
                            <p>{err.response.data.message}</p>

                        </>
                    );

                    setLoading(false);
                    setDisplayOverlayError(true);
                })
        } else {
            setErrorMessage(
                <>
                    <div>PLEASE FILL OUT</div>
                    <div>ALL FIELDS IN</div>
                    <div>THE FORM BEFORE</div>
                    <div>SUBMITTING</div>
                </>
            )
            setDisplayOverlayError(true);
        }

    }

    const inputs: Input[] = [
        {
            name: 'first_name',
            type: 'text',
            label: 'FIRST NAME'
        },
        {
            name: 'last_name',
            type: 'text',
            label: 'LAST NAME'
        },
        {
            name: 'phone_number',
            type: 'tel',
            label: 'PHONE NUMBER'
        }, {
            name: 'social',
            type: 'text',
            label: 'SOCIAL LINK'
        },
        {
            name: 'username',
            type: 'text',
            label: 'USERNAME'
        },
        {
            name: 'artist',
            type: 'text',
            label: 'ARTIST NAME'
        },
        {
            name: 'email',
            type: 'email',
            label: 'EMAIL ADDRESS'
        },
        {
            name: 'password',
            type: 'password',
            label: 'PASSWORD',
            icon: iconImage
        },
        {
            name: 'password_retype',
            type: 'password',
            label: 'RETYPE PASSWORD',
            icon: iconImage

        }
    ]

    const buttonProps: ButtonProps = {
        type: "submit",
        text: "SUBMIT FORM"
    }

    const message = (
        <>
            <span>PLEASE COMPLETE THE FORM PROVIDED AND SUBMIT<br /></span>
            <span>TO CREATE YOUR ACCOUNT<br /></span>
            <span>THANK YOU<br /></span>
            <br />
            <span className="highlight">- SEVENS SOCIAL MANAGEMENT -<br /></span>
        </>
    )

    return (
        <>
            <div className="fade-in">
                <Spinner display={loading} />
                <ApplyOverlay
                    errorMessage={errorMessage}
                    setDisplay={setDisplayOverlay}
                    errorDisplay={displayOverlayError}
                    display={displayOverlay}
                    setErrorDisplay={setDisplayOverlayError} />
                <Header />
                <Form text={message} setSubmitClicked={submit} buttonProps={buttonProps} formInputs={inputs} sendFormData={sendFormData} />
            </div>
        </>
    )
}