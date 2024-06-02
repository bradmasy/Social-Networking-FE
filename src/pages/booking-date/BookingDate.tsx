import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Dates } from './dates';
import { ApiService } from '../../services/api/ApiService';
import { NavBar } from '../../components';

import "./booking-date.scss";
import { LoadingOverlay } from '../../components/overlays/loading-overlay/LoadingOverlay';
import { Location, Space } from '../location-details/LocationDetails';

const TIME_BLOCK_MINS = 30;
const MINUTES_IN_BLOCK = 60;
const HOURS_IN_DAY = 15;
const START_TIME = 9;


export interface Booking {
    id: number;
    date: Date;
    location: number | Location;
    space: number | Space;
    startTime: string;
    endTime: string;
    userId: number;
}
export const BookingDate: React.FC = () => {


    const apiService = new ApiService();
    const dates = new Dates();
    const location = useLocation();
    const navigate = useNavigate();

    const { locationId } = useParams();
    const [path, setPath] = useState('');
    const [searchParams, setSearchParams] = useState('');
    const [spaces, setSpaces] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [bookingsForCurrentDate, setBookingsForCurrentDate] = useState<Booking[]>([]);
    const [spaceNodes, setSpaceNodes] = useState<NodeListOf<ChildNode>>();
    const [clickHandlerActive, setClickHandlerActive] = useState<{ [key: string]: boolean }>({})
    const [month, setMonth] = useState<string | null>(null);
    const [day, setDay] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const hourBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
    const spaceBlocksRef = useRef<Record<string, HTMLDivElement | null>>({});
    const spaceTimeBlocksRef = useRef<Record<string, HTMLDivElement>>({});

    let { id } = useParams();

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };

    // Get the formatted date string
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    const findDOMReferences = (timeSlots: string[]): HTMLDivElement[] => {
        if (hourBlocksRef.current) {
            return hourBlocksRef.current.filter(hourBlock => {
                if (hourBlock?.id) {
                    return timeSlots.includes(hourBlock.id);
                }
                return false;
            }) as HTMLDivElement[];
        }
        return [];
    };


    const createBlockReferences = (refs: React.MutableRefObject<Record<string, HTMLDivElement>>) => {
        bookingsForCurrentDate.forEach(booking => {
            const bookingSpaceId = (booking.space as Space).id;
            const bookingStartTimeArray = getBookingTimeHourAndMinutes(booking.startTime);
            const bookingEndTimeArray = getBookingTimeHourAndMinutes(booking.endTime);
            const blockIdStringsArray = getBlockIdStrings(bookingStartTimeArray[0], bookingEndTimeArray[0]);
            

            const startingBlockQueryString = `hour-${bookingStartTimeArray[0]}-space-${bookingSpaceId}-time-block-${bookingStartTimeArray[1] === '30' ? 30 : 0}-${bookingStartTimeArray[1] === '30' ? 60 : 30}`
            const endBlockQueryString = `hour-${bookingEndTimeArray[0]}-space-${bookingSpaceId}-time-block-${bookingEndTimeArray[1] === '30' ? 30 : 0}-${bookingEndTimeArray[1] === '30' ? 60 : 30}`

            const keys = Object.keys(refs.current)
            const amountOfspaceTimeBlocks = keys.length;

            const elementsBetweenStartAndEnd = [];

            let isBetweenStartAndEnd = false;

            let i = 0;
            let gatherBlocks = false;


            while (i < keys.length) {
                const key = keys[i];
                const splitKey = key.split('-');
                const hour = splitKey[1];
                const space = splitKey[3];


                if (key === startingBlockQueryString) {
                    gatherBlocks = true;

                    elementsBetweenStartAndEnd.push(refs.current[key]) // push the element
                }
                // end the loop
                if (key === endBlockQueryString) {
                  //  elementsBetweenStartAndEnd.push(refs.current[key]) // push the element
                    break;
                }

                if (gatherBlocks && space === bookingSpaceId.toString()) {
                    elementsBetweenStartAndEnd.push(refs.current[key]) // push the element

                }


                i++;
            }


            elementsBetweenStartAndEnd.forEach((bookedElement) => {
                bookedElement.style.backgroundColor = '#50B2CA';
                bookedElement.classList.add("booked")
                //  setClickHandlerActive(prevState => ({
                //     ...prevState,
                //     [bookedElement.id]: false
                // }));
                clickHandlerActive[bookedElement.id] = false;
            })
        })
    }

    const shadeSpaces = (spaceNodes: ChildNode[]) => {
        spaceNodes.forEach((node: ChildNode) => {
            const spaceNodeDiv = node as HTMLDivElement;
        })

    }

    useEffect(() => {
        if (spaceNodes && spaceNodes.length > 0) {
            const mappedNodes: ChildNode[] = []
            spaceNodes.forEach(e => mappedNodes.push(e));
            shadeSpaces(mappedNodes);
        }
        setLoading(true);

    }, [spaceNodes])

    useLayoutEffect(() => {
        if (bookingsForCurrentDate.length > 0 && Object.keys(spaceTimeBlocksRef.current).length > 0) {
            createBlockReferences(spaceTimeBlocksRef);
        }
    })

    useEffect(() => {
        if (month != null && day != null && year != null) {
            setCurrentDate(dates.getFullDate(month, day, year));

            apiService.get_bookings_by_date(month, day, year).then(apiData => {
                const bookings: Booking[] = apiData.data["Bookings"]
                setBookingsForCurrentDate(bookings);
            })
        }
    }, [month, day, year])

    useEffect(() => {

        setPath(location.pathname);
        setSearchParams(location.search);

        if (id) {
            apiService.get_spaces_by_location(parseInt(id))
                .then(spaces => {
                    setSpaces(spaces.data['Spaces']);
                });

            const queryParams = new URLSearchParams(location.search);

            setMonth(queryParams.get('month') || null);
            setDay(queryParams.get('day') || null);
            setYear(queryParams.get('year') || null);

        }
    }, []);

    const getBookingTimeHourAndMinutes = (bookingTimeString: string) => {
        const bookingTimeHourMinute = bookingTimeString.split(":");
        const splitTimeHourMinute = bookingTimeHourMinute[1].split(' ');
        const timeMinute = splitTimeHourMinute[0];
        const amPM = splitTimeHourMinute[1];
        const timeHour = amPM === "PM" ? (parseInt(bookingTimeHourMinute[0]) + 12).toString() : bookingTimeHourMinute[0];

        return [timeHour, timeMinute.toString()];
    };

    const getBlockIdStrings = (startHour: string, endHour: string) => {
        const start = parseInt(startHour);
        const end = parseInt(endHour);

        if (start === end) {
            return [`time-block-${start}`];
        }

        // if start is greater than the end time, this is a time slot that spans the morning to the afternoon/night
        // this adds an extra block BEFORE and AFTER the time slot to allow for teardown/cleanup
        const range = start > end
            ? Array.from({ length: end + 13 - start + 1 }, (_, index) => start - 1 + index)
            : Array.from({ length: end - start + 1 }, (_, index) => start + index);


        const blockIdStringsMap = range.map(hour => `time-block-${hour}`);

        return blockIdStringsMap;
    };


    const bookTime = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, hourBlock: number, space: number) => {
        const id = (event.target as HTMLDivElement).id;

        const blockId = (event.target as HTMLDivElement).id;
        const timeBlock = blockId.split('-');

        const url = path.slice(0, -4);

        navigate(`${url}detail${searchParams}&space=${space}&block=${hourBlock}&time=${timeBlock[timeBlock.length -2] + timeBlock[timeBlock.length-1]}`)
    };

    return (
        <>
            <NavBar />
            {!loading ? (<>
                <LoadingOverlay />
            </>) : (<>

                <main className="ss-booking-date__main fade-in">
                    <div className="ss-booking-date__main__title">
                        {formattedDate}
                    </div>

                    <div className="ss-booking-date__main__time-table-container">
                        <div className="ss-booking-date__main__spaces-title">
                            <div className="ss-booking-date__main__spaces-title__container">
                                <div className="ss-booking-date__main__spaces-title__container__spacing"></div>
                                {spaces.map(space => (
                                    <div
                                        key={space["id"]}
                                        className="ss-booking-date__main__spaces-title__title"
                                        style={{ width: `${100 / spaces.length}%` }}
                                    >
                                        {space["name"]}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {Array.from({ length: HOURS_IN_DAY }, (_, index) => index + START_TIME).map(hour => (
                            <div
                                key={hour}
                                className="ss-booking-date__main__time-block"
                                id={`time-block-${hour}`}
                                ref={ref => {
                                    if (ref) {
                                        hourBlocksRef.current[hour] = ref;
                                    }
                                }}                            >
                                <div className="ss-booking-date__main__time-block__hour">
                                    {hour === 0 || hour === 12 ? 12 : hour % 12}
                                    {hour < 12 ? "AM" : "PM"}
                                </div>
                                <div className="ss-booking-date__main__time-block__schedule">
                                    {spaces.map(space => (
                                        <div
                                            key={space["id"]}
                                            id={`space-${space["id"]}`}
                                            className="ss-booking-date__main__time-block__space"
                                            ref={ref => {
                                                if (ref) {
                                                    spaceBlocksRef.current[`time-block-${hour}-space-${space["id"]}`] = ref
                                                }
                                            }}
                                            style={{ width: `${100 / spaces.length}%` }}
                                        >
                                            {Array.from({ length: MINUTES_IN_BLOCK / TIME_BLOCK_MINS }, (_, blockIndex) => blockIndex * 30).map(block => {

                                                clickHandlerActive[`hour-${hour}-space-${space["id"]}-time-block-${block}-${block + 30}`] = true; //setting everyone to true

                                                return (
                                                    <div
                                                        key={`${hour}-${block}`}
                                                        id={`hour-${hour}-space-${space["id"]}-time-block-${block}-${block + 30}`}
                                                        className="ss-booking-date__main__time-block__schedule__block"
                                                        onClick={!clickHandlerActive[`hour-${hour}-space-${space["id"]}-time-block-${block}-${block + 30}`] ? undefined : (event) => bookTime(event, hour, space["id"])}
                                                        ref={ref => {
                                                            if (ref) {
                                                                spaceTimeBlocksRef.current[`hour-${hour}-space-${space["id"]}-time-block-${block}-${block + 30}`] = ref
                                                            }
                                                        }}
                                                    ></div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </>
            )
            }

        </>
    );
};

