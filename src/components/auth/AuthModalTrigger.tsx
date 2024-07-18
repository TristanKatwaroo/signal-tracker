// components/auth/AuthModalTrigger.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpToLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';

const AuthModalTrigger = ({ authModal }: { authModal: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (authModal === 'true') {
      setIsOpen(true);
    }
  }, [authModal]);

  return (
    <>
      <Button
        size="default"
        className="ml-6 pr-5 gap-1"
        variant="tertiary"
        onClick={() => setIsOpen(true)}
      >
        <ArrowUpToLine className="h-4 w-4 mr-1" />
        Import
      </Button>
      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} renderButton={false} />
    </>
  );
};

export default AuthModalTrigger;
