import { Contacts, MainLayout } from '@/components';

interface ContentLayoutProps {
  children: JSX.Element | JSX.Element[];
  params: { lang: string };
}

export default function ContentLayOut({ children, params }: ContentLayoutProps) {
  return (
    <MainLayout lang={params.lang}>
      <>{children}</>
      <Contacts background lang={params.lang} />
    </MainLayout>
  );
}
