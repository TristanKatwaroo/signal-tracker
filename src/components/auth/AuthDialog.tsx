// components/auth/AuthDialog.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import AuthForm from './AuthForm';
import { useAuth } from '@/context/AuthContext';

interface AuthDialogProps {
  renderButton?: boolean;
}

export default function AuthDialog({ renderButton = true }: AuthDialogProps) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const { user, setIsSignUp: setAuthSignUp } = useAuth();

  // This effect runs when user state changes
  useEffect(() => {
    if (user) {
      console.log('AuthDialog: User state changed:', user);
      console.log('AuthDialog: Email verified:', user.emailVerified);
      if (user.emailVerified && !isSignUp) {
        console.log('AuthDialog: User logged in successfully, closing dialog.');
        setIsOpen(false);
      } else {
        console.log('AuthDialog: Keeping dialog open.');
      }
    }
  }, [user, isSignUp]);

  const toggleAuthMode = () => {
    setIsSignUp((prev) => {
      const newSignUpState = !prev;
      setAuthSignUp(newSignUpState);
      return newSignUpState;
    });
    clearMessages();
    console.log('AuthDialog: Auth mode toggled, isSignUp:', !isSignUp);
  };

  const clearMessages = () => {
    setAuthError(null);
    setResetMessage(null);
    setVerificationSent(false);
    console.log('AuthDialog: Messages cleared');
  };

  const handleSuccess = () => {
    console.log('AuthDialog: Login successful, setting dialog to close.');
    setIsOpen(false); // Close the dialog upon successful login
  };

  const handleVerificationSent = () => {
    console.log('AuthDialog: Verification email sent.');
    setVerificationSent(true);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        console.log('AuthDialog: Dialog open state changed:', open);
        setIsOpen(open);
        if (!open) {
          clearMessages();
        }
      }}
    >
      <DialogTrigger asChild>
        {renderButton ? (
          <Button size="sm" className="w-full text-tertiary-foreground" variant='tertiary' onClick={() => {
            console.log('AuthDialog: Opening dialog');
            setIsOpen(true);
          }}>
            {isSignUp ? 'Sign up' : 'Sign in'}
          </Button>
        ) : (
          <span
            className="cursor-pointer"
            onClick={() => {
              console.log('AuthDialog: Opening dialog');
              setIsOpen(true);
            }}
          >
            Login
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="mx-auto max-w-sm shadow-md">
        <div className="flex flex-col space-y-1.5 p-3">
          <DialogTitle className="font-semibold tracking-tight text-xl">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {isSignUp
              ? 'Enter your information to create an account'
              : 'Enter your credentials to sign in'}
          </p>
        </div>
        <AuthForm
          isSignUp={isSignUp}
          toggleAuthMode={toggleAuthMode}
          authError={authError}
          setAuthError={setAuthError}
          resetMessage={resetMessage}
          setResetMessage={setResetMessage}
          onSuccess={handleSuccess}
          onVerificationSent={handleVerificationSent}
        />
        {verificationSent && (
          <div className="p-1 text-sm text-center text-green-500">
            Verification email sent. Please check your inbox.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
