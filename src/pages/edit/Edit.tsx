
import { FormProps, useParams } from "react-router-dom";
import { ApplyOverlay, ButtonProps, Form, Header, Input, Spinner } from "../../components";
import "./edit.scss";
import { useEffect, useState } from "react";
import eyeIcon from "../../assets/images/icons/view-100.png";
import { ValidationService } from "../../services";
import { useApiService } from "../../contexts/ApiServiceContext";

export interface PasswordChange {
    oldPassword: string;
    newPassword: string;
    retypePassword: string;
}
export const Edit: React.FC = () => {

    const apiService = useApiService();

    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get("type");

    const [state, setState] = useState("");
    const [formData, sendFormData] = useState({});
    const [displayOverlayError, setDisplayOverlayError] = useState(false);
    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(
        <>
            <div>ERROR LOGGING IN</div>
            <div>PLEASE TRY AGAIN</div>
        </>
    );

    useEffect(() => {
        const fieldsWritten = Object.keys(formData).length;
        if (fieldsWritten > 0) {
            if (ValidationService.validateForm(formData)) {
                setLoading(true)

                if (ValidationService.validatePasswordChange(formData)) {
                     apiService.change_user_password(formData)
                    .then((response) => {
                        console.log(response)
                    })
                    .catch((error:Error) => {
                        sendFormData({});
                        setErrorMessage(<>

                            <div>ERROR CHANGING PASSWORD</div>
                            <div>PLEASE TRY AGAIN</div>

                        </>)
                        setDisplayOverlayError(true);
                        console.error(error)
                    })
                } else {
                    setErrorMessage(<>
                        <div>RETYPED PASSWORD AND NEW PASSWORD DO NOT MATCH </div>
                        <div> TRY AGAIN</div>

                    </>)
                    sendFormData({});
                    setDisplayOverlayError(true);
                }


            } else {
                setErrorMessage(<>
                    <div>PLEASE FILL IN ALL </div>
                    <div> FIELDS OF THE FORM</div>

                </>)
                sendFormData({});
                setDisplayOverlayError(true);
            }
        }
    }, [formData])

    const formInputs: Input[] = [
        {
            name: "old-password",
            type: "text",
            label: "OLD PASSWORD"
        }, {
            name: "new-password",
            type: "password",
            label: "NEW PASSWORD",
            icon: eyeIcon
        },
        {
            name: "retype-password",
            type: "password",
            label: "RETYPED PASSWORD",
            icon: eyeIcon
        },
    ]


    const buttonProps: ButtonProps = {
        type: "submit",
        text: "CHANGE PASSWORD"
    }

    const editPasswordCopy = (
        <>   <div>
            EDIT YOUR PASSWORD
        </div>
            <div>
                BY ENTERING THE FOLLOWING FIELDS
            </div>
        </>

    )

    const successMessage = (
        <>
            <span>PASSWORD CHANGE SUCCESSFUL<br /></span>
        </>)

    return (
        <>
            <Header />
            <Spinner display={loading} />
            <ApplyOverlay
                navigateOnClose={"/user-dashboard"}
                errorMessage={errorMessage}
                successMessage={successMessage}
                setDisplay={setDisplayOverlay}
                errorDisplay={displayOverlayError}
                display={displayOverlay}
                setErrorDisplay={setDisplayOverlayError} />

            <section className="ss-edit-container">
                {type === "password" && (
                    <>
                        <main className="ss-edit-container__main">
                            {editPasswordCopy}
                        </main>
                        <Form formInputs={formInputs} buttonProps={buttonProps} sendFormData={sendFormData} />
                    </>
                )}
            </section>
        </>
    )
}