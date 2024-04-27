import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import xButton from "../../../../src/assets/images/icons/x-button-50.png";
import "./apply-overlay.scss";
import { Home } from "../../../pages";

interface AppOverlayProps {
    display: boolean;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ApplyOverlay: React.FC<AppOverlayProps> = ({ display }) => {
    const appOverlay = useRef(null);
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

    const exitAndRedirect = () => {
        navigate('/');
    }


    const thankYouMessage = (
        <>
            <span>THANK YOU FOR YOUR APPLICATION<br /></span>
            <span>SEVENS SOCIAL WILL <br /></span>
            <span>CAREFULLY REVIEW IT <br /></span>
            <span> AND REACH OUT TO YOU SOON<br /></span>
            <span><br /></span>
        </>
    )
    return (
        <>
            <div className={`ss-apply-overlay ${display ? 'display-overlay' : ''}`} ref={appOverlay}>
                <div className="ss-apply-overlay__close-container">
                    <img src={xButton} alt="x-button" onClick={exitAndRedirect}>
                    </img>
                </div>
                <div className="ss-apply-overlay__content">
                    <p>
                        {thankYouMessage}
                    </p>
                </div>
            </div>
        </>
    )
}