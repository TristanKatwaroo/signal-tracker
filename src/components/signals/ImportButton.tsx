// src/app/signals/import/ImportButton.tsx
'use client';

import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Import, Loader } from "lucide-react";

export default function ImportButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      className="mt-2" 
      variant="tertiary" 
      type="submit" 
      disabled={pending}
    >
      {pending ? 'Importing' : 'Import'}
      {pending ? (
        <Loader className="h-4 w-4 ml-2 animate-spin" />
      ) : (
        <Import className="h-4 w-4 ml-2" />
      )}
    </Button>
  );
}
