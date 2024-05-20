import React, { useEffect, useState } from "react";
import { Header, LocationTile, NavBar } from "../../components";
import { useApiService } from "../../contexts/ApiServiceContext";
import londonImage from "../../assets/images/London.png";
import portStanleyImage from "../../assets/images/PortStanley.png";

import "./locations.scss";

export interface Location {
    url: string;
    locationName: string;
    city: string;
    id: number;
    country: string;
    address: string;
    imgUrl?: string;
}

export const Locations: React.FC = () => {
    const apiService = useApiService();
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        apiService.get_locations()
            .then((locations) => {
                const ssLocations: Location[] = locations.data["Locations"];
                setLocations(ssLocations);
            })
            .catch((error) => {
                console.error("Error fetching locations:", error);
            });
    }, []);

    return (
        <>
            <NavBar />
            <section className="ss-locations fade-in">
                {locations.map((location) => {

                    let imageSrc;

                    switch (location.city.toLowerCase()) {
                        case "london":
                            imageSrc = londonImage;
                            break;
                        case "port stanley":
                            imageSrc = portStanleyImage;
                            break;
                        default:
                            imageSrc = "";
                            break;
                    }
                    return (
                        <LocationTile
                            key={location.id}
                            redirect=""
                            title={location.locationName}
                            location={location.city}
                            imgUrl={imageSrc}
                            id={location.id}
                            url="./"
                        />
                    );
                })}
            </section>
        </>
    );
};

