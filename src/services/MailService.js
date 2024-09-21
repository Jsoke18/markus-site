// services/mailService.js

import axios from 'axios';

const API_URL = "http://localhost:5000"


console.log('API_URL:', API_URL); // Log the API_URL

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not set in the environment variables');
}

export const sendEmail = async (formData) => {
  try {
    // Convert FormData to a plain object
    const plainFormData = {};
    for (let [key, value] of formData.entries()) {
      plainFormData[key] = value;
    }

    console.log('Sending request to:', `${API_URL}/send_email`);
    console.log('Form data:', plainFormData);

    const response = await axios.post(`${API_URL}/send_email`, plainFormData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message);
    throw error;
  }
};