const BASE_URL = 'http://127.0.0.1:5000';

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