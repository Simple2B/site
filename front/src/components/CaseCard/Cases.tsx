"use client";
import React, { useCallback, useState } from "react";

import { CommonSection } from "../Sections";

import { CaseOut, StackOut } from "@/openapi";
import { CaseFilters } from "./CaseFilters";
import { CaseCard } from "./CaseCard";

const constFilter: string[] = [];

const Cases = ({
  stacks,
  cases,
}: {
  stacks: StackOut[];
  cases: CaseOut[];
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
    for (let i = 0; i < cases.stacks.length; i++) {
      if (filterState.includes(cases.stacks[i])) {
        return true;
      }
    }
    return false;
  };

  return (
    <CommonSection
      contentOrder="column"
      title="Our cases"
      buttonType="none"
      isCaseSection
    >
      <CaseFilters stacks={stacks} filters={filterState} handleToggleFilter={callBackSetFilter}>
        {cases.filter(filterProjects).map((c) =>  <CaseCard key={c.slug_name} card={c} />)}
      </CaseFilters>
    </CommonSection>
  );
};

export { Cases };
