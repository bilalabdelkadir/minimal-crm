import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

export function promisifyObservable<T>(
  observable: Observable<AxiosResponse<T>>,
): Promise<AxiosResponse<T>> {
  return new Promise((resolve, reject) => {
    observable.subscribe({
      next: (value) => resolve(value),
      error: (error) => reject(error),
    });
  });
}
export function formatPhoneNumber(phone: string): `251${string}` {
  if (/^[79]\d{8}/.test(phone)) {
    return `251${phone}`;
  }
  if (/^0[79]\d{8}/.test(phone)) {
    return `251${phone.slice(1)}`;
  }
  if (/^251[79]\d{8}/.test(phone)) {
    return phone as `251${string}`;
  }
  if (/^2510[79]\d{8}/.test(phone)) {
    return `251${phone.slice(4)}`;
  }

  // if the number start with 09 or 9
  if (/^09\d{8}/.test(phone)) {
    return `251${phone.slice(1)}`;
  }

  if (/^9\d{8}/.test(phone)) {
    return `251${phone}`;
  }

  throw new Error(`Invalid phone number (${phone})`);
}

export function formatPhoneNumberForDB(phone: string): string {
  if (/^[79]\d{8}/.test(phone)) {
    return phone;
  }
  if (/^0[79]\d{8}/.test(phone)) {
    return phone.slice(1);
  }
  if (/^251[79]\d{8}/.test(phone)) {
    return phone.slice(3);
  }
  if (/^2510[79]\d{8}/.test(phone)) {
    return phone.slice(4);
  }

  if (/^09\d{8}/.test(phone)) {
    return `251${phone.slice(1)}`;
  }

  if (/^9\d{8}/.test(phone)) {
    return `251${phone}`;
  }

  throw new Error(`Invalid phone number (${phone})`);
}
