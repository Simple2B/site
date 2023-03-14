/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionOut } from '../models/QuestionOut';
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
    public static getVacanciesVacanciesGet(): CancelablePromise<Array<VacancyOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/',
        });
    }

    /**
     * Get Vacancy By Slug
     * @param slug
     * @returns VacancyOut Successful Response
     * @throws ApiError
     */
    public static getVacancyBySlugVacanciesSlugGet(
        slug: string,
    ): CancelablePromise<VacancyOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{slug}',
            path: {
                'slug': slug,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Vacancy Questions
     * @param slug
     * @returns number Successful Response
     * @throws ApiError
     */
    public static getVacancyQuestionsVacanciesSlugQuestionsGet(
        slug: string,
    ): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{slug}/questions',
            path: {
                'slug': slug,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Vacancy Question By Id
     * @param slug
     * @param id
     * @returns QuestionOut Successful Response
     * @throws ApiError
     */
    public static getVacancyQuestionByIdVacanciesSlugQuestionIdGet(
        slug: string,
        id: number,
    ): CancelablePromise<QuestionOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vacancies/{slug}/question/{id}',
            path: {
                'slug': slug,
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
