import { useNavigate } from "react-router-dom";
import "./location-tile.scss";

export interface LocationTileProps {
    // click: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    redirect:string;
}


export const LocationTile: React.FC<LocationTileProps> = (props) => {
    
    const navigate = useNavigate();
    
    const redirect = (url:string) => {
        navigate(url)
    }

    return (
        <>
            <div onClick={() => {
                redirect(props.redirect)
            }} className="ss-location-tile">

            </div>
        </>
    )
}