import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

let AUTH_TOKEN: any;

if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  AUTH_TOKEN = `Bearer ${JSON.parse(localStorage.getItem('authToken'))}`;
}

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (process.env.NODE_ENV !== 'production') {
    console.info(`[===  Axios REQUEST ===>] [${JSON.stringify(config)}]`);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  config.headers.common.Authorization = AUTH_TOKEN;
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  if (process.env.NODE_ENV !== 'production') {
    console.error('[===  Axios ERROR REQUEST ===>]', error, error.response);
  }
  return Promise.reject(error.response || error.message || error);
};

const onResponse = (response: AxiosResponse) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('===  Axios SUCCESS RESPONSE data ===>', response.data);
    console.log(
      '===  Axios SUCCESS RESPONSE status code ===>',
      response.status
    );
    console.log(
      '===  Axios SUCCESS RESPONSE status code ===>',
      response.statusText
    );
    console.log(
      '===  Axios SUCCESS RESPONSE status headers ===>',
      response.headers
    );
    console.log(
      '===  Axios SUCCESS RESPONSE status config ===>',
      response.config
    );
  }
  console.info(
    `[===  Axios SUCCESS RESPONSE ===>] [${JSON.stringify(response)}]`
  );
  return Promise.resolve(response.data || response);
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (process.env.NODE_ENV !== 'production') {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('===  Axios ERROR RESPONSE ===>', error, error.response);
      console.log('===  Axios ERROR RESPONSE data ===>', error?.response?.data);
      console.log(
        '===  Axios ERROR RESPONSE status ===>',
        error?.response?.status
      );
      console.log(
        '===  Axios ERROR RESPONSE headers ===>',
        error?.response?.headers
      );
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('===  Axios Request ERROR ===>', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(
        '=== Something happened in setting up the request that triggered an Error ===>',
        error.message
      );
    }
  }

  console.log('===  Axios ERROR RESPONSE ===>', error, error.response);
  return Promise.reject(error.response || error.message);
};

export function apiRequests(config: AxiosRequestConfig) {
  // init axios instance
  const axiosInstance = axios.create({});

  // Add interceptor
  // intercept requests or responses before they are handled by then or catch.

  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance(config);
}

export const pureAxios = axios.create();
