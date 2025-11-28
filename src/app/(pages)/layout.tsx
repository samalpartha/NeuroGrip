import { MainLayout } from '@/components/layout/main-layout';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
