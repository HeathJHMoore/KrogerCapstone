import axios from 'axios';

const baseUrl = 'https://localhost:44387/api';

const getValues = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/values`).then((result) => {
      resolve(result.data);
    })
      .catch((error) => {
        reject(error);
      });
  });

  export default {
      getValues
  }