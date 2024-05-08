
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

    static validateNumberOfFields =(formData: any): boolean => {
    if (Object.keys(FormData).length < SIGNUP_FIELDS) {
        return false;
    }

    return true;
}
}