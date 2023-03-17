/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionOut } from '../models/QuestionOut';
import type { VacancyType } from '../models/VacancyType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionsService {

    /**
     * Get Questions
     * @param typeVacancy
     * @returns number Successful Response
     * @throws ApiError
     */
    public static getQuestionsApiQuestionsTypeVacancyGet(
        typeVacancy: VacancyType,
    ): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/questions/{type_vacancy}',
            path: {
                'type_vacancy': typeVacancy,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Question By Id
     * @param id
     * @returns QuestionOut Successful Response
     * @throws ApiError
     */
    public static getQuestionByIdApiQuestionsQuestionIdGet(
        id: number,
    ): CancelablePromise<QuestionOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/questions/question/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
