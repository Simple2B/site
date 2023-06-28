/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_attach_cv } from '../models/Body_attach_cv';
import type { CandidateAnswer } from '../models/CandidateAnswer';
import type { CandidateAnswerOut } from '../models/CandidateAnswerOut';
import type { IsAuthenticated } from '../models/IsAuthenticated';
import type { IsAuthenticatedOut } from '../models/IsAuthenticatedOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CandidateService {

  /**
   * Is Authenticated
   * @param requestBody
   * @returns IsAuthenticatedOut Successful Response
   * @throws ApiError
   */
  public static isAuthenticated(
    requestBody: IsAuthenticated,
  ): CancelablePromise<IsAuthenticatedOut> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/candidate/is_authenticated',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Set Answer
   * @param requestBody
   * @returns CandidateAnswerOut Successful Response
   * @throws ApiError
   */
  public static setAnswer(
    requestBody: CandidateAnswer,
  ): CancelablePromise<CandidateAnswerOut> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/candidate/set_answer',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Attach Cv
   * @param userUuid
   * @param formData
   * @returns CandidateAnswerOut Successful Response
   * @throws ApiError
   */
  public static attachCv(
    userUuid: string,
    formData: FormData,
  ): CancelablePromise<CandidateAnswerOut> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/candidate/attach_cv',
      query: {
        'candidate_uuid': userUuid,
      },
      body: formData,
      mediaType: 'multipart/form-data',
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
