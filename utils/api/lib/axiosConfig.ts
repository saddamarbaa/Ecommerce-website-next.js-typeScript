import axios, { AxiosError, AxiosResponse, AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';



let AUTH_TOKEN:any;
if (typeof window !== 'undefined') {
  AUTH_TOKEN = 'Bearer ' + JSON.parse(localStorage.getItem('authToken'));
}


// default config that will be applied to every request.
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export function axiosClient(config: AxiosRequestConfig ) {
  // init axios instance
  const instance = axios.create({});

  // Add a response interceptor
  // intercept requests or responses before they are handled by then or catch.
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (process.env.NEXT_PUBLIC_AXIOX_LOGGER === `development`) {
        console.log('===  Axios SUCCESS RESPONSE data ===>', response.data);
        console.log('===  Axios SUCCESS RESPONSE status code ===>', response.status);
        console.log('===  Axios SUCCESS RESPONSE status code ===>', response.statusText);
        console.log('===  Axios SUCCESS RESPONSE status headers ===>', response.headers);
        console.log('===  Axios SUCCESS RESPONSE status config ===>', response.config);
      }
      console.log('===  Axios SUCCESS RESPONSE ===>', response);
      return Promise.resolve(response.data || response);
    },
    (error: AxiosError) => {
      if (process.env.NEXT_PUBLIC_AXIOX_LOGGER === `development`) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('===  Axios ERROR RESPONSE ===>', error, error.response);
          console.log('===  Axios ERROR RESPONSE data ===>', error?.response?.data);
          console.log('===  Axios ERROR RESPONSE status ===>', error?.response?.status);
          console.log('===  Axios ERROR RESPONSE headers ===>', error?.response?.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('===  Axios Request ERROR ===>', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('=== Something happened in setting up the request that triggered an Error ===>', error.message);
        }
      }

      console.log('===  Axios ERROR RESPONSE ===>', error, error.response);
      return Promise.reject(error.response || error.message);
    }
  );

  return instance(config);
}

export const pureAxios = axios.create();

export default axiosClient;
