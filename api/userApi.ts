import axios from 'axios';

export const getUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users', { timeout: 3000 });
    console.log('data:', response.data);
    return response.data; // En önemli kısım: veriyi return ediyoruz
  } catch (error: any) {
    console.error('Error:', error.response || error.message || error);
    throw error; // Hatanın yukarı çıkmasını sağlıyoruz
  }
};