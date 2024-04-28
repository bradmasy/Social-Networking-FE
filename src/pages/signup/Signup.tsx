import { FormEvent, useEffect, useState } from "react";
import { Form, Header } from "../../components";
import { Input } from "../../components/form/Form";
import "./signup.scss";
import { ButtonProps } from "../../components/button/Button";
import { ApplyOverlay } from "../../components/overlays/apply-overlay/ApplyOverlay";
import { ValidationService } from "../../services/validation/ValidationService";
import { ApiService } from "../../services/api/ApiService";
import { useApiService } from "../../contexts/ApiServiceContext";
import iconImage from '../../assets/images/icons/view-100.png';

export const Signup: React.FC = () => {
    const apiService = useApiService()

    const [formData, sendFormData] = useState({});
    const [displayOverlayError, setDisplayOverlayError] = useState(false);
    const [displayOverlay, setDisplayOverlay] = useState(false);

    useEffect(() => {
        console.log(formData)
        if (ValidationService.validateForm(formData)) {
            console.log(formData);
            apiService.signup(formData)
                .then((response: any) => {
                    console.log(response)
                })
                .catch((error: Error) => {
                    console.log(error)
                })
        }
    }, [formData])

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
            <ApplyOverlay setDisplay={setDisplayOverlay} errorDisplay={displayOverlayError} display={displayOverlay} />
            <Header />
            <div className="ss-signup-container">
                <div className="ss-signup-container__message">
                    {message}
                </div>
            </div>
            <Form buttonProps={buttonProps} formInputs={inputs} sendFormData={sendFormData} setDisplay={setDisplayOverlay} />
        </>
    )
}