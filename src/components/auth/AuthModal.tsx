'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import AuthForm from './AuthForm';

interface AuthModalProps {
  renderButton?: boolean;
}

export default function AuthModal({ renderButton = true }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSuccess = () => {
    setIsOpen(false); // Close the dialog upon successful login
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {renderButton ? (
          <Button size="sm" className="w-full text-tertiary-foreground" variant='tertiary' onClick={() => setIsOpen(true)}>
            {isSignUp ? 'Sign up' : 'Sign in'}
          </Button>
        ) : (
          <span
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Login
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="mx-auto max-w-sm shadow-md">
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
