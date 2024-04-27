import './button.scss';

interface ButtonProps {
    text: string;
    type: "submit" | "reset" | "button";

}

export const Button: React.FC<ButtonProps> = ({ text, type }) => {
    return (
        <>
            <button className="ss-button-container" type={type}>{text}</button>

        </>
    )
}