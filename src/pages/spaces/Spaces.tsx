

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LocationTile, NavBar } from "../../components"

import "./spaces.scss";
import { useApiService } from "../../contexts/ApiServiceContext";
import { useEffect, useState } from "react";
import { Space } from "../location-details/LocationDetails";
import { Location } from "../locations/Locations";

import recording from "../../assets/images/recording.jpg";
import desks from "../../assets/images/desks.jpg";
import photo from "../../assets/images/photo-wall.jpg";

export const Spaces: React.FC = () => {
    const navigate = useNavigate();
    const apiService = useApiService();
    let { id } = useParams();
    let location = useLocation();

    const [locationData, setLocationData] = useState<Location | null>(null);
    const [spaces, setSpaces] = useState<Space[] | null>(null);
    const [path, setPath] = useState("");

    const images = [recording, desks, photo]

    useEffect(() => {
        setPath(location.pathname);

        if (id) {
            const convertedId = parseInt(id);
            apiService.get_location_by_id(convertedId)
                .then((location) => {
                    setLocationData(location.data["Location"])
                    return apiService.get_spaces_by_location(convertedId)
                })
                .then((spaces) => {
                    console.log(spaces.data["Spaces"])
                    setSpaces(spaces.data["Spaces"])
                })

        }


    }, [apiService])

    return (
        <>
            <NavBar />

            <section className="ss-spaces">
                <div className="ss-spaces__title">
                    {locationData?.locationName.toUpperCase()} - {locationData?.city.toUpperCase()} - SPACES

                </div>
                <div className="ss-space__spaces">
                    {
                        spaces?.map((space, i) => (
                            <LocationTile
                                key={i}
                                title={space.name}
                                url={`${path}/${space.id}`}
                                imgUrl={images[i]}
                            />
                        ))
                    }
                </div>

            </section>
        </>
    )
}