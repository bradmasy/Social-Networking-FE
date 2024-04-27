import './button.scss';

interface ButtonProps {
    text: string;
    id?: string;
    type: "submit" | "reset" | "button";
    click?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

}

export const Button: React.FC<ButtonProps> = ({ text, type, id,click }) => {
    return (
        <>
            <button onClick={click} id={id} className="ss-button-container" type={type}>{text}</button>

        </>
    )
}