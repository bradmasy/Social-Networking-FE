
import { useRef } from "react";
import "./spinner.scss";

export const Spinner: React.FC<{ display: boolean }> = ({ display }) => {
    const spinnerRef = useRef<HTMLDivElement>(null); // Specify the type of ref

    return (
        <>


            <div ref={spinnerRef} className={`ss-spinner ${display ? 'display-spinner' : ''}`}>

            </div>

        </>
    );
};