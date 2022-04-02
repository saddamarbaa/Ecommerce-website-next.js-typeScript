import * as Yup from 'yup'

export const signupSchemaValidation = Yup.object().shape({
  firstName: Yup.string()
    .required('FirstName is required')
    .min(3, 'FirstName must be at least 3 characters')
    .max(10, 'FirstName must not exceed 10 characters'),
  lastName: Yup.string()
    .required('LastName is required')
    .min(3, 'LastName must be at least 3 characters')
    .max(10, 'LastName must not exceed 10 characters'),
  familyName: Yup.string()
    .min(3, 'family Name must be at least 3 characters')
    .max(30, 'familyName must not exceed 10 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  jobTitle: Yup.string()
    .min(3, 'Job Title must be at least 3 characters')
    .max(15, 'Job Title must not exceed 15 characters'),
  companyName: Yup.string()
    .min(3, 'Company Name cant be smaller than 3 characters')
    .max(30, 'Company Name cant be greater than 30 characters'),
  favoriteAnimal: Yup.string()
    .min(3, 'Favorite Animal cant be smaller than 3 characters')
    .max(15, 'Favorite Animal cant be greater than 15 characters'),
  bio: Yup.string()
    .min(10, 'Bio must be at least 10 characters')
    .max(300, 'Bio must not exceed 100 characters'),

  // profileImage: Yup.mixed()
  //   .test('required', 'Image is required', (value: any) => value && value.length)
  //   .test('fileSize', 'File Size is too large', (value) => {
  //     const sizeInBytes = 1024 * 1024 * 10 // accept files up 10 mgb
  //     return value && value[0] && value[0].size <= sizeInBytes
  //   })
  //   .test('type', 'We only support jpeg, jpg, png, webp', (value) => {
  //     const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']
  //     return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type.toLowerCase())
  //   }),
})

export const LoginSchemaValidation = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
})

export const forgotPasswordSchemaValidation = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
})

export const updatePasswordSchemaValidation = Yup.object().shape({
  firstName: Yup.string(),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
})
