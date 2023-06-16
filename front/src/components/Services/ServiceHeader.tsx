import clsx from "clsx";
import React from "react";
import classes from "./ServiceHeader.module.scss";

import { ServiceCard } from "./ServiceCard";
import { ourServices } from "@/types/services";

export const ServiceHeader = () => {
  return (
    <>
      <p className={classes.services__intro}>
        Your professional partner on a path from an idea to the application and
        beyond.
      </p>
      <div className={clsx(classes.services__cards)}>
        {ourServices.map((itm) => (
          <ServiceCard key={itm.id} card={itm} />
        ))}
      </div>
    </>
  );
};
