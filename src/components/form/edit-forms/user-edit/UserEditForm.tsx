import { useEffect, useState } from "react";
import { LoadingOverlay } from "../../../overlays/loading-overlay/LoadingOverlay";
import { ApplyOverlay } from "../../../overlays";
import { Form, Input } from "../../Form";
import { ButtonProps } from "../../../button/Button";
import { useApiService } from "../../../../contexts/ApiServiceContext";

import "../edit-form.scss";

export const UserEditForm: React.FC = () => {
    const apiService = useApiService();

    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [errorMessage, setErrorMessage] = useState(<><div>ERROR</div></>)
    const [successMessage, setSuccessMessage] = useState(<><div>USER DETAILS UPDATED</div></>)
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [userData, setUserData] = useState<{ [key: string]: string }>({
        phoneNumber: "",
        username: "",
        artistName: "",
        email: "",
        firstName: "",
        lastName: "",
        socialLink: ""
    });


    const editUserDetailsCopy = (
        <>
            <div>
                EDIT USER DETAILS
            </div>
        </>
    )

    const buttonProps: ButtonProps = {
        text: "SUBMIT",
        type: "button",
    }

    const userFormInputsDetails: Input[] = [
        {
            name: "username",
            type: "test",
            label: "USERNAME",
            value: userData["username"]

        }, {
            name: "artist_name",
            type: "text",
            label: "ARTIST NAME",
            value: userData["artistName"]


        }, {
            name: "email",
            type: "email",
            label: "EMAIL",
            value: userData["email"]

        },
        {
            name: "first_name",
            type: "text",
            label: "FIRST NAME",
            value: userData["firstName"]


        }, {
            name: "last_name",
            type: "text",
            label: "LAST NAME",
            value: userData["lastName"]


        }, {
            name: "phone_number",
            type: "tel",
            label: "PHONE NUMBER",
            value: userData["phoneNumber"]


        }, {
            name: "socialLink",
            type: "text",
            label: "SOCIAL LINK",
            value: userData["socialLink"]

        },
    ]
    const submit = () => {
        setLoading(true)

        const nonNullFields = Object.entries(formData)
            .filter(([key, value]) => value !== '' && value !== null)
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {} as { [key: string]: string | null });

        console.log(nonNullFields)
        setLoading(true)

        apiService.update_user(nonNullFields)
            .then((updateUser) => {
                setLoading(false)
                setSuccessMessage(<>
                    <div>SUCCESS</div>
                    <div>USER DETAILS UPDATED</div>
                </>)
                setDisplayOverlay(true)

            })
            .catch((error: any) => {
                setLoading(false)
                setFormData({});
                setErrorMessage(<>


                    <div>ERROR UPDATING USER</div>
                    <div>PLEASE TRY AGAIN</div>

                </>)
                setErrorDisplay(true);

            })
    }

    useEffect(() => {


        apiService.get_user_data()
            .then((response) => {
                const user = response.data["user"]
                setUserData(user);
                setFormData(userData)
            })
            .catch((err) => {

            })

    }, [])
    return (<>
        {
            loading ? (
                <>
                    <LoadingOverlay />
                </>
            )
                : (<>
                    <ApplyOverlay
                        display={displayOverlay}
                        setDisplay={setDisplayOverlay}
                        setErrorDisplay={setErrorDisplay}
                        errorDisplay={errorDisplay}
                        errorMessage={errorMessage}
                        successMessage={successMessage}
                    />

                    <Form
                        text={editUserDetailsCopy}
                        formDataDictionary={formData}
                        buttonProps={buttonProps}
                        sendFormData={setFormData}
                        setSubmitClicked={submit}
                        formInputs={userFormInputsDetails} />
                </>)
        }
    </>)
}