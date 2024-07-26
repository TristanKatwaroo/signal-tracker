import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { login, signup, requestPasswordReset } from "@/app/auth/actions";
import { useState, useRef } from "react";
import { Turnstile } from '@marsidev/react-turnstile';
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode: 'signUp' | 'signIn' | 'requestPasswordReset';
  toggleAuthMode: (mode: 'signUp' | 'signIn' | 'requestPasswordReset') => void;
  onSuccess: (message: string) => void;
}

export default function AuthForm({ mode, toggleAuthMode, onSuccess }: AuthFormProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileStatus, setTurnstileStatus] = useState<"success" | "error" | "expired" | "required">("required");
  const formRef = useRef<HTMLFormElement>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleAuth = async (formData: FormData) => {
    setIsLoading(true);
    setAuthError(null);

    if (turnstileStatus !== "success" || !captchaToken) {
      setAuthError("Please verify you are not a robot");
      setIsLoading(false);
      return;
    }

    formData.append("captchaToken", captchaToken);

    // Verify the Turnstile token
    const response = await fetch('/api/verify-turnstile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: captchaToken }),
    });

    const verificationResult: { success: boolean; error?: string } = await response.json();

    if (!response.ok || !verificationResult.success) {
      setIsLoading(false);
      setAuthError(verificationResult.error || 'Failed to verify CAPTCHA');
      return;
    }

    const action = mode === 'signUp' ? signup : mode === 'signIn' ? login : requestPasswordReset;
    const result = await action(formData);
    setIsLoading(false);

    if (result.error) {
      setAuthError(result.error);
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
        <div>
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onError={() => setTurnstileStatus("error")}
            onExpire={() => setTurnstileStatus("expired")}
            onSuccess={(token) => {
              setTurnstileStatus("success");
              setCaptchaToken(token);
            }}
          />
        </div>
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
