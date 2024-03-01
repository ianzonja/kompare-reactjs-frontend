import axios, { AxiosResponse } from 'axios';
import { FormState } from '../store/formSlice';

const BASE_URL = process.env.REACT_APP_BASE_URL; // Replace with your API base URL

export interface InsuranceDataResponse {
    customerName: string,
    customerBirthdate: string,
    customerCity: string,
    vehiclePower: number,
    voucher: number,
    priceMatch: number,
    basePrice: number,
    additionalCoverages: [{
        price: number;
        coverage: {
            name: string;
            description: string;
        }
    }],
    discounts: [{
        price: number;
        discount: {
            name: string;
            description: string;
        }
    }],
    priceBeforeDiscounts: number,
    totalPrice: number
}

// Define types for API response and error
interface ApiResponse<T> {
    data: InsuranceDataResponse;
}

interface ApiError {
    message: string;
}

export const postInsuranceData = async <T>(data: FormState): Promise<InsuranceDataResponse> => {
    try {
        const route = 'calculate-insurance'
        const response: AxiosResponse<InsuranceDataResponse> = await axios.post(BASE_URL + route, data);
        return response.data; // Return data from the API response
    } catch (error) {
        throw handleError(error); // Handle and rethrow errors
    }
};

// Define a function to handle errors
const handleError = (error: any): ApiError => {
    if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        return { message: error.response.data.message || 'Server Error' };
    } else if (error.request) {
        // The request was made but no response was received
        return { message: 'No response from server' };
    } else {
        // Something happened in setting up the request that triggered an Error
        return { message: error.message || 'Request Error' };
    }
};

// Export the API service functions
export const apiService = {
    postInsuranceData
};