const BASE_URL = 'http://127.0.0.1:5000'

export const queryNotion = async () => {

    try {
        const response = await fetch (`${BASE_URL}/images`);
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }  
        return await response.json();
    } catch (error) { 
        console.error('There has been a problem with your fetch operation:', error);
    throw error;
    }
}