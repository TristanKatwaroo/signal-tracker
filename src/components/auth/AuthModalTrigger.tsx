// components/auth/AuthModalTrigger.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpToLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';
import { useRouter } from 'next/navigation';

const AuthModalTrigger = ({ authModal }: { authModal: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (authModal === 'true') {
      setIsOpen(true);
    }
  }, [authModal]);

  const handleSuccess = () => {
    router.push('/signals/import'); // Redirect to the import page upon successful login
  };

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
      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} renderButton={false} onSuccess={handleSuccess} />
    </>
  );
};

export default AuthModalTrigger;
