import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

import "./location-tile.scss";

export interface LocationTileProps {
    // click: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    redirect: string;
    title: string;
    location: string;
    imgUrl: string;
    id: number;
    url: string;

}


// export const LocationTile: React.FC<LocationTileProps> = (props) => {

//     const navigate = useNavigate();

//     const redirect = (url:string) => {
//         navigate(url)
//     }

//     return (
//         <>
//             <div onClick={() => {
//                 redirect(props.redirect)
//             }} className="ss-location-tile">

//             </div>
//         </>
//     )
// }





export const LocationTile: React.FC<LocationTileProps> = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const tileRef = useRef(null);
    const backgroundImgRef = useRef<HTMLDivElement | null>(null);
    // const history = useHistory();

    useEffect(() => {
        if (backgroundImgRef.current) {
            backgroundImgRef.current.style.backgroundImage = `url(${props.imgUrl})`;
        }
    }, [props.imgUrl]);

    const onHover = () => {
        if (backgroundImgRef.current) {
            backgroundImgRef.current.style.opacity = '0.2';
            backgroundImgRef.current.style.transition = '0.5s ease-in';
        }
        setIsHovered(true);
    };

    const onLeave = () => {
        if (backgroundImgRef.current) {
            backgroundImgRef.current.style.opacity = '0';
            backgroundImgRef.current.style.transition = '0.s ease-out';
        }
        setIsHovered(false);
    };

    const routeToLocation = () => {
        // history.push(props.url);
    };

    return (
        <div className="ss-tile__wrapper" onClick={routeToLocation}>
            <div
                ref={tileRef}
                className="ss-tile__container"
                onMouseOver={onHover}
                onMouseLeave={onLeave}
                onClick={routeToLocation}
            >
                <div className="ss-tile__container__location-name">
                    {props.title}
                </div>
                {props.location && (
                    <div className="ss-tile__container__location">
                        <p>{props.location}</p>
                    </div>
                )}
            </div>
            <div ref={backgroundImgRef} className={`ss-tile__overlay ${isHovered ? 'hovered' : ''}`} />
        </div>
    );
};
