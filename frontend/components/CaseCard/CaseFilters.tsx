import React, { useMemo, useState } from "react";
import { caseFilters } from "../../types/cases";
import { CaseChip } from "./CaseChip";
import classes from "./Case.module.scss";

export interface ICaseFiltersProps {}
export const CaseFilters: React.FC<ICaseFiltersProps> = () => {
  const [filters, setFilters] = useState<string[]>(["Show All"]);

  const handleToggleFilter = (filter: string, isActive: boolean) => {
    setFilters([filter]);
  };
  const chips = useMemo(() => {
    return caseFilters.map((filter, idx) => {
      console.log("filter", filter);
      console.log("index", filters.indexOf(filter));
      if (filters.indexOf(filter) < 0)
        return (
          <CaseChip key={idx} title={filter} onClick={handleToggleFilter} />
        );
      else
        return (
          <CaseChip
            key={idx}
            isActive
            title={filter}
            onClick={handleToggleFilter}
          />
        );
    });
  }, [filters]);

  return <div className={classes.filter__wrapper}>{chips}</div>;
};
