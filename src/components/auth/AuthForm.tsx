'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  signOut,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { signUpSchema, signInSchema } from '@/lib/validationSchema';
import { getFirebaseErrorMessage } from '@/lib/firebaseErrors';

interface FormData {
  email: string;
  password: string;
}

interface AuthFormProps {
  isSignUp: boolean;
  toggleAuthMode: () => void;
  authError: string | null;
  setAuthError: (error: string | null) => void;
  resetMessage: string | null;
  setResetMessage: (message: string | null) => void;
  onSuccess: () => void;
  onVerificationSent: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isSignUp,
  toggleAuthMode,
  authError,
  setAuthError,
  resetMessage,
  setResetMessage,
  onSuccess,
  onVerificationSent,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(isSignUp ? signUpSchema : signInSchema),
  });

  const handleAuth = async (data: FormData) => {
    try {
      if (isSignUp) {
        console.log('AuthForm: Attempting to sign up user with email:', data.email);
        const signInMethods = await fetchSignInMethodsForEmail(auth, data.email);
        if (signInMethods.length > 0) {
          throw new Error('auth/email-already-in-use');
        }
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        console.log('AuthForm: User signed up, sending verification email.');
        await sendEmailVerification(userCredential.user);
        await signOut(auth); // Sign out the user immediately after sign up
        // setAuthError('Account created. Please verify your email.');
        onVerificationSent(); // Notify that verification email was sent
        // toggleAuthMode();
      } else {
        console.log('AuthForm: Attempting to sign in user with email:', data.email);
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        if (!userCredential.user.emailVerified) {
          console.log('AuthForm: User not verified, signing out.');
          await signOut(auth);
          throw new Error('auth/email-not-verified');
        }
        console.log('AuthForm: Sign in successful.');
        onSuccess(); // Call onSuccess only for login
      }
    } catch (error: any) {
      const errorCode = error.code || error.message;
      console.error(`AuthForm: Error ${isSignUp ? 'signing up' : 'signing in'}:`, errorCode);
      setAuthError(getFirebaseErrorMessage(errorCode));
    }
  };

  const handlePasswordReset = async () => {
    const email = getValues('email');
    if (!email) {
      setAuthError('Please enter your email address.');
      return;
    }
    try {
      console.log('AuthForm: Attempting to send password reset email to:', email);
      await sendPasswordResetEmail(auth, email);
      setResetMessage('Password reset email sent. Please check your inbox.');
    } catch (error: any) {
      const errorCode = error.code || error.message;
      console.error(`AuthForm: Error sending password reset email:`, errorCode);
      setAuthError(getFirebaseErrorMessage(errorCode));
    }
  };

  return (
    <div className="p-3 pt-0">
      <form onSubmit={handleSubmit(handleAuth)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register('email')}
            className={errors.email || authError ? 'border-red-500' : ''}
          />
          {errors.email && !authError && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <div className='flex items-center'>
            <Label htmlFor="password">Password</Label>
            {!isSignUp && (
              <button
                type="button"
                onClick={handlePasswordReset}
                className="ml-auto inline-block text-sm underline hover:no-underline"
              >
                Forgot your password?
              </button>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            className={errors.password || authError ? 'border-red-500' : ''}
          />
          {errors.password && !authError && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        {authError && <p className="text-red-500 text-sm">{authError}</p>}
        {/* {resetMessage && <p className="text-green-500 text-xs">{resetMessage}</p>} */}
        <Button type="submit" variant="tertiary" className="w-full">
          {isSignUp ? 'Sign up with Email' : 'Sign in with Email'}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                toggleAuthMode();
                setAuthError(null);
                setResetMessage(null);
                console.log('AuthForm: Switched to sign in mode');
              }}
              className="underline hover:no-underline"
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            Don&#39;t have an account?{" "}
            <button
              type="button"
              onClick={() => {
                toggleAuthMode();
                setAuthError(null);
                setResetMessage(null);
                console.log('AuthForm: Switched to sign up mode');
              }}
              className="underline hover:no-underline"
            >
              Sign up
            </button>
          </>
        )}
      </div>
      <div className="mt-2 text-center text-sm text-muted-foreground">
        By continuing, you agree to our{" "}
        <button
          type="button"
          className="underline hover:no-underline"
        >
          Privacy Policy
        </button>
        .
      </div>
    </div>
  );
};

export default AuthForm;
