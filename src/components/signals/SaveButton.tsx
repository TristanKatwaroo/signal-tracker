// src/app/signals/import/SaveButton.tsx
'use client';

import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, CloudUpload, Loader } from "lucide-react";

export default function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      className="mt-2" 
      variant="tertiary" 
      type="submit" 
      disabled={pending}
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
