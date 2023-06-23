// import { CommonSection, MainLayout } from '@/components';
// import { VacancyElement } from '@/types/vacancies';
// import { CareerForm } from '@/components/Career/CareerForm';

import { CommonSection, MainLayout } from "@/components";
import { CareerForm } from "@/components/Career/CareerForm";
import { VacancyElement } from "@/types/vacancies";

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
    <div>
      <CareerForm />
    </div>
  );
};

export default ApplyContacts;
