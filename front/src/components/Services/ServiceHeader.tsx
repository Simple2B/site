import clsx from "clsx";
import React from "react";
import classes from "./ServiceHeader.module.scss";

import { ServiceCard } from "./ServiceCard";
import { IServiceCard } from "@/types/services";

export const ServiceHeader = ({
  title,
  ourServices,
}: {
  title: string;
  ourServices: IServiceCard[];
}) => {
  return (
    <>
      <p className={classes.services__intro}>{title}</p>
      <div className={clsx(classes.services__cards)}>
        {ourServices.map((itm) => (
          <ServiceCard key={itm.id} card={itm} />
        ))}
      </div>
    </>
  );
};
