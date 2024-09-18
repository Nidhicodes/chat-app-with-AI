import axios from 'axios';

const API_URL = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2';
const API_KEY = process.env.RAPIDAPI_KEY!; 

export const getChatbotResponse = async (message: string) => {
  try {
    const response = await axios.post(API_URL, {
      messages: [
        { role: 'user', content: message }
      ],
      system_prompt: '',
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false,
    }, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json',
      }
    });

    return response.data; 
  } catch (error) {
    console.error('Error communicating with chatbot service:', error);
    throw new Error('Failed to get response from chatbot service');
  }
};
