import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { login, signup } from "@/app/auth/actions";
import { useState } from "react";

interface AuthFormProps {
  isSignUp: boolean;
  toggleAuthMode: () => void;
  onSuccess: () => void;
}

export default function AuthForm({
  isSignUp,
  toggleAuthMode,
  onSuccess,
}: AuthFormProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (formData: FormData) => {
    setIsLoading(true);
    setAuthError(null);
    const action = isSignUp ? signup : login;
    const response = await action(formData);
    setIsLoading(false);

    if (response.error) {
      setAuthError(response.error);
    } else {
      onSuccess();
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
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {!isSignUp && (
              <button
                type="button"
                className="ml-auto inline-block text-sm underline hover:no-underline"
              >
                Forgot your password?
              </button>
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
        {authError && (
          <div className="text-sm font-medium text-destructive">
            {authError}
          </div>
        )}
        <Button type="submit" variant="tertiary" className="w-full" disabled={isLoading}>
          {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <button onClick={toggleAuthMode} className="underline hover:no-underline">
              Sign in
            </button>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <button onClick={toggleAuthMode} className="underline hover:no-underline">
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
