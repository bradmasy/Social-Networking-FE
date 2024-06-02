
import { FormProps, useParams } from "react-router-dom";
import { ApplyOverlay, BookingEditForm, ButtonProps, Form, Header, Input, NavBar, Spinner } from "../../components";
import { useEffect, useRef, useState } from "react";
import eyeIcon from "../../assets/images/icons/view-100.png";
import { ValidationService } from "../../services";
import { useApiService } from "../../contexts/ApiServiceContext";
import { Option } from "../../components";
import "./edit.scss";
import { object } from "square/dist/types/schema";
import { Booking } from "../booking-date/BookingDate";
import { Location, Space } from "../location-details/LocationDetails";

export interface PasswordChange {
    oldPassword: string;
    newPassword: string;
    retypePassword: string;
}
export const Edit: React.FC = () => {

    const apiService = useApiService();

    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get("type");

    //const [formData, sendFormData] = useState<{ [key: string]: string | null }>({});
    const [displayOverlayError, setDisplayOverlayError] = useState(false);
    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);


    const [successMessage, setSuccessMessage] = useState(
        <>
            <span>PASSWORD CHANGE SUCCESSFUL<br /></span>
        </>
    )
    const [userData, setUserData] = useState<{ [key: string]: string }>({
        phoneNumber: "",
        username: "",
        artistName: "",
        email: "",
        firstName: "",
        lastName: "",
        socialLink: ""
    });

    const [errorMessage, setErrorMessage] = useState(
        <>
            <div>ERROR LOGGING IN</div>
            <div>PLEASE TRY AGAIN</div>
        </>
    );



    // useEffect(() => {
    //     if (type === "user-details") {

    //         apiService.get_user_data()
    //             .then((response) => {
    //                 const user = response.data["user"]
    //                 setUserData(user);
    //                 sendFormData(userData)
    //                 setDataFetched(true);
    //             })
    //             .catch((err) => {

    //             })
    //     }
    // }, [])

    const submit = () => {
        // if (type === "password") {
        //     if (ValidationService.validateForm(formData) && ValidationService.validatePasswordChange(formData)) {
        //         setLoading(true)

        //         apiService.change_user_password(formData)
        //             .then((response) => {
        //                 setLoading(false)
        //                 setDisplayOverlay(true)
        //             })
        //             .catch((error: Error) => {
        //                 setLoading(false)
        //                 sendFormData({});
        //                 setErrorMessage(<>

        //                     <div>ERROR CHANGING PASSWORD</div>
        //                     <div>PLEASE TRY AGAIN</div>

        //                 </>)
        //                 setDisplayOverlayError(true);
        //                 console.error(error)
        //             })
        //     } else {
        //         setErrorMessage(<>
        //             <div>RETYPED PASSWORD AND NEW PASSWORD DO NOT MATCH </div>
        //             <div> TRY AGAIN</div>

        //         </>)
        //         sendFormData({});
        //         setDisplayOverlayError(true);
        //     }

        // }
        // else if (type === "user-details") {
        //     setLoading(true)

        //     const nonNullFields = Object.entries(formData)
        //         .filter(([key, value]) => value !== '' && value !== null)
        //         .reduce((obj, [key, value]) => {
        //             obj[key] = value;
        //             return obj;
        //         }, {} as { [key: string]: string | null });

        //     setLoading(true)

        //     apiService.update_user(nonNullFields)
        //         .then((updateUser) => {
        //             setLoading(false)
        //             setSuccessMessage(<>
        //                 <div>SUCCESS</div>
        //                 <div>USER DETAILS UPDATED</div>
        //             </>)
        //             setDisplayOverlay(true)

        //         })
        //         .catch((error: any) => {
        //             setLoading(false)
        //             sendFormData({});
        //             setErrorMessage(<>


        //                 <div>ERROR UPDATING USER</div>
        //                 <div>PLEASE TRY AGAIN</div>

        //             </>)
        //             setDisplayOverlayError(true);

        //         })


        // } else if (type === "booking") {
        //     console.log('subm,itting booking')
        //    // console.log(formData)

        //     // edit booking api call
        // } else {
        //     if (type !== "user-details") {
        //         setErrorMessage(<>
        //             <div>PLEASE FILL IN ALL </div>
        //             <div> FIELDS OF THE FORM</div>

        //         </>)
        //         //sendFormData({});
        //         setDisplayOverlayError(true);
        //     }
        // }


    }

    // these are formatted snake case to fit the python backend
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


    const formInputsDetails: Input[] = [
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



    const buttonProps: ButtonProps = {
        type: "submit",
        text: "SUBMIT"
    }

    const editPasswordCopy = (
        <>   <div>
            EDIT YOUR PASSWORD
        </div>
            <div>
                BY ENTERING THE FOLLOWING FIELDS
            </div>
        </>)

    const editUserCopy = (
        <>   <div>
            EDIT USER INFORMATION
        </div>

        </>
    )


    return (
        <>
            <NavBar />
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

                {/* {type === "password" && (
                    <>
                        <main className="ss-edit-container__main">
                            {editPasswordCopy}
                        </main>
                        <Form formInputs={formInputs} buttonProps={buttonProps} sendFormData={sendFormData} setSubmitClicked={submit} />
                    </>
                )}
                {type === "user-details" && (
                    <> <main className="ss-edit-container__main">
                        {editUserCopy}
                    </main>
                        <Form formInputs={formInputsDetails} buttonProps={buttonProps} sendFormData={sendFormData} setSubmitClicked={submit} />
                    </>
                )
                } */}
                {
                    type === "booking" && (
                        <>
                            <BookingEditForm />
                        </>
                    )
                }
            </section>
        </>
    )
}