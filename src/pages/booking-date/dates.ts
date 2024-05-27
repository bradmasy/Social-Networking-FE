export class Dates {
    public daysOfTheWeek: string[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    public months: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',]
    public currentDate: Date = new Date();
    public daysInMonth!: number;
    public dayArray!: number[];
    public year!: number;
    public month!: number;
    public firstDayOfTheMonth!: string;
    public firstDayOfTheMonthIndex!: number;
    public lastDayOfTheMonthIndex!: number;

    constructor() {
        this.dayArray = Array.from({ length: 7 * 6 }, (_, index) => index + 1);
        this.year = this.getCurrentYear(this.currentDate);
        this.month = this.getCurrentMonth(this.currentDate);
        this.lastDayOfTheMonthIndex = this.getLastDayOfMonth(this.year, this.month);
        this.daysInMonth = this.getDaysInMonth(this.year, this.month);
        this.firstDayOfTheMonthIndex = this.getFirstDayOfMonth(this.currentDate)
        this.firstDayOfTheMonth = this.daysOfTheWeek[this.firstDayOfTheMonthIndex];
    }

    getCurrentDay = () => {

    }

    getFullDate = (month: string, day: string, year: string) => {
        const monthIndex = this.months.findIndex(months => {

            return months.toLowerCase() === month
        });

        const currentDate = new Date(); // Get current date and time
        const selectedDate = new Date(parseInt(year), monthIndex, parseInt(day)); // Create date from provided parameters
        selectedDate.setHours(currentDate.getHours()); // Set hours to current hours
        selectedDate.setMinutes(currentDate.getMinutes()); // Set minutes to current minutes
        selectedDate.setSeconds(currentDate.getSeconds()); // Set seconds to current seconds

        let hours = selectedDate.getHours();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert hours to range 1-12
        selectedDate.setHours(hours);

        return selectedDate;     // return new Date(`${monthIndex +1}-${day}-${year}`);
    }

    getCurrentDayOfTheWeek = (): string => {
        return this.daysOfTheWeek[this.currentDate.getDay()]
    }

    getDaysArray(): number[] {
        return Array(this.daysInMonth).fill(0).map((_, index) => index + 1);
    }

    getDaysInMonth = (year: number, month: number): number => {
        const lastDayOfMonth = new Date(year, month + 1, 0);
        return lastDayOfMonth.getDate();
    }

    getCurrentMonth = (currentDate: Date): number => {
        return currentDate.getMonth();
    }

    getCurrentYear = (currentDate: Date): number => {
        return currentDate.getFullYear();
    }

    getFirstDayOfMonth = (currentDate: Date): number => {
        const firstDayOfWeek = currentDate.getDay();
        return firstDayOfWeek;
    }

    getLastDayOfMonth = (year: number, month: number): number => {
        const nextMonthFirstDay = new Date(year, month + 1, 1);
        const lastDayOfMonth = new Date(nextMonthFirstDay.getTime() - 1);
        return lastDayOfMonth.getDate();
    }
}