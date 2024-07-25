// AuthModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import AuthForm from './AuthForm';

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  renderButton?: boolean;
  buttonText?: string;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen = false, onClose, renderButton = true, buttonText = 'Sign up', onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signUp' | 'signIn' | 'resetPassword'>('signUp');
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const toggleAuthMode = (newMode: 'signUp' | 'signIn' | 'resetPassword') => {
    setMode(newMode);
  };

  const handleSuccess = () => {
    setOpen(false); // Close the dialog upon successful login
    if (onClose) onClose();
    if (onSuccess) onSuccess(); // Call the success callback
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen && onClose) {
        onClose();
      }
    }}>
      <DialogTrigger asChild>
        {renderButton && (
          <Button size="sm" className="w-full text-tertiary-foreground" variant='tertiary' onClick={() => setOpen(true)}>
            {buttonText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="mx-auto rounded-xl max-w-sm shadow-md">
        <div className="flex flex-col space-y-1.5 p-3">
          <DialogTitle className="font-semibold text-xl">
            {mode === 'signUp' ? 'Sign Up' : mode === 'signIn' ? 'Sign In' : 'Reset Password'}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {mode === 'signUp'
              ? 'Enter your information to create an account'
              : mode === 'signIn'
              ? 'Enter your credentials to sign in'
              : 'Enter your email to reset your password'}
          </p>
        </div>
        <AuthForm
          mode={mode}
          toggleAuthMode={toggleAuthMode}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
