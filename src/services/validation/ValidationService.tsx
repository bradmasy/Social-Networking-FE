import { start } from "repl";

const SIGNUP_FIELDS = 9;

/**
 * Validation Service.
 * 
 * Static Validation Service for Validating Various Data Elements in the Application.
 * 
 * 
 */
export class ValidationService {


    static validateForm = (formData: any): boolean => {

        if (Object.keys(formData).length === 0) {
            return false;
        }

        const formKeys = Object.keys(formData);

        for (const key of formKeys) {

            // check specific fields
            // birthdate, 

            if (key === 'email') {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                if (!emailRegex.test(formData[key])) {
                    return false;
                }
            }

            if (formData[key] === '' || formData[key] === " " || formData[key] === undefined || formData[key] === null) {
                return false;
            }
        }

        return true;
    }

    static validateNumberOfFields = (formData: any): boolean => {
        if (Object.keys(FormData).length < SIGNUP_FIELDS) {
            return false;
        }

        return true;
    }

    static validatePasswordChange = (formData: any): boolean => {
        if (formData["retype-password"] !== formData["new-password"]) {
            return false;
        }

        return true;
    }

    static validateTimes = (startHour: string, startMin: string, endHour: string, endMin: string): boolean => {

        const startTime = new Date();
        const endTime = new Date();
        startTime.setHours(parseInt(startHour));
        startTime.setMinutes(parseInt(startMin));

        endTime.setHours(parseInt(endHour));
        endTime.setMinutes(parseInt(endMin));

        if (endTime.getTime() <= startTime.getTime()) {
            return false;
        }

        const differenceInMins = (endTime.getTime() - startTime.getTime()) / (60 * 1000)

        if (differenceInMins < 60 ){
            return false;

        }
        return true;
    }
}