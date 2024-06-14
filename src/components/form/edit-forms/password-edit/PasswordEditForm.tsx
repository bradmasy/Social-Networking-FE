
import { Form, Input } from "../../Form";
import eyeIcon from "../../../../assets/images/icons/view-100.png";
import { useState } from "react";
import { ButtonProps } from "../../../button/Button";
import { ValidationService } from "../../../../services/validation/ValidationService";
import { useApiService } from "../../../../contexts/ApiServiceContext";
import { ApplyOverlay } from "../../../overlays";
import { useNavigate } from "react-router-dom";

import "../edit-form.scss";

export const PasswordEditForm: React.FC = () => {
    const apiService = useApiService();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [displayOverlayError, setDisplayOverlayError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(
        <>
            <div>ERROR CHANGING PASSWORD</div>
            <div>PLEASE TRY AGAIN</div>
        </>
    );
    const [successMessage, setSuccessMessage] = useState(
        <>
            <span>PASSWORD CHANGE SUCCESSFUL<br /></span>
        </>
    )
    const editPasswordCopy = (
        <>   <div>
            EDIT PASSWORD
        </div>
          
        </>)

    const buttonProps: ButtonProps = {
        type: "submit",
        text: "SUBMIT"
    }

    const submit = () => {
        if (ValidationService.validateForm(formData)) {
            if (ValidationService.validatePasswordChange(formData)) {
                setLoading(true)

                apiService.change_user_password(formData)
                    .then((response: any) => {
                        setLoading(false)
                        setDisplayOverlay(true)
                        setTimeout(() => {
                            navigate("/user-dashboard")
                        }, 1000)
                    })
                    .catch((error: Error) => {
                        setLoading(false)
                        setFormData({});
                        setErrorMessage(<>
                            <div>ERROR SETTING PASSWORD</div>
                            <div></div>
                        </>)
                        setDisplayOverlayError(true);
                        console.error(error)
                    })
            } else {
                setErrorMessage(<>
                    <div>RETYPED PASSWORD AND NEW PASSWORD DO NOT MATCH </div>
                    <div> TRY AGAIN</div>
                </>)
                setFormData({});
                setDisplayOverlayError(true);
            }
        } else {
            setErrorMessage(<>
                <div>PLEASE ENTER VALUES FOR ALL FIELDS</div>
            </>)
            setDisplayOverlayError(true);
            setFormData({});

        }
    }

    const formInputs: Input[] = [
        {
            name: "old_password",
            type: "password",
            label: "OLD PASSWORD",
            icon: eyeIcon
        }, {
            name: "new_password",
            type: "password",
            label: "NEW PASSWORD",
            icon: eyeIcon
        },
        {
            name: "retype_password",
            type: "password",
            label: "RETYPED PASSWORD",
            icon: eyeIcon
        },
    ]
    return (
        <>
            <ApplyOverlay
                display={displayOverlay}
                setDisplay={setDisplayOverlay}
                setErrorDisplay={setDisplayOverlayError}
                errorDisplay={displayOverlayError}
                errorMessage={errorMessage}
                successMessage={successMessage}
            />
      
            <Form
                text={editPasswordCopy}
                formInputs={formInputs}
                buttonProps={buttonProps}
                sendFormData={setFormData}
                setSubmitClicked={submit}
            />
        </>
    )
}