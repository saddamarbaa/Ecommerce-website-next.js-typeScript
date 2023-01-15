import * as Yup from 'yup';

export const addProductSchemaValidation = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters'),
  brand: Yup.string()
    .required('Brand  is required')
    .min(3, 'Brand must be at least 3 characters')
    .max(100, 'Brand must not exceed 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(15, 'Description must be at least 15 characters')
    .max(500, 'Description must not exceed 500 characters'),
  price: Yup.string()
    .required('Price is required')
    .matches(/^[0-9-.]+$/, 'Please enter valid number '),
  // productImage: Yup.mixed()
  //   .test('required', 'Image is required', (value: any) => value && value.length)
  //   .test('fileSize', 'File Size is too large', (value) => {
  //     const sizeInBytes = 1024 * 1024 * 10; // accept files up 10 mgb
  //     return value && value[0] && value[0].size <= sizeInBytes;
  //   })
  //   .test('type', 'We only support jpeg, jpg, png, webp', (value) => {
  //     const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
  //     return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type.toLowerCase());
  //   }),
  category: Yup.string().required('Category is required please select one'),
  stock: Yup.string()
    .required('Stock Info is required')
    .min(3, 'Stock Info must be at least 3 characters')
    .max(100, 'Stock Info must not exceed 100 characters'),
});

export const updateProductSchemaValidation = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters'),
  brand: Yup.string()
    .required('Brand  is required')
    .min(3, 'Brand must be at least 3 characters')
    .max(100, 'Brand must not exceed 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(15, 'Description must be at least 15 characters')
    .max(500, 'Description must not exceed 500 characters'),
  price: Yup.string()
    .required('Price is required')
    .matches(/^[0-9-.]+$/, 'Please enter valid number '),
  category: Yup.string().required('Category is required please select one'),
  stock: Yup.string()
    .min(3, 'Stock Info must be at least 3 characters')
    .max(100, 'Stock Info must not exceed 100 characters'),
});
