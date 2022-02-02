import { UserType } from '../../types/user';

//  function to truncate(cut) the string if the length of given string
//  bigger than  given number(n)
export function truncate(string: string, n: number) {
  return string.length > n ? string.substr(0, n - 1) + '....' : string;
}

export function getRandomIntNumberBetween(min: number = 1, max: number = 10) {
  // min: 5, max: 10
  return Math.floor(Math.random() * (max - min + 1) + min); // 10.999999999999 => 10
}

export function getYearsIntBetween(startYear = 1940) {
  const currentYear = new Date().getFullYear(),
    years = [];
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
}

export const saveUserInLocalStorage = (user: UserType) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removedUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const format = () => {
  return 'YYYY-MM-DD';
};
