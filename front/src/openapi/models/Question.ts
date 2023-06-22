/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { VariantQuestion } from './VariantQuestion';

export type Question = {
    text: string;
    variants: Array<VariantQuestion>;
    current_progress: number;
};

