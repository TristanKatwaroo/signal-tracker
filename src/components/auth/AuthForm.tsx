// AuthForm.tsx
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { login, signup, requestPasswordReset } from "@/app/auth/actions";
import { useState, useEffect } from "react";

interface AuthFormProps {
  mode: 'signUp' | 'signIn' | 'requestPasswordReset';
  toggleAuthMode: (mode: 'signUp' | 'signIn' | 'requestPasswordReset') => void;
  onSuccess: (message: string) => void;
}

export default function AuthForm({ mode, toggleAuthMode, onSuccess }: AuthFormProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAuthError(null); // Clear error messages when mode changes
  }, [mode]);

  const handleAuth = async (formData: FormData) => {
    setIsLoading(true);
    setAuthError(null);
    const action = mode === 'signUp' ? signup : mode === 'signIn' ? login : requestPasswordReset;
    const response = await action(formData);
    setIsLoading(false);

    if (response.error) {
      setAuthError(response.error);
    } else {
      if (mode === 'signIn') {
        onSuccess('Login successful!');
      } else if (mode === 'signUp') {
        onSuccess('Verification email sent. Please check your inbox.');
      } else {
        onSuccess('Password reset email sent. Please check your inbox.');
      }
    }
  };

  return (
    <div className="p-3 pt-0">
      <form
        id="auth-form"
        className="grid gap-4"
        action={handleAuth}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleAuth(formData);
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className={authError ? 'border-red-500' : ''}
          />
        </div>
        {mode !== 'requestPasswordReset' && (
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {mode === 'signIn' ? (
                <button
                  type="button"
                  className="ml-auto inline-block text-sm underline hover:no-underline"
                  onClick={() => toggleAuthMode('requestPasswordReset')}
                >
                  Forgot your password?
                </button>
              ) : (
                <p className="ml-auto inline-block text-sm">&#8203;</p> // Zero-width space to maintain layout
              )}
            </div>
            <Input
              minLength={6}
              name="password"
              id="password"
              type="password"
              required
              className={authError ? 'border-red-500' : ''}
            />
          </div>
        )}
        {authError && (
          <div className="text-sm font-medium text-destructive">
            {authError}
          </div>
        )}
        <Button type="submit" variant="tertiary" className="w-full" disabled={isLoading}>
          {isLoading ? "Loading..." : mode === 'signUp' ? "Sign Up" : mode === 'signIn' ? "Login" : "Reset Password"}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm">
        {mode === 'signUp' ? (
          <>
            Already have an account?{" "}
            <button onClick={() => toggleAuthMode('signIn')} className="underline hover:no-underline">
              Sign in
            </button>
          </>
        ) : mode === 'signIn' ? (
          <>
            Don&apos;t have an account?{" "}
            <button onClick={() => toggleAuthMode('signUp')} className="underline hover:no-underline">
              Sign up
            </button>
          </>
        ) : (
          <button onClick={() => toggleAuthMode('signIn')} className="underline hover:no-underline">
            Back to Sign In
          </button>
        )}
      </div>
    </div>
  );
}
