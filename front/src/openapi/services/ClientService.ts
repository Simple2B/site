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
   * do not change it after generation gApi (NOT COMMIT)
   */
  public static contactForm(
    candidateUuid: string,
    formData: FormData
  ): CancelablePromise<CandidateAnswerOut> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/client/contact_form',
      query: {
        candidate_uuid: candidateUuid,
      },
      body: formData,
      mediaType: 'multipart/form-data',
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
