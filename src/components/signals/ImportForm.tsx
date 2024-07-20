// src/components/signals/ImportForm.tsx
// server component

import { Input } from "@/components/ui/input";
import ImportButton from './ImportButton';
import { importSignals } from '@/app/signals/import/actions';
import { cookies } from 'next/headers';
import dynamic from "next/dynamic";

const ImportResult = dynamic(() => import('./ImportResult'), {
  ssr: false,
  loading: () => <p>Fetching</p>
});

export default function ImportForm() {
  
  async () => {
    "use server"
    cookies().set('displayResults', 'false');
  }
  
  const cookieStore = cookies();
  const displayResults = cookieStore.get('displayResults')?.value === 'true';
  const resultData = cookieStore.get('resultData')?.value;

  const handleSubmit = async (formData: FormData) => {
    'use server';
    
    const result = await importSignals(formData);
    if (result) {
      console.log(result);
      cookies().set('displayResults', 'true');
      cookies().set('resultData', JSON.stringify(result));
    }
  };

  return (
    <form action={handleSubmit}>
      <Input 
        placeholder="Your Signal History URL" 
        className="mt-2" 
        name="url"
      />
      <ImportButton />
      {displayResults && <ImportResult result={resultData ? JSON.parse(resultData) : null} />}
    </form>
  );
}