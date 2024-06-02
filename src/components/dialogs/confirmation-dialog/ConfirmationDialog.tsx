import { useEffect, useState } from "react";
import { Button } from "../../button/Button";
import "./confirmation-dialog.scss";

export interface DialogProps {
    title: string;
    message: string;
    display: boolean;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    bookingInfo:number;
    setDelete:React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmationDialog: React.FC<DialogProps> = ({bookingInfo, setDelete, setDisplay, display, title, message }) => {
    
    const [displayConfirmation, setDisplayConfirmation] = useState(display);

    // Synchronize local state with display prop
    useEffect(() => {
        setDisplayConfirmation(display);
    }, [display]);

    const cancel = () => {
        setDisplayConfirmation(false);
        setDisplay(false)
    };

    const deleteBooking = () => {
        setDelete(true);
        setDisplayConfirmation(false);
        setDisplay(false)
    }

    return (
        <>
            {displayConfirmation && (
                <div className="ss-confirmation-dialog-overlay">
                    <div className="ss-confirmation-dialog">
                        <div className="ss-confirmation-dialog__title">
                            {title}
                        </div>
                        <div className="ss-confirmation-dialog__container">
                            <div>{message}</div>
                            <div>BOOKING ID: {bookingInfo}</div>
                            <div className="ss-confirmation-dialog__container__buttons">
                                <Button text="DELETE BOOKING" type="button" click={deleteBooking}/>
                                <Button text="CANCEL" type="button" click={cancel} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
