// src/app/signals/import/UploadButton.tsx

'use client';

import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CloudUpload, Loader, Save } from 'lucide-react';

export default function UploadButton() {
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
      {pending ? 'Saving' : 'Save'}
      {pending ? (
        <Loader className="h-4 w-4 ml-2 animate-spin" />
      ) : (
        <CloudUpload className="h-4 w-4 ml-2" />
      )}
    </Button>
  );
}
