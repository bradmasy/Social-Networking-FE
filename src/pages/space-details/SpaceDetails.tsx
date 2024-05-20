import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../../components"
import { useApiService } from "../../contexts/ApiServiceContext";
import { useEffect, useState } from "react";
import { Space } from "../location-details/LocationDetails";


export const SpaceDetails:React.FC =() => {
    const navigate = useNavigate();
    const apiService = useApiService();
    let {space} = useParams();

    const [spaceInfo,setSpaceInfo] = useState<Space | null>(null);

    useEffect( () => {
        console.log(space)
        if(space){
            apiService.get_space_by_id(space)
            .then((space) => {
                console.log(space.data["data"])
                setSpaceInfo(space.data["data"])
            })
            
        }
    },[apiService])

    return (
        <>
        <NavBar/>

        <section className="ss-space-details">

        </section>
        </>
    )
}