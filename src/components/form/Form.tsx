import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./form.scss";
import { Button, ButtonProps } from "../button/Button";

export interface FormData {
    [key: string]: string;
}

export interface Option {
    value: string;
    label: string;
    default: boolean;
}

export interface Input {
    name: string;
    type: string;
    label: string;
    icon?: string;
    value?: string | null;
    options?: Option[];
    disabled?: boolean;
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
    setSubmitClicked?: React.Dispatch<React.SetStateAction<boolean>>;
    formDataDictionary?: FormData;
}

export const Form: React.FC<FormProps> = ({ sendFormData, formDataDictionary, formInputs, selectInputs, buttonProps, setSubmitClicked }) => {
    const initialFormData: FormData = formInputs.reduce((acc, input) => {
        acc[input.name] = input.value || "";
        return acc;
    }, {} as FormData);

    const [formData, setFormData] = useState<FormData>(formDataDictionary || initialFormData);
    const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>, inputName: string) => {
        const { value } = event.target;
        sendFormData(prevState => ({ ...prevState, [inputName]: value }));
        setFormData(prevState => ({ ...prevState, [inputName]: value }));

    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendFormData(formData);
    };

    const revealPassword = (inputName: string): React.MouseEventHandler<HTMLImageElement> => () => {
        setShowPassword(prevState => ({ ...prevState, [inputName]: !prevState[inputName] }));
    }


    useEffect(() => {
        setFormData(formData); // ensures old values are carried over so entire form doesnt clear.

    }, [formInputs]);
    return (
        <form className="ss-form-container" onSubmit={handleSubmit}>
            {formInputs.map((input, index) => (
                <div key={index} className={`ss-form__input-container ${input.type === 'textarea' ? 'textarea-container' : ''}`}>
                    <label className="ss-form__label">{input.label.toUpperCase()}</label>
                    {input.type === 'select' ? (
                        <select
                            className="ss-form__input"
                            onChange={(event) => handleChange(event, input.name)}
                            disabled={input.disabled}

                            value={input.options?.find(e => e.default)?.value || ""}

                        //    value={formData[input.name] || ''}
                        >{
                                input?.options?.map((option, index) => {
                                    return(
                                    <option value={option.value} key={index}  >
                                        {option.label}
                                    </option>)
                                })
                            }
                            {selectInputs?.map((option, index) => (
                                <option value={option.value} key={index}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        input.type === 'password' ? (
                            <div className="ss-input-container__icon">
                                <input
                                    type={showPassword[input.name] ? "text" : "password"}
                                    className="ss-form__input"
                                    value={formData[input.name] || ''}
                                    onChange={(event) => handleChange(event, input.name)}
                                />
                                <img className="ss-icon" onClick={revealPassword(input.name)} src={input.icon} alt="icon"></img>
                            </div>
                        ) : (
                            <input
                                type={input.type}
                                placeholder={input.value || ''}
                                className={`ss-form__input ${input.type === 'textarea' ? 'textarea-input' : ''}`}
                                value={formData[input.name] || ''}
                                onChange={(event) => handleChange(event, input.name)}
                                disabled={input.disabled}

                            />
                        )
                    )}
                </div>
            ))}
            <div className="ss-form-container__submit-button">
                {setSubmitClicked ? (
                    <Button type={buttonProps.type} text={buttonProps.text} click={() => {
                        setSubmitClicked(true);
                    }} />
                ) : (
                    <Button type={buttonProps.type} text={buttonProps.text} />
                )}
            </div>
        </form>
    );
}