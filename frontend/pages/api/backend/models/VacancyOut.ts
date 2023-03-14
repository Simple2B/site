/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PropertyOut } from './PropertyOut';
import type { VacancyType } from './VacancyType';

export type VacancyOut = {
    id: number;
    slug: string;
    title: string;
    overview: string;
    about: string;
    type: VacancyType;
    offers: Array<string>;
    skills: Array<string>;
    properties: Array<PropertyOut>;
};

