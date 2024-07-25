'use client';

import { useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '@/app/auth/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function PasswordResetPage() {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Invalid or missing token');
      return;
    }
    const result = await resetPassword(token, newPassword);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
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
              />
            </div>
            <Button type="submit" variant="tertiary" className="w-full">
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}