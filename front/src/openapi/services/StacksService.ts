/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StackOut } from '../models/StackOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StacksService {

    /**
     * Get
     * @returns StackOut Successful Response
     * @throws ApiError
     */
    public static getAllStacks(): CancelablePromise<Array<StackOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stacks/',
        });
    }

}
