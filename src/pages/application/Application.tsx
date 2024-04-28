import { FormEvent, useEffect, useRef, useState } from "react";
import { Form, Header } from "../../components";
import { ApplyOverlay } from "../../components/overlays/apply-overlay/ApplyOverlay";
import { useApiService } from "../../contexts/ApiServiceContext";
import { ValidationService } from "../../services/validation/ValidationService";
import { Input, SelectOption } from "../../components/form/Form";
import './application.scss';
import { ButtonProps } from "../../components/button/Button";

export const Application: React.FC = () => {

    const apiService = useApiService();

    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [displayOverlayError, setDisplayOverlayError] = useState(false);
    const [formData, sendFormData] = useState({});

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


    useEffect(() => {
        if (ValidationService.validateForm(formData)) {

            apiService.apply(formData).then((res: any) => {
                setDisplayOverlay(true);
            }).catch((error: Error) => {
                setDisplayOverlayError(true);
            })
        }

    }, [formData])


    return (
        <>
            <ApplyOverlay setDisplay={setDisplayOverlay} errorDisplay={displayOverlayError} display={displayOverlay} />
            <Header />
            <section className="ss-application__main-content">
                <main className='ss-application__main-content__main'>
                    <div className='ss-application__main-content__main__ad-copy-container'>
                        <p>
                            {mainCopy}
                        </p>
                    </div>
                    <div className="ss-application__form-dialogue">
                        <p>
                            {formDialogue}
                        </p>
                    </div>
                    <Form buttonProps={buttonProps} formInputs={inputs} selectInputs={selectOptions} sendFormData={sendFormData} setDisplay={setDisplayOverlay} />
                </main>
            </section>
        </>

    )
}