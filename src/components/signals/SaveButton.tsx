// src/app/signals/import/SaveButton.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import { saveSignals } from "@/app/signals/import/actions";
import { useToast } from '@/components/ui/use-toast';

type SaveButtonProps = {
  data: any[];
};

export default function SaveButton({ data }: SaveButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      const result = await saveSignals(formData);
      if (result && result.error) {
        toast({
          title: 'Error saving data',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Data saved successfully',
          description: 'Your signals have been saved.',
          variant: 'default',
        });
        setTimeout(() => {
          window.location.href = '/signals';
        }, 3000); // Redirect after showing the success toast
      }
    } catch (error) {
      toast({
        title: 'Error saving data',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button 
      className="mt-2" 
      variant="tertiary" 
      onClick={handleSave}
      disabled={isSaving}
    >
      {isSaving ? 'Saving' : 'Save'}
      <CloudUpload className="h-4 w-4 ml-2" />
    </Button>
  );
}
