
import "./booking-detail.scss";

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useActionData, useLocation, useNavigate } from 'react-router-dom';
import { ApplyOverlay, Button, ButtonProps, Form, Input, NavBar } from "../../components";
import { useApiService } from "../../contexts/ApiServiceContext";
import { Space } from "../../pages/location-details/LocationDetails";
import { Location } from "../locations/Locations";
import { ValidationService } from "../../services";
import { LoadingOverlay } from "../../components/overlays/loading-overlay/LoadingOverlay";
import { Option } from "../../components";
import { FormData } from "../../components";
type TimeType = 'AM' | 'PM';

export interface TimeBlock {
    hour: number;
    minuteBlocks: MinuteBlock[];
    selected?: boolean;
}

export interface HourBlock {
    hour: number;
    time?: TimeType;
    selected: boolean;
}
export interface MinuteBlock {
    start: number;
    end: number;
    selected?: boolean;
}

interface BookingFormData extends FormData {
    space: string;
    start_time_hour: string;
    start_time_minutes: string;
    end_time_hour: string;
    end_time_minutes: string;
}
const END_HOUR = 23; // Always 11pm

export const BookingDetail: React.FC = () => {

    const apiService = useApiService();
    const navigate = useNavigate();

    const [location, setLocation] = useState<Location | null>(null);
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [formData, setFormData] = useState({});
    const [bookingDate, setBookingDate] = useState('');
    const [endTimeMinutes, setEndTimeMinutes] = useState<Option[]>();

    const [locationId, setLocationId] = useState(0);
    const [spaceOptions, setSpaceOptions] = useState<Option[]>([]);
    const [startTimeOptions, setStartTimeOptions] = useState<Option[]>();
    const [startTimeMinuteOptions, setStartTimeMinuteOptions] = useState<Option[]>();
    const [startTime, setStartTime] = useState<number>(0);
    const [loaded, setLoaded] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [endHourBlockOptions, setEndHourBlockOptions] = useState<Option[]>();
    const [displayOverlayError, setDisplayOverlayError] = useState(false);
    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [params, setParams] = useState<{ [key: string]: string }>();

    const [errorMessage, setErrorMessage] = useState(
        <>
            <div>PLEASE FILL OUT</div>
            <div>ALL FIELDS IN</div>
            <div>THE FORM BEFORE</div>
            <div>SUBMITTING</div>
        </>
    )
    const [successMessage, setSuccessMessage] = useState(<><div>BOOKING SUCCESSFUL</div></>)
    const locationRouter = useLocation();

    useEffect(() => {
        getLocationIdFromUrl();
    }, []);

    useEffect(() => {
        if (locationId !== null) {
            fetchSpacesByLocation();
        }
    }, [locationId]);


    useEffect(() => {
        if (spaces.length >= 1) {
            setTimeBlocks();
        }
    }, [spaces, params]);

    useEffect(() => {
        if (dataFetched) {
            setLoaded(true);
            setFormData(initialFormData())
        }

    }, [dataFetched]);

    const setTimeBlocks = () => {
        if (params) {
            const startTimeHour = parseInt(params["block"]);
            const startTimeMins = params["time"]; // 030 or 3060
            const startTimes = createTimeHourBlocks(END_HOUR, startTimeHour);

            setStartTime(startTimeHour);
            setStartTimeOptions(startTimes);
            const startTimeMinOptions = createTimeMinBlocks(startTimeMins);

            setStartTimeMinuteOptions(startTimeMinOptions);

            const endTimeHourBlocks = createTimeHourBlocks(END_HOUR, startTimeHour, false);

            setEndHourBlockOptions(endTimeHourBlocks);

            const endTimeMinOptions = createTimeMinBlocks("030"); // default is always 0 - 30 not 30 - 60

            setEndTimeMinutes(endTimeMinOptions);

            setDataFetched(true);
        }
    };

    const getLocationIdFromUrl = () => {
        const locationString = locationRouter.pathname.search(/location/i);
        const locationId = parseInt(locationRouter.pathname.substring(locationString + 10, locationString + 11));

        apiService.get_location_by_id(locationId)
            .then((location) => {
                const locationData = location.data["Location"]
                setLocation(locationData);
            })

        setLocationId(locationId);
    };

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
        }) : Array.from({ length: endTime - startTime }, (_, index) => {

            const hour = startTime + 1 + index;
            const period = hour < 12 ? 'AM' : 'PM';
            const formattedTime = hour % 12 === 0 ? 12 : hour % 12;
            return {
                value: hour.toString(),
                label: `${formattedTime} ${period}`,
                default: index === 0

            }
        })
    };

    const createTimeMinBlocks = (timeMins: string) => {
        const splitMins = timeMins.length === 4 ? [timeMins.slice(0, 2), timeMins.slice(2)]
            : [timeMins.slice(0, 1), timeMins.slice(1)];

        return Array.from({ length: 2 }, (_, i) => {
            const value = i === 0 ? splitMins[0] : splitMins[1];

            return {
                value: value,
                label: value,
                default: value === splitMins[0]
            }
        })
    };

    const fetchSpacesByLocation = () => {
        const params = new URLSearchParams(locationRouter.search);
        const queryParams = Object.fromEntries(params.entries())

        setParams(queryParams);

        setBookingDate(`${queryParams["month"].toUpperCase()} ${queryParams["day"].toUpperCase()} ${queryParams["year"].toUpperCase()}`)
        apiService.get_spaces_by_location(locationId)
            .then((spaceData) => {

                const spacesByLoc = spaceData.data["Spaces"];
                const spaceOptionsfromSpaces = spacesByLoc.map((space: Space) => {

                    return {
                        value: space.id.toString(),
                        label: space.name,
                        default: queryParams["space"] === space.id.toString()

                    }
                });

                setSpaceOptions(spaceOptionsfromSpaces);
                setSpaces(spacesByLoc);
            })
            .catch(error => {
                console.error('Error fetching spaces:', error);
                setLoaded(true); // Handle loading state if needed
            });
    };

    const submit = () => {


        if (ValidationService.validateForm(formData)) {
            apiService.create_booking(formData)
                .then((booking) => {

                    const bookingIndex = locationRouter.pathname.search(/booking/i);
                    const url = locationRouter.pathname.substring(0, bookingIndex + "booking".length);

                    const bookingId = booking.data["data"];

                    setDisplayOverlay(true)
                    setTimeout(() => {
                        navigate('/user-dashboard')
                    }, 1000)
                })
                .catch((error) => {
                    const errorMessage = error['response']['data']['error']
                    setErrorMessage(<>
                        <div>{errorMessage}</div>

                    </>)
                    setDisplayOverlayError(true);
                })
        } else {
            setErrorMessage(
                <>
                    <div>PLEASE FILL OUT</div>
                    <div>ALL FIELDS IN</div>
                    <div>THE FORM BEFORE</div>
                    <div>SUBMITTING</div>
                </>
            )
            setDisplayOverlayError(true);
        }
    };

    const inputs: Input[] = [
        {
            name: 'location',
            type: 'select',
            label: 'LOCATION',
            value: location?.locationName,
            options: [{ 'default': true, value: location?.locationName.toString() || '', label: location?.locationName || '' }],
            disabled: true
        },
        {
            name: 'space',
            type: 'select',
            label: 'SPACE',
            value: spaceOptions.find((s) => s.default)?.value,
            options: spaceOptions
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
            value: startTimeMinuteOptions?.find((s) => s.default)?.value,
            options: startTimeMinuteOptions

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
            value: endTimeMinutes?.find((s) => s.default)?.value,
            options: endTimeMinutes
        },

    ];

    const buttonProps: ButtonProps = {
        type: "submit",
        text: "BOOK",
    };

    const initialFormData = (): FormData => {
        const initialState =
            inputs.reduce((acc, input: Input) => {
                acc[input.name] = input.value || "";
                return acc;
            }, {} as FormData);

        return {
            ...initialState,
            location: location?.locationName || '',
            date: bookingDate
        };
    };

    return (

        <div>
            <ApplyOverlay
                errorMessage={errorMessage}
                setDisplay={setDisplayOverlay}
                errorDisplay={displayOverlayError}
                display={displayOverlay}
                setErrorDisplay={setDisplayOverlayError}
                successMessage={successMessage} />

            <NavBar />
            {!loaded ? (
                <>
                    <LoadingOverlay />
                </>
            ) : (<>
                <div className="ss-booking-detail__container">
                    {/* <div className="ss-booking-detail__container__title">
                        <div>{location && location.locationName}</div>
                        <div>{bookingDate}</div>
                    </div> */}
                    <div className="ss-booking-detail__container__form">
                        <Form text={<><div>{location && location.locationName}</div><div>{bookingDate}</div></>} formDataDictionary={formData} setSubmitClicked={submit} formInputs={inputs} buttonProps={buttonProps} sendFormData={setFormData} />
                    </div>
                </div>
            </>)}

        </div>
    );
};
