/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CandidateAnswer } from '../models/CandidateAnswer';
import type { IsAuthenticated } from '../models/IsAuthenticated';
import type { Token } from '../models/Token';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CandidateService {

    /**
     * Is Authenticated
     * @param requestBody
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static isAuthenticatedApiCandidateIsAuthenticatedPost(
        requestBody: IsAuthenticated,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/candidate/is_authenticated',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Set Answer
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static setAnswerApiCandidateSetAnswerPost(
        requestBody: CandidateAnswer,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/candidate/set_answer',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
