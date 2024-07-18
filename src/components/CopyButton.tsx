// components/CopyButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <Button
      variant={isCopied ? "secondary" : "outline"}
      size="lg"
    //   className="ml-2 px-5 w-12 " // Set a fixed width for the button
    className='mt-2 w-full px-5 md:ml-2 md:mt-0 md:w-auto lg:w-12'
      onClick={handleCopy}
    >
      <span className="flex items-center justify-center w-6"> {/* Adjust icon container */}
        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </span>
    </Button>
  );
};

export default CopyButton;
