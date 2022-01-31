import clsx from "clsx";
import React from "react";
import { ourServices } from "../../types/services";
import commonClasses from "../Sections/CommonSection.module.scss";
import classes from "./ServiceHeader.module.scss";

import { ServiceCard } from "./ServiceCard";

export interface IServiceHeaderProps {}
export const ServiceHeader: React.FC<IServiceHeaderProps> = () => {
  return (
    <>
      <p className={classes.services__intro}>
        Egestas diam elit faucibus at feugiat scelerisque purus eu platea. Ipsum
        condimentum tristique laoreet pellentesque nunc, viverra. Euismod at
        non, iaculis et risus egestas gravida malesuada. Vitae cras natoque
        aliquam urna, nec nec risus integer vitae. Rhoncus at gravida interdum
        maecenas ornare volutpat nibh adipiscing. Mattis consectetur faucibus
        suspendisse auctor tempor volutpat. Massa enim feugiat ut sit purus. Id
        nec orci at elementum. At scelerisque pulvinar elementum, odio nunc,
        ipsum eu egestas. Commodo turpis faucibus leo at id a.
      </p>
      <div className={clsx(classes.services__cards)}>
        {ourServices.map((itm) => (
          <ServiceCard key={itm.id} card={itm} />
        ))}
      </div>
    </>
  );
};
