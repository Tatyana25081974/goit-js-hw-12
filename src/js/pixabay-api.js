import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const API_KEY = '48210883-f70532ba3d786d958e1d4920f'; 
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const params = {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    };

    const response = await axios.get(BASE_URL, { params });
   // Якщо API повертає некоректні дані
    if (!response.data.hits || response.data.hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: 'No images found for your query. Please try again.',
      });
      return null;
    }

    return response.data;
  } catch (error) {
    // Обробка помилок і дружнє повідомлення
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
    throw error; // Повторно кидаємо помилку для подальшої обробки
  }
}
