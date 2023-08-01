"use client";
import { CaseChip } from "./CaseChip";
import classes from "./Case.module.scss";
import { StackOut } from "@/openapi";

export interface ICaseFiltersProps {
  stacks: StackOut[];
  filters: string[];
  handleToggleFilter: (stackName: string) => void;
  children?: JSX.Element | JSX.Element[];
}
export const CaseFilters: React.FC<ICaseFiltersProps> = ({
  stacks,
  filters,
  handleToggleFilter,
  children,
}) => {
  return (
    <>
    <div className={classes.filter__wrapper}>
      {stacks.map((stack, idx) => (
        <CaseChip
          key={idx}
          title={stack.name}
          onClick={handleToggleFilter}
          isActive={filters.includes(stack.name)}
        />
      ))}
    </div>
    {children}
    </>
  );
};
