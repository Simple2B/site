'use client';
import React, { useCallback, useState } from 'react';

import { CommonSection } from '../Sections';

import { CaseOut, StackOut } from '@/openapi';
import { CaseFilters } from './CaseFilters';
import { CaseCard } from './CaseCard';

const constFilter: string[] = [];

const Cases = ({
  stacks,
  cases,
  title = 'Our cases',
}: {
  stacks: StackOut[];
  cases: CaseOut[];
  title?: string;
}) => {
  const [filterState, setFilterState] = useState<string[]>(constFilter);

  const callBackSetFilter = useCallback(
    (stackName: string) => {
      if (filterState.includes(stackName)) {
        setFilterState([...filterState.filter((f) => f !== stackName)]);
      } else {
        setFilterState([...filterState, stackName]);
      }
    },
    [filterState]
  );

  const filterProjects = (cases: CaseOut) => {
    if (filterState.length === 0) {
      return true;
    }
    for (let i = 0; i < cases.stacksNames.length; i++) {
      if (filterState.includes(cases.stacksNames[i])) {
        return true;
      }
    }
    return false;
  };

  return (
    <CommonSection
      contentOrder="column"
      title={title}
      buttonType="none"
      isCaseSection
    >
      <CaseFilters
        stacks={stacks}
        filters={filterState}
        handleToggleFilter={callBackSetFilter}
      >
        {cases.filter(filterProjects).map((c) => (
          <CaseCard key={c.slugName} card={c} />
        ))}
      </CaseFilters>
    </CommonSection>
  );
};

export { Cases };
