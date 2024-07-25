'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '@/app/auth/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ResetLayout from '@/components/layouts/ResetLayout';

export default function PasswordResetPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      setError('Invalid or missing reset code');
    }
  }, [code]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!code) {
      setError('Invalid or missing reset code');
      return;
    }

    const result = await resetPassword(code, newPassword);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <ResetLayout>
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success ? (
        <p className="text-green-500">Password reset successfully. You can now log in.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <Button type="submit" variant="tertiary" className="w-full">
            Reset Password
          </Button>
        </form>
      )}
    </ResetLayout>
  );
}