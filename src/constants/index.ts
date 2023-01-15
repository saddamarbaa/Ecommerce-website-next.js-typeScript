import { ProductType } from '@/types';

export const defaultValues: ProductType = {
  name: '',
  price: '',
  brand: '',
  description: '',
  productImage: '',
  category: 'All Products',
  stock: 'in stock - order soon',
};

export const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export const days = [
  { value: '01', label: '1' },
  { value: '02', label: '2' },
  { value: '03', label: '3' },
  { value: '04', label: '4' },
  { value: '05', label: '5' },
  { value: '06', label: '6' },
  { value: '07', label: '7' },
  { value: '08', label: '8' },
  { value: '09', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
  { value: '24', label: '24' },
  { value: '25', label: '25' },
  { value: '26', label: '26' },
  { value: '27', label: '27' },
  { value: '28', label: '28' },
  { value: '29', label: '29' },
  { value: '30', label: '30' },
  { value: '31', label: '31' },
];

export const productCategory = [
  { value: 'all products', label: 'All Products' },
  { value: 'books', label: 'Books' },
  { value: 'sports', label: 'Sports' },
  { value: 'football', label: 'Football' },
  { value: 'personal computers', label: 'Computers' },
  { value: "women's clothing", label: "women's clothing" },
  { value: "women's shoes", label: "women's shoes" },
  { value: "men's clothing", label: "men's clothing" },
  { value: "men's shoes", label: "men's shoes" },
  { value: 'toys', label: 'Toys' },
];

export const authorizationRoles = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
  { value: 'manger', label: 'Manger' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'client', label: 'Client' },
  { value: 'guide', label: 'Guide' },
];
