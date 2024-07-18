// components/auth/AuthCard.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import AuthModal from './AuthModal';

export default function AuthCard() {
  return (
    <Card className='p-2 pt-4 md:p-0 md:pt-0' x-chunk="dashboard-02-chunk-0">
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>Save Your Signals!</CardTitle>
        <CardDescription>Create an account to access your data anytime, anywhere.</CardDescription>
      </CardHeader>
      <CardContent className="p-2 md:p-4 md:pt-0">
        <AuthModal renderButton={true} buttonText="Sign up" />
      </CardContent>
    </Card>
  );
}
