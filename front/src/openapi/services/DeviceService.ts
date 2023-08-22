/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Device } from '../models/Device';
import type { DeviceToken } from '../models/DeviceToken';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DeviceService {

    /**
     * Create Device
     * @param requestBody
     * @returns Device Successful Response
     * @throws ApiError
     */
    public static createDeviceApiDevicePost(
        requestBody: DeviceToken,
    ): CancelablePromise<Device> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/device',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
