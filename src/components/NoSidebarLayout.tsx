// components/NoSidebarLayout.tsx
import RootLayout from '@/app/layout';

export default function NoSidebarLayout({ children }: { children: React.ReactNode }) {
  return <RootLayout showSidebar={false}>{children}</RootLayout>;
}
