'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const errorMessages: { [key: string]: string } = {
  'Invalid login credentials': 'Invalid email or password.',
  'Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789.':
    'Password should contain at least one letter and number.',
  'Email is required': 'Please enter your email address.',
  'Email already registered': 'This email is already registered.',
  'captcha protection: request disallowed (invalid-input-response)': 'Captcha verification failed. Please try again.',
  // Add more custom messages as needed
};

function getCustomErrorMessage(error: string): string {
  return errorMessages[error] || error;
}

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: getCustomErrorMessage(error.message) };
  }

  return { success: true };
}

// export async function login(formData: FormData) {
//   const supabase = createClient();

//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const options = {
//     captchaToken: formData.get('captchaToken') as string,
//   }

//   const { error } = await supabase.auth.signInWithPassword(data, options);

//   if (error) {
//     console.error("Login error:", error); // Add this line for debugging
//     return { error: getCustomErrorMessage(error.message) };
//   }

//   return { success: true };
// }

export async function signup(formData: FormData) {
  const supabase = createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const captchaToken = formData.get('captchaToken') as string;

  console.log("Signup attempt with email:", email);
  console.log("CaptchaToken length:", captchaToken.length);
  console.log("CaptchaToken (first 10 chars):", captchaToken.substring(0, 10));

  try {
    // Verify the CAPTCHA token locally before sending to Supabase
    const verificationResponse = await fetch(`${siteUrl}/api/captcha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: captchaToken }),
    });

    const verificationResult = await verificationResponse.json() as { success: boolean };

    if (!verificationResult.success) {
      return { error: "CAPTCHA verification failed locally." };
    }

    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        captchaToken,
      },
    });

    console.log("Supabase signUp response:", { 
      data: signUpData, 
      error: error ? { message: error.message, name: error.name, status: error.status } : null 
    });

    if (error) {
      console.error("Signup error:", error);
      return { error: getCustomErrorMessage(error.message) };
    }

    if (!signUpData.user) {
      console.error("Signup failed: User data is null");
      return { error: "Failed to create user. Please try again." };
    }

    return { success: true, data: signUpData };
  } catch (error) {
    console.error("Unexpected error during signup:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return { success: true };
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = createClient();

  const email = formData.get('email') as string;

  if (!email) {
    return { error: getCustomErrorMessage('Email is required') };
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/reset-password`,
  });

  if (error) {
    return { error: getCustomErrorMessage(error.message) };
  }

  return { success: true, data };
}

export async function resetPassword(code: string, newPassword: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return { error: getCustomErrorMessage(error.message) };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { error: getCustomErrorMessage(updateError.message) };
  }

  return { success: true };
}
