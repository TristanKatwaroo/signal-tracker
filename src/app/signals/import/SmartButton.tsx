// src/app/signals/import/ImportButton.tsx

'use client';

import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader } from 'lucide-react';

export default function ImportButton() {
  const { pending } = useFormStatus();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const form = document.querySelector('form');
    const input = form?.querySelector('input[name="url"]') as HTMLInputElement;
    
    const handleInput = () => {
      setIsDisabled(pending || !input.value.trim());
    };

    input?.addEventListener('input', handleInput);

    // Cleanup event listener on unmount
    return () => {
      input?.removeEventListener('input', handleInput);
    };
  }, [pending]);

  return (
    <Button 
      className="mt-2" 
      variant="tertiary" 
      type="submit" 
      disabled={isDisabled}
    >
      {pending ? 'Importing' : 'Import'}
      {pending ? (
        <Loader className="h-4 w-4 ml-2 animate-spin" />
      ) : (
        <ArrowRight className="h-4 w-4 ml-2" />
      )}
    </Button>
  );
}
