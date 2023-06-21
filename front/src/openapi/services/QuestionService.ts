/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionOut } from '../models/QuestionOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionService {

    /**
     * Get Random Question
     * @param candidateUuid
     * @returns QuestionOut Successful Response
     * @throws ApiError
     */
    public static getRandomQuestion(
        candidateUuid: string,
    ): CancelablePromise<QuestionOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/{candidate_uuid}',
            path: {
                'candidate_uuid': candidateUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
