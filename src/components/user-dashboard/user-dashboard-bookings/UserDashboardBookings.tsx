import { useNavigate } from "react-router-dom";
import { Booking } from "../../../pages/booking-date/BookingDate";
import { Button } from "../../button/Button";
import "./user-dashboard-bookings.scss";
import { ConfirmationDialog } from "../../dialogs/confirmation-dialog/ConfirmationDialog";
import { useEffect, useState } from "react";
import { useApiService } from "../../../contexts/ApiServiceContext";
import { LoadingOverlay } from "../../overlays/loading-overlay/LoadingOverlay";
import { ApplyOverlay } from "../../overlays";

export interface UserDashboardBookingProps {
    bookings: Booking[];
    spaceMaps: { [key: string]: string }
    locationMaps: { [key: string]: string }
}

export const UserDashboardBookings: React.FC<UserDashboardBookingProps> = (props) => {
    const navigate = useNavigate();
    const apiService = useApiService();

    const [displayDialog, setDisplayDialog] = useState(false);
    const [bookingId, setBookingId] = useState<number | null>(null);
    const [deleteBooking, setDeleteBooking] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState<Booking[]>(props.bookings);

    // overlay for booking confirmation
    const [displayOverlay, setDisplayOveraly] = useState(false);
    const [successMessage, setSuccessMessage] = useState(<><div>BOOKING SUCCESSFUL</div></>)
    const [errorMessage,setErrorMessage] = useState(<><div>ERROR MAKING BOOKING</div></>)
    const [errorDisplay,setErrorDisplay] = useState(false);
    
    const navigateToEditPage = (id: number) => {
        navigate(`/edit?type=booking&id=${id}`)
    }

    const deleteUserBooking = (id: number) => {
        setBookingId(id);
        setDisplayDialog(true);
    }

    useEffect(() => {
        if (deleteBooking && bookingId !== null) {
            setLoading(true);
            apiService.delete_booking_by_id(bookingId)
                .then((message) => {
                    setBookings(prevBookings => prevBookings.filter((booking) => booking.id !== bookingId));
                    setLoading(false);
                    setDeleteBooking(false);
                    setBookingId(null);
                })
                .catch(() => {
                    setLoading(false);
                    setDeleteBooking(false);
                });
        }
    }, [deleteBooking, bookingId]);

    const dialogProps = {
        title: "DELETE BOOKING?",
        message: "ARE YOU SURE YOU WANT TO DELETE YOUR BOOKING?",
    }

    return (
        <>
            {loading ? (
                <LoadingOverlay />
            ) : (
                <>
                   

                    <ConfirmationDialog 
                        setDelete={setDeleteBooking} 
                        bookingInfo={bookingId} 
                        display={displayDialog} 
                        setDisplay={setDisplayDialog} 
                        {...dialogProps} 
                    />
                    <section className="ss-user-dashboard-bookings">
                        <div className="ss-user-dashboard-bookings__container">
                            <div className="ss-user-dashboard-bookings__container__labels">
                                <div className="ss-user-dashboard-bookings__container__labels__label">
                                    <p>LOCATION</p>
                                </div>
                                <div className="ss-user-dashboard-bookings__container__labels__label">
                                    <p>SPACE</p>
                                </div>
                                <div className="ss-user-dashboard-bookings__container__labels__label">
                                    <p>DATE</p>
                                </div>
                                <div className="ss-user-dashboard-bookings__container__labels__label">
                                    <p>START TIME</p>
                                </div>
                                <div className="ss-user-dashboard-bookings__container__labels__label">
                                    <p>END TIME</p>
                                </div>
                                <div className="ss-user-dashboard-bookings__container__labels__label">
                                    <p>EDIT</p>
                                </div>
                                <div className="ss-user-dashboard-bookings__container__labels__label">
                                    <p>DELETE</p>
                                </div>
                            </div>
                            <div className="ss-user-dashboard-bookings__container__booking-data">
                                {bookings.map((booking: Booking, index: number) => (
                                    <div className="ss-user-dashboard-bookings__container__booking-data__row" key={`booking-${index}-${booking.id}`}>
                                        <div className="ss-user-dashboard-bookings__container__booking-data__row__value" key={`booking-location-${index}-${booking.id}`}>
                                            {props.locationMaps[`${booking.location}`]}
                                        </div>
                                        <div className="ss-user-dashboard-bookings__container__booking-data__row__value" key={`booking-space-${index}-${booking.id}`}>
                                            {props.spaceMaps[`${booking.space}`]}
                                        </div>
                                        <div className="ss-user-dashboard-bookings__container__booking-data__row__value" key={`booking-date-${index}-${booking.id}`}>
                                            {booking.date.toString()}
                                        </div>
                                        <div className="ss-user-dashboard-bookings__container__booking-data__row__value" key={`booking-start-time-${index}-${booking.id}`}>
                                            {booking.startTime}
                                        </div>
                                        <div className="ss-user-dashboard-bookings__container__booking-data__row__value" key={`booking-end-time-${index}-${booking.id}`}>
                                            {booking.endTime}
                                        </div>
                                        <div className="ss-user-dashboard-bookings__container__booking-data__row__value" key={`booking-buttons-${index}-${booking.id}`}>
                                            <Button type="button" text="EDIT" click={() => {
                                                navigateToEditPage(booking.id);
                                            }} key={`booking-edit-${index}-${booking.id}`} />
                                        </div>
                                        <div className="ss-user-dashboard-bookings__container__booking-data__row__value">
                                            <Button type="button" text="DELETE" click={() => {
                                                deleteUserBooking(booking.id);
                                            }} key={`booking-delete-${index}-${booking.id}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    )
}
