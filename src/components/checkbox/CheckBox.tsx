
import "./checkbox.scss";

export interface CheckBoxProps {
    label: string;
    onChange?: (isChecked: boolean) => void;
    subText:string;
    disabled:boolean;

}
export const CheckBox: React.FC<CheckBoxProps> = ({ ...props }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;

        if (props.onChange) {
            props.onChange(isChecked);
        }
    };
    return (
        <>
            <div className="ss-checkbox">
                <div className="ss-checkbox__checkbox-container">
                    <input disabled={props.disabled} type="checkbox" onChange={handleChange} value="$277.00" name="membership-fee" />
                    <label>{props.label}</label>
                </div>
                <div className="ss-checkbox__copy">
                    {props.subText}
                </div>
            </div>

        </>
    )
}