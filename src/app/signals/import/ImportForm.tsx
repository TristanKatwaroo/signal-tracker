// src/app/signals/import/ImportForm.tsx

import { Input } from "@/components/ui/input";
import ImportButton from './ImportButton';
import { handleSubmit } from './actions'; // Import the handleSubmit function

export default function ImportForm() {
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
