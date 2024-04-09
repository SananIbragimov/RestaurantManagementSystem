import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('FirstName cannot be empty')
    .min(3, 'FirstName must be between 3 and 50 characters')
    .max(50, 'FirstName must be between 3 and 50 characters')
    .matches(/^[a-zA-Z ]*$/, 'FirstName must contain only letters and spaces'),
  lastName: Yup.string()
    .required('LastName cannot be empty')
    .min(3, 'LastName must be between 3 and 50 characters')
    .max(50, 'LastName must be between 3 and 50 characters')
    .matches(/^[a-zA-Z ]*$/, 'LastName must contain only letters and spaces'),
  phoneNumber: Yup.string()
    .required('PhoneNumber cannot be empty')
    .matches(/^\+[1-9]\d{1,14}$/, 'PhoneNumber must be in international format and valid'),
  email: Yup.string()
    .required('Email cannot be empty')
    .email('Email format is invalid'),
  password: Yup.string()
    .required('Password cannot be empty')
    .min(8, 'Password cannot be less than 8 characters')
    .max(30, 'Password cannot be greater than 30 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  role: Yup.string()
    .required('Role cannot be empty') 
});