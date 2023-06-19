import { CommonSection, MainLayout } from '@/components';
import { VacancyElement } from '@/types/vacancies';
import { CareerForm } from '@/components/Career/CareerForm';

export interface IApplyContactsProps {
  element: VacancyElement;
  errorCode: number | null;
  userId: number;
}

const ApplyContacts = ({ element, errorCode, userId }: IApplyContactsProps) => {
  if (errorCode) {
    return <div>Error - {errorCode}</div>;
  }

  return (
    <MainLayout>
      <CommonSection
        contentOrder='column'
        title={element ? element.title : 'Title'}
        buttonType='none'
        isCaseSection
        background
      >
        <CareerForm vacancy={element} userId={userId} />
      </CommonSection>
    </MainLayout>
  );
};

export default ApplyContacts;
