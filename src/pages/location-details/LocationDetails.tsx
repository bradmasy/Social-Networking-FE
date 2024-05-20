
import { useEffect, useState } from "react";
import { LocationTile, NavBar } from "../../components";
import { useApiService } from "../../contexts/ApiServiceContext";
import { useParams } from "react-router-dom";

import events from "../../assets/images/events.jpg";
import office from "../../assets/images/office.jpg";
import booking from "../../assets/images/bookings.jpg";

import "./location-details.scss";

export interface Space {
    id: number;
    name: string;
    location: number;
    selected?: boolean;
}

export interface Location {
    id: number;
    city: string;
    country: string;
    address: string;
    locationName: string;
}

export const LocationDetails: React.FC = () => {
    const apiService = useApiService();

    let { id } = useParams();
    const [location, setLocation] = useState<Location | null>(null); // Provide a type or null

    useEffect(() => {
        if (id) {
            const convertedId = parseInt(id);
            apiService.get_location_by_id(convertedId)
                .then((location) => {
                    setLocation(location.data["Location"])
                })
        }
    }, [apiService])

    return (
        <>
            <NavBar />

            <section className="ss-location-details">
                <div className="ss-location-details__location-name">
                    {location?.locationName} - {location?.city}
                </div>
                <div className="ss-location-details__tiles">
                    <LocationTile url={`/locations/${id}/spaces`} imgUrl={office} title="SPACES" />
                    <LocationTile url={`/locations/${id}/events`} imgUrl={events} title="EVENTS" />
                    <LocationTile url={`/locations/${id}/bookings`} imgUrl={booking} title="BOOKINGS" />

                </div>

            </section>
        </>
    )
}