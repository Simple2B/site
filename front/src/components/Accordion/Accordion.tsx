import clsx from "clsx";
import classes from "./Accordion.module.scss";
import { ITechnologyItem } from "@/types/technologies";
import { AccordionItem } from "./AccordionItem";

export const Accordion = ({
  ourTechnologies,
}: {
  ourTechnologies: ITechnologyItem[];
}) => {
  return (
    <div className={clsx(classes.accordion__container)}>
      {ourTechnologies.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </div>
  );
};
