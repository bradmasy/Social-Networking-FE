import { useEffect, useState } from "react";
import { Form, Input } from "../../Form";
import { ApplyOverlay, Option } from "../../../../components";
import { ButtonProps } from "../../../button/Button";
import { useApiService } from "../../../../contexts/ApiServiceContext";
import { Location, Space } from "../../../../pages/location-details/LocationDetails";

import "../edit-form.scss";
import { ValidationService } from "../../../../services";
import { LoadingOverlay } from "../../../overlays/loading-overlay/LoadingOverlay";


export const BookingEditForm: React.FC = () => {

    const apiService = useApiService();
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [bookingData, setBookingData] = useState<{ [key: string]: string | { [key: string]: string } }>()
    const [location, setLocation] = useState<Location>();
    const [space, setSpace] = useState<Space>();
    const [startTimeOptions, setStartTimeOptions] = useState<Option[]>();
    const [endHourBlockOptions, setEndHourBlockOptions] = useState<Option[]>();
    const [startTimeMinOptions, setStartTimeMinuteOptions] = useState<Option[]>();
    const [endTimeMinOptions, setEndTimeMinOptions] = useState<Option[]>();
    const [endHour, setEndHour] = useState("");
    const [startHour, setStartHour] = useState("");
    const [sendForm, setSendForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bookingId, setBookingId] = useState("");
    // states for apply overlay
    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [errorMessage, setErrorMessage] = useState(<><div>ERROR</div></>)
    const [successMessage, setSuccessMessage] = useState(<><div>BOOKING UPDATED</div></>)
    const searchParams = new URLSearchParams(window.location.search);

    const bookingInputs: Input[] = [
        {
            name: 'location',
            type: 'text',
            label: 'LOCATION',
            value: location?.locationName,
            // options: [{ 'default': true, value: location?.locationName.toString() || '', label: location?.locationName || '' }],
            disabled: true
        },
        {
            name: 'space',
            type: 'text',
            label: 'SPACE',
            value: space?.name,
            disabled: true

        },
        {
            name: 'start-time-hour',
            type: 'select',
            label: 'START TIME - HOUR BLOCK',
            value: startTimeOptions?.find((s) => s.default)?.value,
            options: startTimeOptions
        },
        {
            name: 'start-time-minutes',
            type: 'select',
            label: 'START TIME - MINUTES',
            value: startTimeMinOptions?.find((s) => s.default)?.value,
            options: startTimeMinOptions

        }, {
            name: 'end-time-hour',
            type: 'select',
            label: 'END TIME - HOUR BLOCK',
            value: endHourBlockOptions?.find((s) => s.default)?.value,
            options: endHourBlockOptions
        },
        {
            name: 'end-time-minutes',
            type: 'select',
            label: 'END TIME - HOUR MINUTES',
            value: endTimeMinOptions?.find((s) => s.default)?.value,
            options: endTimeMinOptions
        },

    ];

    useEffect(() => {
        if (sendForm) {
            const initialData = initialFormData();
            console.log(initialData)
            setFormData(initialData)
        }
    }, [sendForm])

    useEffect(() => {
        const bookingIdParam = searchParams.get("id")
        console.log(bookingIdParam)
        setBookingId(bookingIdParam || "");
        if (bookingIdParam) {
            apiService.get_booking_by_id(bookingIdParam)
                .then((booking) => {

                    const editBooking = booking.data["Bookings"]

                    setBookingData(editBooking);
                    setLocation(editBooking.location);
                    setSpace(editBooking.space);

                    const splitStartTime = editBooking.startTime.split(":")
                    const splitEndTime = editBooking.endTime.split(":")

                    const pmOrAmAStart = splitStartTime[1].split(' ')[1];
                    const pmOrAmAEnd = splitEndTime[1].split(' ')[1];
                    console.log(splitEndTime[0])
                    const startTimeHour = pmOrAmAStart === "AM" ? splitStartTime[0] : splitStartTime[0] === '12' ? splitStartTime[0] : parseInt(splitStartTime[0]) + 12
                    const endTimeHour = pmOrAmAEnd === "AM" ? splitEndTime[0] : splitEndTime[0] === '12' ? splitEndTime[0] : parseInt(splitEndTime[0]) + 12
                    console.log(endHour)
                    const startTimeMins = splitStartTime[1].split(' ')[0] === '00' ? "030" : "3060";
                    const endTimeMins = splitEndTime[1].split(' ')[0] === '00' ? "030" : "3060";;

                    console.log(startTimeMins)
                    console.log(endTimeMins)

                    setStartHour(startTimeHour)
                    setEndHour(endTimeHour)
                    console.log(endTimeHour)
                    const startHourBlocks = createTimeHourBlocks(23, parseInt(startTimeHour), true);
                    const endHourBlocks = createTimeHourBlocks(23, parseInt(endTimeHour), false);

                    const startTimeMinBlocks = createTimeMinBlocks(startTimeMins);
                    const endTimeMinBlocks = createTimeMinBlocks(endTimeMins);

                    console.log(startTimeMinBlocks);
                    console.log(endTimeMinBlocks);

                    setStartTimeOptions(startHourBlocks)
                    setEndHourBlockOptions(endHourBlocks)
                    setStartTimeMinuteOptions(startTimeMinBlocks)
                    setEndTimeMinOptions(endTimeMinBlocks)

                    console.log(editBooking)
                    setSendForm(true);


                })
        }

    }, [])

    const createTimeHourBlocks = (endTime: number, startTime: number, start: boolean = true): Option[] => {
        return start ? Array.from({ length: endTime - startTime + 1 }, (_, index) => {

            const hour = startTime + index;
            const period = hour < 12 ? 'AM' : 'PM';
            const formattedTime = hour % 12 === 0 ? 12 : hour % 12;
            return {
                value: hour.toString(),
                label: `${formattedTime} ${period}`,
                default: index === 0

            }
        }) : Array.from({ length: 23 - 8 }, (_, index) => {
            console.log(endTime)
            // start = 3 or 15
            // end = 23
            // hour ==  15 + 0
            const hour = 9 + index;
            const period = hour < 12 ? 'AM' : 'PM';
            const formattedTime = hour % 12 === 0 ? 12 : hour % 12;
            console.log(`start time: ${startTime} hour:${hour} ${hour === startTime}`)
            console.log({
                value: hour.toString(),
                label: `${formattedTime} ${period}`,
                default: hour === startTime

            })
            return {
                value: hour.toString(),
                label: `${formattedTime} ${period}`,
                default: hour === startTime

            }
        })
    };

    const createTimeMinBlocks = (timeMins: string) => {
        const splitMins = timeMins.length === 4 ? [timeMins.slice(0, 2), timeMins.slice(2)]
            : [timeMins.slice(0, 1), timeMins.slice(1)];

        console.log(splitMins)
        return Array.from({ length: 2 }, (_, i) => {
            const value = i === 0 ? splitMins[0] : splitMins[1];

            return {
                value: value,
                label: value,
                default: value === splitMins[0]
            }
        })
    };

    const editBookingCopy = (
        <>
            <div>
                EDIT BOOKING INFORMATION
            </div>
        </>
    )

    const buttonProps: ButtonProps = {
        text: "SUBMIT",
        type: "button",
    }

    const submit = () => {
        const startHour = formData["start-time-hour"];
        const startMin = formData["start-time-minutes"];
        const endHour = formData["end-time-hour"];
        const endMin = formData["end-time-minutes"];


        if (ValidationService.validateTimes(startHour, startMin, endHour, endMin)) {
            console.log('times pass')
            setLoading(true);
            apiService.edit_booking(formData, bookingId)
            setLoading(false);
            setDisplayOverlay(true)

        } else {
            // key error 
            setErrorMessage(<>
                <div>
                    START TIME CANNOT BE LESS
                </div>
                <div>
                    OR EQUAL TO THE END TIME
                </div>
                <div>
                    BLOCKS MUST BE A MIN OF 1 HOUR
                </div>
            </>)
            setErrorDisplay(true);
            console.log("BAD TIMES")
        }
        console.log(formData);
        // check the start time is greater than an hour and is not less than the end time

    }

    const initialFormData = (): { [key: string]: string } => {
        return bookingInputs.reduce((acc: { [key: string]: string }, input: Input) => {
            console.log(input)
            acc[input.name] = input.value || "";
            return acc;
        }, {});
    };

    return (
        <>
            {
                loading ? (
                    <>
                        <LoadingOverlay />
                    </>
                )
                    : (<>
                        <ApplyOverlay
                            display={displayOverlay}
                            setDisplay={setDisplayOverlay}
                            setErrorDisplay={setErrorDisplay}
                            errorDisplay={errorDisplay}
                            errorMessage={errorMessage}
                            successMessage={successMessage}
                        />
                        <main className="ss-edit-container__main">
                            {editBookingCopy}
                        </main>
                        <Form
                            formDataDictionary={formData}
                            buttonProps={buttonProps}
                            sendFormData={setFormData}
                            setSubmitClicked={submit}
                            formInputs={bookingInputs} />
                    </>)
            }

        </>
    )
}