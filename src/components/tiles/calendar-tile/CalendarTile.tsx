import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import "./calendar-tile.scss";

interface CalendarTileProps {
    date: string;
    month?: string;
    day?: string;
    year?: string;
    past?: boolean;
}

export const CalendarTile: React.FC<CalendarTileProps> = ({ date, month, day, year, past }) => {
    const [hasBorder, setHasBorder] = useState<boolean>(true);
    const [datePassed, setDatePassed] = useState<boolean>(false);
    //   const history = useHistory();
    const navigate = useNavigate()
    let location = useLocation();
    const [path, setPath] = useState("");

    useEffect(() => {
        setPath(location.pathname);

        setHasBorder(date !== '' && date !== undefined);
    }, [date]);

    useEffect(() => {
        if (date === '' || date === undefined) {
            setHasBorder(false);
        }

        if (past && date !== '') {

            setDatePassed(true);
        }
    }, [date, past]);

    const navigateToBooking = () => {
        if (!datePassed && date !== '' && date !== undefined) {
            navigate(`${location.pathname}/date?month=${month?.toLowerCase()}&day=${date}&year=${year}`);
        }
    };

    return (
        <div className='ss-calendar-tile__tile-container'>
            <div
                className={`ss-calendar-tile__container ${datePassed ? 'passed' : ''} ${!hasBorder ? 'no-border' : ''}`}

                // className={`ss-calendar-tile__container`}
                onClick={navigateToBooking}
                style={{ cursor: datePassed ? 'not-allowed' : 'pointer' }} // Change cursor style if date is passed

            >
                <div className="ss-calendar-tile__container__date">{date}</div>
            </div>
        </div>

    );
};
