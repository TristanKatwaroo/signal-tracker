// components/ImportButton.tsx

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ImportButtonProps {
  text: string;
}

export const ImportButton: React.FC<ImportButtonProps> = ({ text }) => {
  const router = useRouter();

  const handleClick = () => {
    if (text === 'Import') {
      console.log('Import initiated');
      // Add your import logic here
      router.push('/signals');
    } else {
      navigator.clipboard.writeText(text);
      console.log(`Copied: ${text}`);
    }
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      {text === 'Import' ? (
        <>
          Import <ArrowRight className="ml-2 h-4 w-4" />
        </>
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
};
