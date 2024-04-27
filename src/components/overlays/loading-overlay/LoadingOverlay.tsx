import { useEffect, useState } from "react";
import "./loading-overlay.scss";

export const LoadingOverlay:React.FC = () => {
    const [loadingText, setLoadingText] = useState("LOADING");

    // useEffect(() => {
    //     const text = 'LOADING...';
    //     let index = 0;

    //     const intervalId = setInterval(() => {
    //         if (index < text.length) {
    //             setLoadingText((prevText:string) => prevText + text[index]);
    //             index++;
    //         } else {
    //             setLoadingText('')
    //             clearInterval(intervalId);
    //         }
    //     }, 500);

    //     return () => clearInterval(intervalId);
    // }, []);

    return(
        <>
        <div className="ss-loading-overlay-container">
            <div className="ss-loading-overlay-container__loading" >
                <p>{loadingText}</p>
            </div>
            <div className="ss-loading-overlay-container__spinner"></div>
        </div>
        </>
    )
}