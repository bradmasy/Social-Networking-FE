import axios from "axios";
import Cookies from 'js-cookie';

// const API_BASE_URL =  'https://seven-api-44af44123dfd.herokuapp.com';
const API_BASE_URL = 'http://127.0.0.1:8000';

export class ApiService {
    retrieveAuth = (): boolean => {
        const token = Cookies.get("token")

        if (token) {
            return true;
        }

        return false;
    }
    getToken = (): string => {
        const token = Cookies.get("token");
        return token || "";
    }


    createHeader = () => {
        const headers: { [key: string]: string } = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200', // or specific origin as needed
        };

        if (this.retrieveAuth()) {
            headers['Authorization'] = `token ${this.getToken()}`;
        }

        return headers;
    };

    // login - signup
    login = (data: { [key: string]: string }): Promise<any> => {
        const headers = this.createHeader();
        const body = { username: data.username, password: data.password };

        return axios.post(`${API_BASE_URL}/login`, body, { headers });
    };

    signup = (data: { [key: string]: string }): Promise<any> => {
        const body = { ...data };
        return axios.post(`${API_BASE_URL}/signup`, body);

    }
    // locations
    get_locations = (): Promise<any> => {
        const headers = this.createHeader();

        return axios.get(`${API_BASE_URL}/location`, { headers });
    };

    get_location_by_id = (locationId: number): Promise<any> => {
        const headers = this.createHeader();

        return axios.get(`${API_BASE_URL}/location?id=${locationId}`, { headers });
    };

    get_location_by_name = (locationName: string): Promise<any> => {
        const headers = this.createHeader();

        return axios.get(`${API_BASE_URL}/location?name=${locationName}`, { headers });
    };


    get_spaces_by_location = (locationId: number): Promise<any> => {
        return axios.get(`${API_BASE_URL}/space?location=${locationId}`, { headers: this.createHeader() })
    }

    get_space_by_id = (id: string): Promise<any> => {
        return axios.get(`${API_BASE_URL}/space?id=${id}`, { headers: this.createHeader() })
    }

    // Bookings API Calls for Calendar

    get_bookings_by_date = (month: string, day: string, year: string): Promise<any> => {
        return axios.get(`${API_BASE_URL}/booking?month=${month}&day=${day}&year=${year}`, { headers: this.createHeader() })

    }

    get_bookings_by_date_and_location = (location: string, month: string, day: string, year: string): Promise<any> => {
        return axios.get(`${API_BASE_URL}/booking?location=${location}&month=${month}&day=${day}&year=${year}`, { headers: this.createHeader() })

    }

    create_booking = (bookingData: any): Promise<any> => {
        return axios.post(`${API_BASE_URL}/booking`, bookingData, { headers: this.createHeader() })
    }

    get_my_bookings = (): Promise<any> => {
        return axios.get(`${API_BASE_URL}/my-bookings`, { headers: this.createHeader() })
    }

    delete_booking_by_id = (bookingId: number): Promise<any> => {
        return axios.delete(`${API_BASE_URL}/booking/${bookingId}`, { headers: this.createHeader() })

    }


    // SQUARE OATH

    get_oauth = (url: string): Promise<any> => {
        return axios.post(url, { headers: this.createHeader() })
    }

    get_square_credentials = (): Promise<any> => {
        return axios.get(`${API_BASE_URL}/square-credentials`, { headers: this.createHeader() })
    }


    // PAYMENTS

    make_payment = (paymentInfo: { [key: string]: string }): Promise<any> => {
        return axios.post(`${API_BASE_URL}/payment`, paymentInfo, { headers: this.createHeader() })
    }

    // APPLICATION

    apply = (applicationForm: { [key: string]: string }): Promise<any> => {
        return axios.post(`${API_BASE_URL}/application`, applicationForm, { headers: this.createHeader() })
    }

    // SQUARE - OAUTH

    authorizeOauth = () => {
        return axios.post(`${API_BASE_URL}/payment-oauth`, { headers: this.createHeader() })

    }

    // INDUSTRY

    industryInvite = (industryPassword: { [key: string]: string }) => {
        return axios.post(`${API_BASE_URL}/industry-passcode`, industryPassword, { headers: this.createHeader() })
    }
}
