import './button.scss';

export interface ButtonProps {
    text: string;
    id?: string;
    type: "submit" | "reset" | "button";
    click?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    styles?: React.CSSProperties;

}

export const Button: React.FC<ButtonProps> = ({ text, type, id, click, styles }) => {
    return (
        <>
            <button onClick={click} id={id} className="ss-button-container" type={type} style={styles}>{text}</button>

        </>
    )
}