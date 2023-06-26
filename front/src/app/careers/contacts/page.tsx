// import { CommonSection, MainLayout } from '@/components';
// import { VacancyElement } from '@/types/vacancies';
// import { CareerForm } from '@/components/Career/CareerForm';

import { CommonSection, MainLayout } from "@/components";
import { CareerForm } from "@/components/Career/CareerForm";
import { VacancyElement } from "@/types/vacancies";

export interface Props {
  errorCode: number | null;
}

const ApplyContacts = ({ errorCode }: Props) => {
  if (errorCode) {
    return <div>Error - {errorCode}</div>;
  }

  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <CareerForm />
    </div>
  );
};

export default ApplyContacts;
