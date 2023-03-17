/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VacancyOut } from '../models/VacancyOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VacancyService {

    /**
     * Get Vacancies
     * @returns VacancyOut Successful Response
     * @throws ApiError
     */
    public static getVacanciesApiVacanciesGet(): CancelablePromise<Array<VacancyOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/vacancies/',
        });
    }

    /**
     * Get Vacancy By Slug
     * @param slug
     * @returns VacancyOut Successful Response
     * @throws ApiError
     */
    public static getVacancyBySlugApiVacanciesSlugGet(
        slug: string,
    ): CancelablePromise<VacancyOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/vacancies/{slug}',
            path: {
                'slug': slug,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
