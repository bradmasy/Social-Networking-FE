import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import "./form.scss";
import { Button } from "../button/Button";
import { ValidationService } from "../../services/validation/ValidationService";

export interface FormData {
    name: string | null;
    artist: string | null;
    social: string | null;
    email: string | null;
    birth: Date | null;
    location: number | null;
    q1: string | null;
    q2: string | null;
    q3: string | null;
    q4: string | null;
    q5: string | null;
    q6: string | null;
    q7: string | null;
}


interface Input {
    name: string;
    type: string;
    label: string;
}

interface SelectOption {
    name: string;
    value: number | undefined;
}

interface FormProps{
    setDisplay:React.Dispatch<React.SetStateAction<boolean>>;
    sendFormData:React.Dispatch<React.SetStateAction<FormData>>;
}

export const Form: React.FC<FormProps> = ({setDisplay,sendFormData}) => {

    const [formData, setFormData] = useState<FormData>({
        name: null,
        artist: null,
        social: null,
        email: null,
        birth: null,
        location: null,
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        q5: null,
        q6: null,
        q7: null,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>, inputName: string) => {
        const { value } = event.target;
        setFormData({ ...formData, [inputName]: value });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // send the form data if it is valid
        if(ValidationService.validateForm(formData)){
            sendFormData(formData);
        }
    };

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

    useEffect(() => {
        // overlay = document.querySelector('.ss-apply-overlay') as HTMLElement;
    },[])
    
    return (
        <>
            <form className="ss-form-container" onSubmit={handleSubmit}>
                {
                    inputs.map((input, index) => (
                        <div key={index} className={`ss-form__input-container ${input.type === 'textarea' ? 'textarea-container' : ''}`}>
                            <label className="ss-form__label">{input.label.toUpperCase()}</label>
                            {input.type === 'select' ? (
                                <select
                                    className="ss-form__input"
                                    onChange={(event) => handleChange(event, input.name)}
                                >
                                    {
                                        selectOptions.map((option, index) => (
                                            <option value={option.value} key={index}>
                                                {option.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            ) : (
                                input.type === 'textarea' ? (
                                    <textarea
                                        className="ss-form__input textarea-input"
                                        onChange={(event) => handleChange(event, input.name)}
                                    />
                                ) : (
                                    <input
                                        type={input.type}
                                        className="ss-form__input"
                                        onChange={(event) => handleChange(event, input.name)}
                                    />
                                )
                            )}
                        </div>
                    ))
                }
                <div className="ss-form-container__submit-button">
                <Button type="submit" text="APPLY NOW" />

                </div>
            </form>
        </>
    )
}