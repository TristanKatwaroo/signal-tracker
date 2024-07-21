// components/signals/ResultPill.tsx
import React from 'react';

type ResultPillProps = {
  pity: number;
  name: string;
};

const ResultPill: React.FC<ResultPillProps> = ({ pity, name }) => {
  return (
    <div className="relative flex items-center bg-primary/20 rounded-full pl-6 pr-4 py-1">
      <div className="absolute -left-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-xs font-semibold z-10">
        {pity}
      </div>
      <span className="ml-2 text-xs">{name}</span>
    </div>
  );
}

export default ResultPill;
