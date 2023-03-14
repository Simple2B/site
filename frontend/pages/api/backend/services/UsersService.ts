/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SetUserAnswer } from '../models/SetUserAnswer';
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
     * Set User Answer
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static setUserAnswerUserSetAnswerPost(
        requestBody: SetUserAnswer,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/set_answer',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
