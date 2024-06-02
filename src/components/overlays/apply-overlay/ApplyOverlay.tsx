import { useEffect, useRef } from "react";
import xButton from "../../../../src/assets/images/icons/x-button-50.png";
import "./apply-overlay.scss";

interface AppOverlayProps {
    display: boolean;
    errorDisplay: boolean;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    successMessage?: JSX.Element;
    errorMessage?: JSX.Element;
    navigateOnClose?: string;
}

export const ApplyOverlay: React.FC<AppOverlayProps> = ({ display, errorDisplay, successMessage, errorMessage, navigateOnClose = "", setDisplay, setErrorDisplay }) => {
    const appOverlay = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const adjustOverlayPosition = () => {
            const overlay = document.querySelector('.ss-apply-overlay') as HTMLElement;
            if (overlay) {
                const scrollY = window.scrollY || window.pageYOffset;
                const viewportHeight = window.innerHeight;
                const overlayHeight = overlay.offsetHeight;
                const topPosition = Math.max((viewportHeight - overlayHeight) / 2 + overlayHeight / 2 + scrollY);
                overlay.style.top = topPosition + 'px';
            }
        }

        window.addEventListener('resize', adjustOverlayPosition);
        window.addEventListener('scroll', adjustOverlayPosition);

        adjustOverlayPosition();

        const overlay = document.querySelector('.ss-apply-overlay') as HTMLElement;

        if (overlay) {
            overlay.style.visibility = 'visible';
        }

        return () => {
            window.removeEventListener('resize', adjustOverlayPosition);
            window.removeEventListener('scroll', adjustOverlayPosition);
        };
    }, []);

    const closeOverlay = () => {

        // removing the classes will toggle the display of the error and success messages

        appOverlay.current?.classList.remove('display-overlay')
        appOverlay.current?.classList.remove('display-error')
        setDisplay(false);
        setErrorDisplay(false);
    }

    return (
        <>
        <div>
            <div className={`ss-apply-overlay ${display ? 'display-overlay' : ''} ${errorDisplay ? 'display-error' : ''}`} ref={appOverlay}>
                <div className="ss-apply-overlay__close-container">
                    <img src={xButton} alt="x-button" onClick={closeOverlay}>
                    </img>
                </div>
                <div className="ss-apply-overlay__content">
                    <div>
                        {errorDisplay ? errorMessage : successMessage}
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}