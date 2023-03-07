/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_login_post } from '../models/Body_login_login_post';
import type { Token } from '../models/Token';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthenticationService {

    /**
     * Login
     * @param formData
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static loginLoginPost(
        formData: Body_login_login_post,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
