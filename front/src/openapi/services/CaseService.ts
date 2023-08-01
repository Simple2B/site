/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CaseOut } from '../models/CaseOut';
import type { CasesOut } from '../models/CasesOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CaseService {

    /**
     * Get
     * @param isMain
     * @returns CasesOut Successful Response
     * @throws ApiError
     */
    public static getAllCases(
        isMain: boolean = false,
    ): CancelablePromise<CasesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cases/',
            query: {
                'is_main': isMain,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get By Slug
     * @param slugName
     * @returns CaseOut Successful Response
     * @throws ApiError
     */
    public static getCaseBySlug(
        slugName: string,
    ): CancelablePromise<CaseOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cases/{slug_name}',
            path: {
                'slug_name': slugName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
