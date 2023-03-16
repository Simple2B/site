/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMessage } from '../models/CreateMessage';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MessageService {

    /**
     * Create Message
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createMessageApiMessageCreatePost(
        requestBody: CreateMessage,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/message/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
