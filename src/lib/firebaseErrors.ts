// lib/firebaseErrors.ts
const firebaseErrorMessages: { [key: string]: string } = {
    'auth/email-already-in-use': 'Email address is already in use.',
    'auth/invalid-email': 'Email address is not valid.',
    'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
    'auth/user-disabled': 'Account has been disabled by an admin.',
    'auth/user-not-found': 'User not found.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/email-not-verified': 'Email not verified. Please check your inbox and verify your email address.',
  };
  
  export function getFirebaseErrorMessage(code: string): string {
    return firebaseErrorMessages[code] || 'An unexpected error occurred. Please try again.';
  }
  