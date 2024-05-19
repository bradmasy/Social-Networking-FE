import { useEffect, useState } from "react";
import { Header, LocationTile } from "../../components";
import "./locations.scss";
import { useApiService } from "../../contexts/ApiServiceContext";

export interface Location {
    url:string;
}

export const Locations: React.FC = () => {

    const apiService = useApiService();

    const [locations, setLocations] = useState<Location[]>();

    useEffect(() => {

        apiService.get_locations()
            .then((locations) => {
                console.log(locations)
                const ssLocations = locations.data["Locations"]
                setLocations(ssLocations)
            })

    }, [])


 
    return (
        <>
            <Header />
            <section className="ss-locations fade-in">
                {
                    locations?.map((location, i) => (
                        <LocationTile redirect={location.url} />
                    ))
                }
            </section>

        </>
    )
}