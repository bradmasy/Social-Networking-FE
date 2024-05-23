

import hamburgerMenu from "../../assets/images/icons/hamburger.png";
import ssLogo from "../../assets/images/ss-logo.png";
// import { SocialIcon } from "../SocialIcon/SocialIcon";
// import { SocialNav } from "../SocialNav";
import { useEffect, useRef, useState } from "react";

import "./mobile-nav-bar.scss";


// const socialNavProps = {
//     icons: [
//         {
//             url: "/locations",
//             imgPath: 
//         },
//         {
//             url: "https://www.youtube.com/@redwoodsvancouver7599",
//             imgPath: youtube
//         },
//         {
//             url: "https://open.spotify.com/artist/3uTxIW6v8i9yJTuKGvxRlI",
//             imgPath: spotify
//         },
//         {
//             url: "",
//             imgPath: facebook
//         },
//         {
//             url: "",
//             imgPath: appleMusic
//         },
//         {
//             url: "",
//             imgPath: twitter
//         }

//     ]
// }

interface MobileNavProps {
    mobileState: boolean
    setMobileState: React.Dispatch<React.SetStateAction<boolean>>;
    // setFade: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileNavBar: React.FC<MobileNavProps> = ({ setMobileState, mobileState }) => {
    const [fade, setFade] = useState(false);



    const openMobileMenu = () => {
        !mobileState ? setMobileState(true) : setMobileState(false);
        !mobileState ? setFade(false) : setFade(true);
    }


    
    return (

        <div className="mobile-nav-bar">
            <div className="mobile-menu-container">
                <div id="hamburger-menu">
                    <div id="hamburger-container" >
                        <div className="mobile-logo">
                            <div id="logo-container">
                                <img src={ssLogo}></img>
                                <div className="ss-logo-title">
                                    SEVENS SOCIAL

                                </div>
                            </div>
                        </div>
                        <div id="img-container" onClick={openMobileMenu}>
                            <img src={hamburgerMenu}>
                            </img>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}