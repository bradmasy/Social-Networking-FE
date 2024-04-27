import { useEffect, useRef, useState } from "react";
import { Form, Header } from "../../components";
import { ApplyOverlay } from "../../components/overlays/apply-overlay/ApplyOverlay";
import { useApiService } from "../../contexts/ApiServiceContext";
import './application.scss';
import { ValidationService } from "../../services/validation/ValidationService";

export const Application: React.FC = () => {

    const apiService = useApiService();

    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [displayOverlayError, setDisplayOverlayError] = useState(false);

    const [formData, sendFormData] = useState({});

    const mainCopy = (
        <>
            <span>GET EXCLUSIVE ACCESS<br /></span>
            <span>TO STUDIO BOOKINGS<br /></span>
            <span>PANELS, EVENTS<br /></span>
            <span>& MORE.</span>
        </>
    );

    const formDialogue = "PLEASE FILL OUT THE APPLICATION FORM AND APPLY NOW";

    useEffect(() => {
        if (ValidationService.validateForm(formData)) {

            apiService.apply(formData).then((res: any) => {
                console.log(res)
                setDisplayOverlay(true);
            }).catch((error: Error) => {
                setDisplayOverlayError(true);
                console.log(error)
            })
        }

    }, [formData])


    return (
        <>
            <ApplyOverlay setDisplay={setDisplayOverlay} errorDisplay={displayOverlayError} display={displayOverlay} />
            <Header />
            <section className="ss-application__main-content">
                <main className='ss-application__main-content__main'>
                    <div className='ss-application__main-content__main__ad-copy-container'>
                        <p>
                            {mainCopy}
                        </p>
                    </div>
                    <div className="ss-application__form-dialogue">
                        <p>
                            {formDialogue}
                        </p>
                    </div>
                    <Form sendFormData={sendFormData} setDisplay={setDisplayOverlay} />
                </main>
            </section>
        </>

    )
}