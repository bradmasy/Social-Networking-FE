import { useEffect, useState } from "react";
import { Form, Header } from "../../components";
import { ApplyOverlay } from "../../components/overlays/apply-overlay/ApplyOverlay";
import { useApiService } from "../../contexts/ApiServiceContext";
import { ValidationService } from "../../services/validation/ValidationService";
import { Input, SelectOption } from "../../components/form/Form";
import { ButtonProps } from "../../components/button/Button";
import './application.scss';


export const Application: React.FC = () => {

    const apiService = useApiService();

    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [displayOverlayError, setDisplayOverlayError] = useState(false);
    const [formData, sendFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(
        <>
            <span>AN ERROR OCCURED WHILE SUBMITTING YOUR APPLICATION<br /></span>
            <span>PLEASE TRY AGAIN LATER.<br /></span>
            <span><br /></span>
        </>)

    const mainCopy = (
        <>
            <span>GET EXCLUSIVE ACCESS<br /></span>
            <span>TO STUDIO BOOKINGS<br /></span>
            <span>PANELS, EVENTS<br /></span>
            <span>& MORE.</span>
        </>
    );

    const formDialogue = "PLEASE FILL OUT THE APPLICATION FORM AND APPLY NOW";
    const inputs: Input[] = [
        {
            name: "name",
            type: "text",
            label: "FULL NAME"
        },
        {
            name: "artist",
            type: "text",
            label: "ARTIST NAME"
        },
        {
            name: "social",
            type: "text",
            label: "SOCIAL MEDIA LINK"
        },
        {
            name: "email",
            type: "text",
            label: "EMAIL ADDRESS"
        },
        {
            name: "birth",
            type: "date",
            label: "DATE OF BIRTH"
        },
        {
            name: "location",
            type: "select",
            label: "LOCATION"
        },
        {
            label: '1. Do you consider yourself creative? If so, briefly explain why. If no, briefly explain why. ',
            type: "textarea",
            name: "q1"
        }, {
            label: '2. do you believe in something bigger than yourself? If so, explain. If not, still explain',
            type: "textarea",
            name: "q2"


        }, {
            label: '3. What type of art defines you if any, and why?',
            type: "textarea",
            name: "q3"


        }, {
            label: '4. what are some of the biggest struggles keeping you from truly pursuing what you love doing?',
            type: "textarea",
            name: "q4"


        }, {
            label: '5. What was your dream job as a child?',
            type: "textarea",
            name: "q5"


        }, {
            label: '6. If you could do anything as a career, what would it be?',
            type: "textarea",
            name: "q6"


        }, {
            label: '7. What does the number 7 mean to you?',
            type: "textarea",
            name: "q7"
        }
    ]

    const selectOptions: SelectOption[] = [
        {
            name: "CHOOSE A LOCATION",
            value: undefined
        },
        {
            name: "DUNDAS ST STUDIO",
            value: 1
        },
        {
            name: "PORT STANLEY BEACH HOUSE",
            value: 2
        }
    ]

    const buttonProps: ButtonProps = {
        type: "submit",
        text: "APPLY NOW"
    }


    useEffect(()=>{
        sendFormData(formData);
    },[formData])
    
  
        const apply = () => {
             if (ValidationService.validateForm(formData)) {
                apiService.apply(formData).then((res: any) => {
                    setDisplayOverlay(true);
                    sendFormData({});
                }).catch((error: Error) => {
                    setDisplayOverlayError(true);
                })
            }
            else {
                setErrorMessage(
                    <>
                        <span>PLEASE FILL OUT EACH FIELD<br /></span>
                        <span>IN THE FORM AND RE-SUBMIT<br /></span>
                    </>)
                setDisplayOverlayError(true);
            }
    }


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
            <ApplyOverlay
                errorMessage={errorMessage}
                successMessage={successMessage}
                setDisplay={setDisplayOverlay}
                errorDisplay={displayOverlayError}
                display={displayOverlay}
                setErrorDisplay={setDisplayOverlayError}
            />
            <Header />
            <section className="ss-application__main-content">
                <main className='ss-application__main-content__main'>
                    {/* <div className='ss-application__main-content__main__ad-copy-container'>
                        <p>
                            {mainCopy}
                        </p>
                    </div>
                    <div className="ss-application__form-dialogue">
                        <p>
                            {formDialogue}
                        </p>
                    </div> */}
                    <Form text={
                        <>   <div className='ss-application__main-content__main__ad-copy-container'>
                        <p>
                            {mainCopy}
                        </p>
                    </div>
                    <div className="ss-application__form-dialogue">
                        <p>
                            {formDialogue}
                        </p>
                    </div></>
                    } setSubmitClicked={apply} buttonProps={buttonProps} formInputs={inputs} selectInputs={selectOptions} sendFormData={sendFormData} />
                </main>
            </section>
        </>

    )
}