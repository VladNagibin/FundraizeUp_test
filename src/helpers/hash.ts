import { SHA256 } from 'crypto-js';

import { config } from '../config';

export const hash = (text: string) =>
  SHA256(text)
    .toString()
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, config.hashLength);

export const hashEmail = (email: string) => {
  const index = email.indexOf('@');
  return hash(email.slice(0, index)) + email.slice(index);
};
