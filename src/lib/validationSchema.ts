// lib/validationSchema.ts
import * as yup from 'yup';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';

// Custom method to check if the email already exists
const emailExists = async (email: string) => {
  const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  if (signInMethods.length > 0) {
    throw new yup.ValidationError('Email already in use', email, 'email');
  }
};

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required')
    .test('email-exists', 'Email already in use', async (value) => {
      if (value) {
        await emailExists(value);
      }
      return true;
    }),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/\d{2,}/, 'Password must contain at least 2 numbers')
    .matches(/[a-zA-Z]{2,}/, 'Password must contain at least 2 letters'),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});
