"use client";
import React, { useCallback, useState } from "react";

import { CommonSection } from "../Sections";
import { CaseFilters } from "./CaseFilters";

const Cases = ({ children }: { children: JSX.Element[] }) => {
  const [filters, setFilters] = useState<string[]>(["Show All"]);

  const handleToggleFilter = (filter: string, isActive?: boolean) => {
    setFilters([filter]);
  };

  const filterProjects = useCallback(
    (itm: JSX.Element) => {
      return (
        JSON.parse(itm.props.property).filter((caseFilter: string) =>
          filters.includes(caseFilter)
        ).length > 0
      );
    },
    [filters]
  );

  const cases =
    filters.indexOf("Show All") >= 0
      ? children
      : children.filter(filterProjects);

  return (
    <CommonSection
      contentOrder="column"
      title="Our cases"
      buttonType="none"
      isCaseSection
    >
      <CaseFilters filters={filters} handleToggleFilter={handleToggleFilter} />
      {cases.length > 0 ? (
        <>{cases}</>
      ) : (
        <h2>Please, choose another filter!</h2>
      )}
    </CommonSection>
  );
};

export { Cases };
