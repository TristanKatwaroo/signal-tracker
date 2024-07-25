// components/layouts/ResetLayout.tsx
import { ReactNode } from 'react';

interface ResetLayoutProps {
  children: ReactNode;
}

const ResetLayout = ({ children }: ResetLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="w-full max-w-md p-4 bg-card rounded shadow-md">{children}</main>
    </div>
  );
};

export default ResetLayout;
