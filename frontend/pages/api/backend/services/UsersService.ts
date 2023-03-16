/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SetUserAttempt } from '../models/SetUserAttempt';
import type { UserCreate } from '../models/UserCreate';
import type { UserOut } from '../models/UserOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Create User
     * @param requestBody
     * @returns UserOut Successful Response
     * @throws ApiError
     */
    public static createUserUserCreateUserPost(
        requestBody: UserCreate,
    ): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/create_user',
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
    public static setUserAttemptUserSetAttemptPost(
        requestBody: SetUserAttempt,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/set_attempt',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
