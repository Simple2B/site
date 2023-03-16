/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContactUserData } from './ContactUserData';
import type { UserAnswer } from './UserAnswer';

export type SetUserAttempt = {
    contact_data: ContactUserData;
    answers: Array<UserAnswer>;
};

