/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CandidateAnswerOut } from '../models/CandidateAnswerOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { Languages } from '../models/Languages';

export class ClientService {
  /**
   * Contact Form
   * @param formData
   * @param candidateUuid
   * @param language
   * @returns CandidateAnswerOut Successful Response
   * @throws ApiError
   * do not change it after generation gApi (NOT COMMIT)
   */
  public static contactForm(
    candidateUuid: string,
    formData: FormData,
    language?: Languages
  ): CancelablePromise<CandidateAnswerOut> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/client/contact_form',
      query: {
        candidate_uuid: candidateUuid,
        language: language,
      },
      body: formData,
      mediaType: 'multipart/form-data',
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
