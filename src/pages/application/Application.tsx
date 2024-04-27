import { useRef, useState } from "react";
import { Form, Header } from "../../components";
import { ApplyOverlay } from "../../components/overlays/apply-overlay/ApplyOverlay";

import './application.scss';

export const Application: React.FC = () => {

    const [displayOverlay, setDisplayOverlay] = useState(false);

    const mainCopy = (
        <>
            <span>GET EXCLUSIVE ACCESS<br /></span>
            <span>TO STUDIO BOOKINGS<br /></span>
            <span>PANELS, EVENTS<br /></span>
            <span>& MORE.</span>
        </>
    );

    const formDialogue = "PLEASE FILL OUT THE APPLICATION FORM AND APPLY NOW";


    return (
        <>
            <ApplyOverlay setDisplay={setDisplayOverlay} display={displayOverlay} />
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
                    <Form setDisplay={setDisplayOverlay}/>
                </main>
            </section>
        </>

    )
}