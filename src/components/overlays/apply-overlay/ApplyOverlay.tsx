import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import xButton from "../../../../src/assets/images/icons/x-button-50.png";
import { Button } from "../../button/Button";
import "./apply-overlay.scss";

interface AppOverlayProps {
    display: boolean;
    errorDisplay: boolean;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    successMessage: JSX.Element;
    errorMessage: JSX.Element;
    navigateOnClose?: string;
}

const errorButtonStyles: React.CSSProperties = {
    backgroundColor: "lightcoral",
    border: "solid black 1px",
}

export const ApplyOverlay: React.FC<AppOverlayProps> = ({ display, errorDisplay, successMessage, errorMessage, navigateOnClose = "" }) => {
    const appOverlay = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()

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

    const refresh = () => {
        window.location.reload();
    }

    const closeOverlay = () => {
        if (appOverlay.current) {
            appOverlay.current.style.display = "none";
        }
    }

    return (
        <>
            <div className={`ss-apply-overlay ${display ? 'display-overlay' : ''} ${errorDisplay ? 'display-error' : ''}`} ref={appOverlay}>
                <div className="ss-apply-overlay__close-container">
                    <img src={xButton} alt="x-button" onClick={closeOverlay}>
                    </img>
                </div>
                <div className="ss-apply-overlay__content">
                    <p>
                        {errorDisplay ? errorMessage : successMessage}
                    </p>
                </div>
                {
                    errorDisplay && (
                        <div>
                            <Button styles={errorButtonStyles} text="REFRESH" type="button" click={refresh} />
                        </div>
                    )
                }
            </div>
        </>
    )
}