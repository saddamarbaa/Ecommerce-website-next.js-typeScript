import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

//  function to truncate(cut) the string if the length of given string
//  bigger than  given number(n)
export function truncate(string: string, n: number) {
  return string.length > n ? `${string.substr(0, n - 1)}....` : string
}

export function getRandomIntNumberBetween(min = 1, max = 10) {
  // min: 5, max: 10
  return Math.floor(Math.random() * (max - min + 1) + min) // 10.999999999999 => 10
}

export function getYearsIntBetween(startYear = 1940) {
  const currentYear = new Date().getFullYear()
  const years = []
  let temp = startYear
  while (temp <= currentYear) {
    years.push(temp)
    temp += 1
  }
  return years
}

export const format = () => 'MM-DD-YYYY'

export const saveUserInLocalStorage = (token: string) => {
  localStorage.setItem('authToken', JSON.stringify(token))
}

export const removedUserFromLocalStorage = () => {
  localStorage.removeItem('authToken')
}

export const getHostUrl = () => publicRuntimeConfig?.CONSOLE_BACKEND_ENDPOINT

export const getCategories = () => [
  'All Products',
  "Women's clothing",
  "Women's Shoes",
  'Jewelery',
  "Men's clothing",
  "Men's Shoes",
  'Football',
  'Books',
  'Electronics',
  'Sports',
  'Toys ',
  'Personal Computers',
]
