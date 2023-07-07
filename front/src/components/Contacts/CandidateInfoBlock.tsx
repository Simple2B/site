"use client";

import { useAppContext } from "@/context/state";
import { useRouter } from "next/navigation";

export const CandidateInfoBlock = () => {
  const { push } = useRouter();
  const { closeModal } = useAppContext();

  const handleRedirect = () => {
    push("/careers");
    closeModal();
  }

  return (
    <div>
      <div className="text-center font-bold text-lg">or</div>
      <br />
      If you want to apply to us as a candidate, you need to familiarize yourself with our
      <span className="text-lg font-bold cursor-pointer" onClick={handleRedirect}> vacancies </span>
      and pass the test.
    </div>
  )
}
