/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CaseImage } from './CaseImage';

export type CaseOut = {
    title: string;
    description: string;
    slug_name: string;
    sub_title: string;
    project_link?: string;
    role: string;
    stacks: Array<string>;
    screenshots: Array<string>;
    case_images: Array<CaseImage>;
};

