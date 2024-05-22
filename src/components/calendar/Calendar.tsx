import React, { useState } from 'react';
import { Button } from '../button/Button';
import { CalendarTile } from '../tiles';

import "./calendar.scss";

interface CalendarComponentProps { }
const getDaysInMonth = (year: number, month: number): number => {
    const lastDayOfMonth: Date = new Date(year, month + 1, 0);
    return lastDayOfMonth.getDate();
};


const getFirstDayOfMonth = (currentDate: Date): number => {
    currentDate.setDate(1);
    return currentDate.getDay();
};

const getLastDayOfMonth = (year: number, month: number): number => {
    const nextMonthFirstDay: Date = new Date(year, month + 1, 1);
    const lastDayOfMonth: Date = new Date(nextMonthFirstDay.getTime() - 1);
    return lastDayOfMonth.getDate();
};





export const Calendar: React.FC<CalendarComponentProps> = () => {
    const daysOfTheWeek: string[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const months: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const currentDate: Date = new Date(); // the current date
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState<number>(currentDate.getMonth());
    const [daysInMonth, setDaysInMonth] = useState<number>(getDaysInMonth(year, month));
    const [firstDayOfTheMonthIndex, setFirstDayOfTheMonthIndex] = useState<number>(getFirstDayOfMonth(currentDate));
    const [lastDayOfTheMonthIndex, setLastDayOfTheMonthIndex] = useState<number>(getLastDayOfMonth(year, month));

    const nextMonth = (): void => {
        setMonth((prevMonth) => (prevMonth + 1) % 12);
        setDaysInMonth(getDaysInMonth(year, month));
        setLastDayOfTheMonthIndex(getLastDayOfMonth(year, month));
        setFirstDayOfTheMonthIndex(getFirstDayOfMonth(new Date(year, month, 1)));
    };

    const previousMonth = (): void => {
        setMonth((prevMonth) => (prevMonth - 1 + 12) % 12);
        setDaysInMonth(getDaysInMonth(year, month));
        setLastDayOfTheMonthIndex(getLastDayOfMonth(year, month));
        setFirstDayOfTheMonthIndex(getFirstDayOfMonth(new Date(year, month, 1)));
    };

    const isPastDay = (day: number): boolean => {
        const currentDate: Date = new Date(year, month, day);
        const today: Date = new Date();
        return currentDate < today;
    };

    return (
        <main className="ss-calendar__tile-container">
            <div className="ss-calendar__toolbar">
                <div className="ss-calendar__toolbar__button">
                    <Button text="PREVIOUS" type="button" click={previousMonth} />
                </div>
                <div className="ss-calendar__toolbar__month">
                    {months[month]} - {year}
                </div>
                <div className="ss-calendar__toolbar__button">
                    <Button text="NEXT" type="button" click={nextMonth} />
                </div>
            </div>
            <div className="ss-calendar__tile-container__day-column">
                {daysOfTheWeek.map((day) => (
                    <div key={day} className="ss-calendar__tile-container__day-column__day">
                        <div className="ss-calendar__tile-container__day-column__day__label">
                            {day}

                        </div>
                        <div className="ss-calendar__tile-container__day-column__day__tiles">
                            {
                                Array.from({ length: 10 }, (_, index) => index + 1).map((day) => (
                                    <CalendarTile
                                        key={day}
                                        date={
                                            day <= firstDayOfTheMonthIndex ||
                                                day >= lastDayOfTheMonthIndex + firstDayOfTheMonthIndex + 1
                                                ? ''
                                                : (day - firstDayOfTheMonthIndex).toString()
                                        }
                                        month={months[month]}
                                        year={year.toString()}
                                        past={isPastDay(day - firstDayOfTheMonthIndex + 1)}
                                    />
                                ))
                            }
                        </div>
                    </div>

                ))}
            </div>
            {/* <div className="ss-calendar__tile-container__tiles"> */}
            {/* {Array.from({ length: 7 * 6 }, (_, index) => index + 1).map((day) => (
                    <CalendarTile
                        key={day}
                        date={
                            day <= firstDayOfTheMonthIndex ||
                                day >= lastDayOfTheMonthIndex + firstDayOfTheMonthIndex + 1
                                ? ''
                                : (day - firstDayOfTheMonthIndex).toString()
                        }
                        month={months[month]}
                        year={year.toString()}
                        past={isPastDay(day - firstDayOfTheMonthIndex + 1)}
                    />
                ))} */}
            {/* </div> */}
        </main>
    );
};

