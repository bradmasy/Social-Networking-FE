import React, { useEffect, useState } from "react";
import { Header, LocationTile, NavBar } from "../../components";
import { useApiService } from "../../contexts/ApiServiceContext";

import londonImage from "../../assets/images/London.png";
import portStanleyImage from "../../assets/images/PortStanley.png"; 
import comingSoon from "../../assets/images/coming-soon.jpg";

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
                    let redirectUrl;

                    switch (location.city.toLowerCase()) {
                        case "london":
                            imageSrc = londonImage;
                            redirectUrl =`/locations/${location.id}`
                            break;
                        case "port stanley":
                            imageSrc = portStanleyImage;
                            redirectUrl =`/locations/${location.id}`
                            break;
                        default:
                            imageSrc = comingSoon;
                            redirectUrl ="/coming-soon";
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
                            url={redirectUrl}
                        />
                    );
                })}
            </section>
        </>
    );
};

