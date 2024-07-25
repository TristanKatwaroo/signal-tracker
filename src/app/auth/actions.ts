'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
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
    return { error: 'Email is required' };
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, data };
}

export async function resetPassword(code: string, newPassword: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return { error: error.message };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { error: updateError.message };
  }

  return { success: true };
}