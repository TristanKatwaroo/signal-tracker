// src/app/signals/import/SaveButton.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import { saveSignals } from "@/app/signals/import/actions";

type SaveButtonProps = {
  data: any[];
};

export default function SaveButton({ data }: SaveButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveResult(null);

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      const result = await saveSignals(formData);
      if (result) {
        setSaveResult('Data saved successfully');
      } else {
        setSaveResult('Error saving data');
      }
    } catch (error) {
      setSaveResult('Error saving data');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Button 
        className="mt-2" 
        variant="tertiary" 
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Saving' : 'Save'}
        <CloudUpload className="h-4 w-4 ml-2" />
      </Button>
      {saveResult && <p className="mt-2 text-sm">{saveResult}</p>}
    </>
  );
}
