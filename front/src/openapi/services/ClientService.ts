/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_contact_form } from '../models/Body_contact_form';
import type { CandidateAnswerOut } from '../models/CandidateAnswerOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClientService {

    /**
     * Contact Form
     * @param formData
     * @param candidateUuid
     * @returns CandidateAnswerOut Successful Response
     * @throws ApiError
     */
    public static contactForm(
        formData: Body_contact_form,
        candidateUuid?: string,
    ): CancelablePromise<CandidateAnswerOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/client/contact_form',
            query: {
                'candidate_uuid': candidateUuid,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
