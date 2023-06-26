import { CareerForm } from "@/components/Career/CareerForm";

export interface Props {
  errorCode: number | null;
}

export default function Page({ errorCode }: Props) {
  if (errorCode) {
    return <div>Error - {errorCode}</div>;
  }

  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <CareerForm />
    </div>
  );
};

