import { ChangeEvent, FormEvent, useState } from "react";
import { Button, ButtonProps } from "../button/Button";
import "./form.scss";

export interface FormData {
    [key: string]: string | null;
}

export interface Input {
    name: string;
    type: string;
    label: string;
    icon?: string;
}

export interface SelectOption {
    name: string;
    value: number | undefined;
    icon?: string;
}


interface FormProps {
    sendFormData: React.Dispatch<React.SetStateAction<FormData>>;
    formInputs: Input[];
    selectInputs?: SelectOption[];
    buttonProps: ButtonProps;
}

export const Form: React.FC<FormProps> = ({ sendFormData, formInputs, selectInputs, buttonProps }) => {
    const initialFormData: FormData = {};

    formInputs.forEach(input => {
        initialFormData[input.name] = null;
    });

    const [formData, setFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({}); // Initialize as empty object

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>, inputName: string) => {
        const { value } = event.target;
        setFormData({ ...formData, [inputName]: value });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendFormData(formData);
    };

    const revealPassword = (inputName: string): React.MouseEventHandler<HTMLImageElement> => (event) => {
        const updatedShowPassword = { ...showPassword };
        updatedShowPassword[inputName] = !showPassword[inputName] || false; // Toggle state or set to false if missing

        setShowPassword(updatedShowPassword);
    }

    return (
        <>
            <form className="ss-form-container" onSubmit={handleSubmit}>
                {formInputs.map((input, index) => (
                    <div key={index} className={`ss-form__input-container ${input.type === 'textarea' ? 'textarea-container' : ''}`}>
                        <label className="ss-form__label">{input.label.toUpperCase()}</label>
                        {input.type === 'select' ? (
                            <select
                                className="ss-form__input"
                                onChange={(event) => handleChange(event, input.name)}
                            >
                                {selectInputs?.map((option, index) => (
                                    <option value={option.value} key={index}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        ) : (input.type === 'password' ? (
                            <div className="ss-input-container__icon">
                                <input
                                    type={showPassword[input.name] ? "text" : "password"}
                                    className="ss-form__input"
                                    onChange={(event) => handleChange(event, input.name)}
                                />
                                <img className="ss-icon" onClick={revealPassword(input.name)} src={input.icon} alt="icon"></img>
                            </div>
                        ) :
                            <>

                                <input
                                    type={input.type}
                                    className={`ss-form__input ${input.type === 'textarea' ? 'textarea-input' : ''}`}
                                    onChange={(event) => handleChange(event, input.name)}
                                />

                            </>
                        )}
                    </div>
                ))}
                <div className="ss-form-container__submit-button">
                    <Button type={buttonProps.type} text={buttonProps.text} />
                </div>
            </form>
        </>
    )
}