/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IsAuthenticated } from '../models/IsAuthenticated';
import type { SetCandidateResume } from '../models/SetCandidateResume';
import type { Token } from '../models/Token';

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
    public static isAuthenticatedApiUserIsAuthenticatedPost(
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
     * Set User Attempt
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static setUserAttemptApiUserSetAttemptPost(
        requestBody: SetCandidateResume,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/set_attempt',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
