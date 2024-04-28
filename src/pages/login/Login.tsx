import { useContext, useEffect, useState } from "react";
import { ButtonProps } from "../../components/button/Button";
import { Input } from "../../components/form/Form";
import { Header } from "../../components/index";
import { Form } from "../../components/index";
import eyeIcon from "../../assets/images/icons/view-100.png";
import { ValidationService } from "../../services";
import { useApiService } from "../../contexts/ApiServiceContext";
import "./login.scss";
import { AuthorizationContext } from "../../contexts/AuthorizationContext";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const apiService = useApiService();
    const { setAuthenticated } = useContext(AuthorizationContext);

    const [formData, sendFormData] = useState({});
    const [displayOverlay, setDisplayOverlay] = useState(false);

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


    useEffect(() => {

        if (ValidationService.validateForm(formData)) {
            console.log(formData);
            apiService.login(formData)
            .then((response) => {
                console.log(response)
                setAuthenticated(true)
                navigate("/payment")

            })
            .catch((error:Error) => {
                console.log(error)
            })
        }
    }, [formData])

    const message = (
        <>
            <span>WELCOME BACK TO<br /></span>
            <span className="highlight">SEVENS SOCIAL<br /></span>
            <span>PLEASE USE THE FORM BELOW<br /></span>
            <span>TO LOGIN<br /></span>
        </>
    )
    return (
        <>
            <Header />
            <div className="ss-login-container">
                <p>
                    {message}
                </p>
            </div>
            <Form formInputs={formInputs} setDisplay={setDisplayOverlay} buttonProps={buttonProps} sendFormData={sendFormData} />
        </>
    )
}