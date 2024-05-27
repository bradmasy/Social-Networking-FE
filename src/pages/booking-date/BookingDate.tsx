import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Dates } from './dates';
import { ApiService } from '../../services/api/ApiService';
import { NavBar } from '../../components';

import "./booking-date.scss";
import { LoadingOverlay } from '../../components/overlays/loading-overlay/LoadingOverlay';

const TIME_BLOCK_MINS = 30;
const MINUTES_IN_BLOCK = 60;
const HOURS_IN_DAY = 15;
const START_TIME = 9;

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
    const hourBlocksRef = useRef([]);
    const [loading, setLoading] = useState(false);

    let { id } = useParams();

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };

    // Get the formatted date string
    const formattedDate = currentDate.toLocaleDateString('en-US', options);


    useEffect(() => {

        setPath(location.pathname);
        setSearchParams(location.search);

        if (id) {
            apiService.get_spaces_by_location(parseInt(id))
                .then(spaces => {
                    setSpaces(spaces.data['Spaces']);
                });

            const queryParams = new URLSearchParams(location.search);

            const month = queryParams.get('month') || '';
            const day = queryParams.get('day') || '';
            const year = queryParams.get('year') || '';

            setCurrentDate(dates.getFullDate(month, day, year));
            setLoading(true);
            //     if (month && day && year) {
            //       apiService.getBookingsByDate(month, day, year).then(apiData => {
            //         const bookings = apiData["Bookings"];

            //         bookings.forEach(booking => {
            //           const bookingSpaceId = booking.space;
            //           const bookingStartTimeArray = getBookingTimeHourAndMinutes(booking.startTime);
            //           const bookingEndTimeArray = getBookingTimeHourAndMinutes(booking.endTime);
            //           const blockIdStringsArray = getBlockIdStrings(bookingStartTimeArray[0], bookingEndTimeArray[0]);

            //           blockIdStringsArray.forEach(timeBlockIdString => {
            //             const queriedBlocks = hourBlocksRef.current.filter(block => block.id === timeBlockIdString);

            //             queriedBlocks.forEach(queriedBlock => {
            //               const timeframe = queriedBlock.children[1];
            //               const spaceColumn = Array.from(timeframe.children).find(node => node.id === `space-${bookingSpaceId}`);

            //               if (spaceColumn) {
            //                 const element = spaceColumn;

            //                 const blockNumberId = parseInt(timeBlockIdString.split('-')[2]);
            //                 Array.from(element.children).forEach(node => {
            //                   if (node.nodeType !== Node.COMMENT_NODE) {
            //                     shadeBookedArea(
            //                       blockNumberId,
            //                       parseInt(bookingStartTimeArray[0]),
            //                       parseInt(bookingStartTimeArray[1]),
            //                       parseInt(bookingEndTimeArray[0]),
            //                       parseInt(bookingEndTimeArray[1]),
            //                       element
            //                     );
            //                   }
            //                 });
            //               }
            //             });
            //           });
            //         });
            //       }).catch(error => {
            //         console.error(error);
            //       });
            //     }
        }
    }, []);

    //   const getBookingTimeHourAndMinutes = (bookingTimeString) => {
    //     const bookingTimeHourMinute = bookingTimeString.split(":");
    //     const splitTimeHourMinute = bookingTimeHourMinute[1].split(' ');
    //     const timeMinute = splitTimeHourMinute[0];
    //     const amPM = splitTimeHourMinute[1];
    //     const timeHour = amPM === "PM" ? (parseInt(bookingTimeHourMinute[0]) + 12).toString() : bookingTimeHourMinute[0];

    //     return [timeHour, timeMinute.toString()];
    //   };

    //   const getBlockIdStrings = (startHour, endHour) => {
    //     const start = parseInt(startHour);
    //     const end = parseInt(endHour);

    //     if (start == end) {
    //       return [`time-block-${start}`];
    //     }

    //     const range = start > end ? Array.from({ length: end + 13 - start }, (_, index) => start + index) : Array.from({ length: end - start + 1 }, (_, index) => start + index);
    //     const blockIdStringsMap = range.map(hour => `time-block-${hour}`);

    //     return blockIdStringsMap;
    //   };

    //   const shadeBookedArea = (blockNumber, startHours, startMins, endHours, endMins, element) => {
    //     element.childNodes.forEach(timeBlock => {
    //       if (timeBlock.nodeType !== Node.COMMENT_NODE) {
    //         const timeBlockHTML = timeBlock;
    //         const splitTimeBlockId = timeBlockHTML.id.split("-");
    //         const blockStartTime = splitTimeBlockId[2];
    //         const blockEndTime = splitTimeBlockId[3];

    //         const bookingStartTime = convertToTime(startHours, startMins);
    //         const bookingEndTime = convertToTime(endHours, endMins);
    //         const startblockTime = convertToTime(blockNumber, parseInt(blockStartTime));
    //         const endBlockTime = convertToTime(blockNumber, parseInt(blockEndTime));

    //         if (startblockTime >= bookingStartTime && endBlockTime <= bookingEndTime) {
    //           timeBlockHTML.style.backgroundColor = '#50B2CA';
    //           element.style.opacity = "0.2";
    //         }
    //       }
    //     });
    //   };

    //   const convertToTime = (start, end) => {
    //     const time = new Date();
    //     time.setHours(start);
    //     time.setMinutes(end);
    //     return time;
    //   };

    //   const isCurrentTime = block => {
    //     const currentHour = new Date().getHours();
    //     return currentHour === parseInt(block, 10);
    //   };

    const bookTime = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, hourBlock: number, space: number) => {
        const id = (event.target as HTMLDivElement).id;

        const blockId = (event.target as HTMLDivElement).id;
        const timeBlock = blockId.split('-');
        // http://localhost:4200/location/1/booking/detail?month=may&day=18&year=2024&space=17&block=10&time=3060
        // const bookingIndex = history.location.pathname.search(/booking/i);
        // const url = history.location.pathname.substring(0, bookingIndex + "booking".length);
        // const yearIndex = history.location.pathname.search(/year/i);
        // const dateString = history.location.pathname.substring(bookingIndex + "booking".length + 6, yearIndex + 9);
        // history.push(`${url}/detail?${dateString}&space=${space.id}&block=${hourBlock}&time=${timeBlock[2] + timeBlock[3]}`);

        const url = path.slice(0, -4);
        navigate(`${url}detail${searchParams}&space=${space}&block=${hourBlock}&time=${timeBlock[2] + timeBlock[3]}`)
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
                            //ref={ref => hourBlocksRef.current[hour] = ref}
                            >
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
                                            style={{ width: `${100 / spaces.length}%` }}
                                        >
                                            {Array.from({ length: MINUTES_IN_BLOCK / TIME_BLOCK_MINS }, (_, blockIndex) => blockIndex * 30).map(block => {
                                                console.log(block);
                                                return (
                                                    <div
                                                        key={`${hour}-${block}`}
                                                        id={`time-block-${block}-${block + 30}`}
                                                        className="ss-booking-date__main__time-block__schedule__block"
                                                        onClick={(event) => bookTime(event, hour, space["id"])}
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
            )}

        </>
    );
};

