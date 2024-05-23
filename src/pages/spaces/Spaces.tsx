

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LocationTile, NavBar } from "../../components"
import "./spaces.scss";
import { useApiService } from "../../contexts/ApiServiceContext";
import { useEffect, useState } from "react";
import { Space } from "../location-details/LocationDetails";
import { Location } from "../locations/Locations";
import { LoadingOverlay } from "../../components/overlays/loading-overlay/LoadingOverlay";

export const Spaces: React.FC = () => {

    const navigate = useNavigate();
    const apiService = useApiService();
    let { id } = useParams();
    let location = useLocation();

    const [loaded, setLoaded] = useState(false);
    const [locationData, setLocationData] = useState<Location | null>(null);
    const [spaces, setSpaces] = useState<Space[] | null>(null);
    const [path, setPath] = useState("");
    const [spaceImages, setSpaceImages] = useState<{ [key: string]: string | null }>({})


    function stringToArrayBuffer(str: string): ArrayBuffer {
        const encoder = new TextEncoder();
        const encodedArray = encoder.encode(str);
        return encodedArray.buffer;
    }

    const convertPhotoToImageSrc = (photo: string | null): string | null => {
        if (photo) {
            const blob = arrayBufferToBase64(photo);
            return URL.createObjectURL(blob);
        }
        return null;
    };

    const base64ToBlob = (base64: string, type: string): Blob => {
        const binary = window.atob(base64);
        const len = binary.length;
        const buffer = new ArrayBuffer(len);
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return new Blob([buffer], { type });
    };

    const arrayBufferToBase64 = (photo_bytes: string): Blob => {
        let binary = '';
        const buffer = stringToArrayBuffer(photo_bytes);
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return base64ToBlob(photo_bytes, 'image/jpeg')
    };

    useEffect(() => {
        setPath(location.pathname);

        if (id) {
            const convertedId = parseInt(id);
            apiService.get_location_by_id(convertedId)
                .then((location) => {
                    setLocationData(location.data["Location"])
                    return apiService.get_spaces_by_location(convertedId)
                })
                .then((spacesData) => {

                    const spacesObjects = spacesData.data["Spaces"]

                    spacesObjects.forEach((space: Space) => {
                        if (space.photo) {
                            spaceImages[space.id] = convertPhotoToImageSrc(space.photo);
                        }
                    })
                    setSpaces(spacesObjects)
                    setLoaded(true)

                })

        }


    }, [apiService])

    return (
        <>
            <NavBar />
            {!loaded ? (
                <LoadingOverlay />
            ) : (
                <section className="ss-spaces fade-in">
                    <div className="ss-spaces__title">
                        {locationData?.locationName.toUpperCase()} - {locationData?.city.toUpperCase()} - SPACES

                    </div>
                    <div className="ss-space__spaces">
                        {
                            spaces?.map((space, i) => {

                                return <LocationTile
                                    key={i}
                                    title={space.name}
                                    url={""}//{`${path}/${space.id}`} when we want to add the
                                    imgUrl={spaceImages[space.id] || ''}
                                />
                            })
                        }
                    </div>

                </section>)}
        </>
    )
}