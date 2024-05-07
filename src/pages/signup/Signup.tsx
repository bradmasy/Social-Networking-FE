import { useEffect, useState } from "react";
import { Form, Header } from "../../components";
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

    useEffect(() => {
        if (ValidationService.validateForm(formData)) {
            apiService.signup(formData)
                .then((response: any) => {
                    console.log(response.data["token"])
                    authService.setAuthenticationToken(response.data)
                    navigate('/payment')
                })
                .catch((error: Error) => {
                    setDisplayOverlayError(true);
                })
        }
    }, [apiService, formData])

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

    // const successMessage = (
    //     <>
    //         <span>THANK YOU FOR YOUR APPLICATION<br /></span>
    //         <span>SEVENS SOCIAL WILL <br /></span>
    //         <span>CAREFULLY REVIEW IT <br /></span>
    //         <span> AND REACH OUT TO YOU SOON<br /></span>
    //         <span><br /></span>
    //     </>
    // )

    // const successMessage = (
    //     <>
    //         <span>SIGNUP SUCCESSFUL<br /></span>
    //         <span>PLEASE NAVIGATE TO LOGIN <br /></span>
    //         <span>TO LOGIN INTO YOUR ACCOUNT<br /></span>
    //         <span><br /></span>
    //     </>
   //)


    const errorMessage = (
        <>
            <span>AN ERROR OCCURED WHILE SUBMITTING YOUR APPLICATION<br /></span>
            <span>PLEASE TRY AGAIN LATER.<br /></span>
            <span><br /></span>
        </>
    );

    
    return (
        <>
            <ApplyOverlay errorMessage={errorMessage}  setDisplay={setDisplayOverlay} errorDisplay={displayOverlayError} display={displayOverlay} />
            <Header />
            <div className="ss-signup-container">
                <div className="ss-signup-container__message">
                    {message}
                </div>
            </div>
            <Form buttonProps={buttonProps} formInputs={inputs} sendFormData={sendFormData} />
        </>
    )
}