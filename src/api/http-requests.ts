import axios from 'axios';
import { HUGGING_FACE_KEY } from '../keys/keys';
import { Alert } from 'react-native';

const huggingFaceURL = 'https://api-inference.huggingface.co/models';

export const getHuggingFaceResponse = async (msg: string) => {
  try {
    const response = await axios.post(
      huggingFaceURL + '/distilgpt2',
      {
        inputs: msg,
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data[0]?.generated_text;
  } catch (error: unknown) {
    const errorMessage = axios.isAxiosError(error)
      ? error?.message
      : 'An unknown error occurred!';
    console.log(JSON.stringify(errorMessage));
    Alert.alert(errorMessage);
  }
};
