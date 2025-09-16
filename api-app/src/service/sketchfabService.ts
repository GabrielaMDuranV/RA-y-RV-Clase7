import axios from 'axios';

const API_BASE_URL = 'https://dog.ceo/api';

export interface DogImageResponse {
  message: string;
  status: string;
}


export const dogService = {

  getRandomDogImage: async (): Promise<DogImageResponse> => {
    try {
      const response = await axios.get<DogImageResponse>(
        `${API_BASE_URL}/breeds/image/random`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching random dog image:', error);
      throw new Error('Failed to fetch random dog image');
    }
  },


  getMultipleRandomDogImages: async (count: number = 10): Promise<string[]> => {
    try {
      const response = await axios.get<{message: string[], status: string}>(
        `${API_BASE_URL}/breeds/image/random/${count}`
      );
      return response.data.message;
    } catch (error) {
      console.error('Error fetching multiple dog images:', error);
      throw new Error('Failed to fetch multiple dog images');
    }
  }
};

export default dogService;
