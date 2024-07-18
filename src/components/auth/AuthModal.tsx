// components/auth/AuthModal.tsx
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
  onSuccess?: () => void; // New prop
}

export default function AuthModal({ isOpen = false, onClose, renderButton = true, buttonText = 'Sign up', onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
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
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
