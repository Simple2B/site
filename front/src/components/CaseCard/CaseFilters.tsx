import { caseFilters } from "../../types/cases";
import { CaseChip } from "./CaseChip";
import classes from "./Case.module.scss";

export interface ICaseFiltersProps {
  filters: string[];
  handleToggleFilter: (filter: string, isActive?: boolean) => void;
}
export const CaseFilters: React.FC<ICaseFiltersProps> = ({
  filters,
  handleToggleFilter,
}) => {
  const chips = caseFilters.map((filter, idx) => {
    if (filters.indexOf(filter) < 0)
      return <CaseChip key={idx} title={filter} onClick={handleToggleFilter} />;
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
  return <div className={classes.filter__wrapper}>{chips}</div>;
};
