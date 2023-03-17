/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateContactUs } from '../models/CreateContactUs';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ContactUsService {

    /**
     * Create Contact Us
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createContactUsApiContactUsCreatePost(
        requestBody: CreateContactUs,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contact_us/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
