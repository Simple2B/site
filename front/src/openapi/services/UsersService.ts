/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IsAuthenticated } from '../models/IsAuthenticated';
import type { Token } from '../models/Token';
import type { UserAnswer } from '../models/UserAnswer';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Is Authenticated
     * @param requestBody
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static usersIsAuthenticated(
        requestBody: IsAuthenticated,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/is_authenticated',
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
    public static usersSetAnswer(
        requestBody: UserAnswer,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/set_answer',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
