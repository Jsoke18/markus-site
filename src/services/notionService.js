// services/notionService.js

const BASE_URL = "http://localhost:5000"

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not set in the environment variables');
}

export const queryNotion = async (sessionId, isInitial = false) => {
  try {
    let url = `${BASE_URL}/images?session_id=${sessionId}&initial=${isInitial}`;
    console.log("Fetching from URL:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("Received data:", data);
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};