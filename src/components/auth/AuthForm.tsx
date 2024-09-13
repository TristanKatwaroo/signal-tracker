import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { login, signup, requestPasswordReset } from "@/app/auth/actions";
import { useState, useRef, useCallback, useEffect } from "react";
import TurnstileWidget from '../TurnstileWidget';

interface AuthFormProps {
  mode: 'signUp' | 'signIn' | 'requestPasswordReset';
  toggleAuthMode: (mode: 'signUp' | 'signIn' | 'requestPasswordReset') => void;
  onSuccess: (message: string) => void;
}

export default function AuthForm({ mode, toggleAuthMode, onSuccess }: AuthFormProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [resetTurnstile, setResetTurnstile] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleAuth = async (formData: FormData) => {
    setIsLoading(true);
    setAuthError(null);

    if (!captchaToken) {
      setAuthError("Please verify you are not a robot");
      setIsLoading(false);
      return;
    }

    console.log("CaptchaToken in AuthForm:", captchaToken);
    console.log("CaptchaToken length:", captchaToken.length);
    console.log("CaptchaToken (first 10 chars):", captchaToken.substring(0, 10));

    formData.append("captchaToken", captchaToken);

    try {
      const action = mode === 'signUp' ? signup : mode === 'signIn' ? login : requestPasswordReset;
      console.log(`Attempting ${mode}...`);
      const result = await action(formData);
      console.log(`${mode} result:`, result);

      if (result.error) {
        throw new Error(result.error);
      }

      onSuccess(mode === 'signIn' ? 'Login successful!' : 
                mode === 'signUp' ? 'Verification email sent. Please check your inbox.' : 
                'Password reset email sent. Please check your inbox.');
      
    } catch (error: any) {
      console.error("Authentication error:", error);
      setAuthError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
      setCaptchaToken(null);
      setResetTurnstile(prev => !prev);
    }
  };

  const handleTurnstileVerify = (token: string) => {
    setCaptchaToken(token);
  };

  return (
    <div className="p-3 pt-0">
      <form
        id="auth-form"
        ref={formRef}
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(formRef.current!);
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
                <p className="ml-auto inline-block text-sm">&#8203;</p>
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
        <div>
          <TurnstileWidget onVerify={handleTurnstileVerify} key={resetTurnstile.toString()} />
        </div>
        <Button type="submit" variant="tertiary" className="w-full" disabled={isLoading || !captchaToken}>
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