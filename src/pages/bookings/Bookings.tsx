import { Scheduler } from "@bitnoi.se/react-scheduler"
import { Calendar, NavBar } from "../../components"

import "./bookings.scss"

export const Bookings:React.FC = () => {
    return(
    <>
    <NavBar/>
    <section className="ss-bookings">
        <Calendar/>
        {/* <SSScheduler/> */}
    </section>
    </>)
}