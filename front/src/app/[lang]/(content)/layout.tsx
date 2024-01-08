import { Contacts, MainLayout } from '@/components';

export default function ContentLayOut({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <MainLayout>
      <>{children}</>
      <Contacts background />
    </MainLayout>
  );
}
