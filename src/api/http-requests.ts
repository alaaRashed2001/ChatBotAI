import axios from 'axios';
import { HUGGING_FACE_KEY, HUGGING_FACE_MODEL } from '../keys/keys';
import { Alert } from 'react-native';

const huggingFaceURL = 'https://router.huggingface.co/hf-inference/models';

export const getHuggingFaceResponse = async (msg: string) => {
  console.log('HUGGING_FACE_KEY:', HUGGING_FACE_KEY);
  try {
    const response = await axios.post(
      huggingFaceURL + HUGGING_FACE_MODEL,
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
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
};
