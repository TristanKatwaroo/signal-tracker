// src/app/signals/import/ImportForm.tsx

import { Input } from "@/components/ui/input";
import ImportButton from './ImportButton';
import { importSignals } from './actions'; // Import the importGachaLog function

export default function ImportForm() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    
    const result = await importSignals(formData);
    console.log(result);
    // setResponse(result);
  };

  return (
    <form action={handleSubmit}>
      <Input 
        placeholder="Your Signal History URL" 
        className="mt-2" 
        name="url"
      />
      <ImportButton />
    </form>
  );
}
