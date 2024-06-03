import React, { useEffect, useState } from 'react';
import { Button } from '../button/Button';
import { CalendarTile } from '../tiles';

import "./calendar.scss";
import { start } from 'repl';

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

    const [calendarArrays, setCalendarArrays] = useState<number[][]>([]);

    const nextMonth = (): void => {
        setMonth((prevMonth) => (prevMonth + 1) % 12);
        setDaysInMonth(getDaysInMonth(year, month));
        setFirstDayOfTheMonthIndex(getFirstDayOfMonth(new Date(year, month, 1)));
        setLastDayOfTheMonthIndex(getLastDayOfMonth(year, month));
        const nextMonth = (month + 1) % 12;
        const nextYear = nextMonth === 0 ? year + 1 : year;
        setMonth(nextMonth);
        setYear(nextYear);

        // setCalendarArrays([])

    };

    const previousMonth = (): void => {
        // Get the previous month
        const prevMonth = (month - 1 + 12) % 12;
        // Check if it's January of the current year
        const currentRealYear = new Date().getFullYear();
        if (prevMonth === 11 && year === currentRealYear) {
            return; // Return without updating state
        }

        // Update state for previous month
        setMonth(prevMonth);
        setDaysInMonth(getDaysInMonth(year, prevMonth));
        setLastDayOfTheMonthIndex(getLastDayOfMonth(year, prevMonth));
        setFirstDayOfTheMonthIndex(getFirstDayOfMonth(new Date(year, prevMonth, 1)));

        // Check if it's going to the previous year
        if (prevMonth === 11 && year > currentRealYear) {
            setYear(year - 1);
        }
    };

    const isPastDay = (year: number, month: number, day: number): boolean => {
        const currentDate: Date = new Date(year, month, day);
        currentDate.setHours(23, 59, 0, 0); // Set time to 11:59 PM
        const today: Date = new Date();
        return currentDate < today;
    };

    const createDateArrays = (daysOfTheWeek: string[], firstDayOfTheMonthIndex: number, daysInMonth: number): number[][] => {
        // Create 7 arrays, one for each day of the week
        const weekArrays: number[][] = Array.from({ length: 7 }, () => []);

        // Start counting from the first day of the month
        let currentDayIndex = firstDayOfTheMonthIndex;
        let dayNumber = 1;

        let i = 0;

        while (i < currentDayIndex) {
            weekArrays[i].push(0);
            i++;
        }

        while (dayNumber <= daysInMonth) {
            // Add the current day number to the appropriate array
            weekArrays[currentDayIndex].push(dayNumber);

            // Move to the next day of the week
            currentDayIndex = (currentDayIndex + 1) % 7;
            dayNumber++;
        }

        // Find the index of the last non-empty array
        let lastNonEmptyIndex = 6;
        while (weekArrays[lastNonEmptyIndex].length === 0 && lastNonEmptyIndex > 0) {
            lastNonEmptyIndex--;
        }

        // Fill remaining slots in the arrays with placeholder values (0)
        for (let i = 0; i < weekArrays.length; i++) {
            while (weekArrays[i].length < 6) {
                weekArrays[i].push(0);
            }
            // If it's after the last non-empty array, reverse the order of elements in the array
            if (i > lastNonEmptyIndex) {
                weekArrays[i].reverse();
            }
        }

        return weekArrays;
    };

    useEffect(() => {
        setFirstDayOfTheMonthIndex(getFirstDayOfMonth(new Date(year, month, 1)));
    }, [month, year]);

    useEffect(() => {

        const daysInMonth = getDaysInMonth(year, month);
        const weekArrays = createDateArrays(daysOfTheWeek, firstDayOfTheMonthIndex, daysInMonth);

        setCalendarArrays(weekArrays);

    }, [month, year, firstDayOfTheMonthIndex]);

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
                {daysOfTheWeek.map((day, index) => (
                    <div key={day} className="ss-calendar__tile-container__day-column__day">
                        <div className="ss-calendar__tile-container__day-column__day__label">
                            {day}

                        </div>
                        <div className="ss-calendar__tile-container__day-column__day__tiles">
                            {
                                calendarArrays[index]?.map((eachDay, i) => (
                                    <CalendarTile
                                        key={`${day}-${eachDay}-${index}-${i}`}
                                        date={eachDay === 0 ? '' : eachDay.toString()
                                        }
                                        month={months[month]}
                                        year={year.toString()}
                                        past={isPastDay(year, month, eachDay === 0 ? 1 : eachDay)}
                                    />
                                ))

                            }
                        </div>
                    </div>

                ))}
            </div>

        </main>
    );
};

