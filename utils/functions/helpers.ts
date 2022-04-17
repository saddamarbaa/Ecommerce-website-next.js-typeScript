import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const removedUserFromLocalStorage = () => {
  localStorage.removeItem('authToken');
};

export const saveUserInLocalStorage = (token: string) => {
  localStorage.setItem('authToken', JSON.stringify(token));
};

export const getHostUrl = () => publicRuntimeConfig?.CONSOLE_BACKEND_ENDPOINT;
