"use client";

import { MouseEventHandler } from 'react';
import { useExitPrompt } from '@/hooks/useExitPrompt';

import { Session } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import classes from '@/components/Navbar/Navbar.module.scss';

import { QuizContainer } from '@/components/Career/QuizContainer';
import { CommonSection } from '@/components';
import { VacancyElement } from '@/types/vacancies';

export interface IApplyContactsProps {
  element: VacancyElement;
  count: number;
  session: Session | null;
  userId?: number;
  params: { id: string };
}

const ApplyContacts = ({ element, count, session, userId, params }: IApplyContactsProps) => {
  useExitPrompt();

  const hangleConfirm: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (confirm('Are you sure you want to exit?')) {
    } else {
      e.preventDefault()
      return;
    }
  }

  return (
    <>
      <div className={classes.navbar__logo_container}>
        <Link onClick={hangleConfirm} href={"/"}>
          <Image
            src={`/svg/logo/logo_blck.svg`}
            alt="Simple2b logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </Link>
      </div>

      <CommonSection
        contentOrder='column'
        title={`Quiz ${params.id}`}
        buttonType='none'
        isCaseSection
        fullWidth
        background
        dense
      >
        {<QuizContainer count={count} vacancyId={1} userId={1} />}
      </CommonSection>
    </>
  );
};

export default ApplyContacts;
