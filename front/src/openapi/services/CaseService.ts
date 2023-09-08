/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CaseOut } from '../models/CaseOut';
import type { CasesOut } from '../models/CasesOut';
import type { Languages } from '../models/Languages';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CaseService {

    /**
     * Get
     * @param isMain
     * @param lang
     * @returns CasesOut Successful Response
     * @throws ApiError
     */
    public static getAllCases(
        isMain: boolean = false,
        lang?: Languages,
    ): CancelablePromise<CasesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cases/',
            query: {
                'is_main': isMain,
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get By Slug
     * @param slugName
     * @param lang
     * @returns CaseOut Successful Response
     * @throws ApiError
     */
    public static getCaseBySlug(
        slugName: string,
        lang?: Languages,
    ): CancelablePromise<CaseOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cases/{slug_name}',
            path: {
                'slug_name': slugName,
            },
            query: {
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
