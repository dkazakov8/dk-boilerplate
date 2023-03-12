import _isString from 'lodash/isString';

import { TypeFieldValidator } from 'models';

import { messages } from '../messages';

function isEmptyString({ value }: { value: string }) {
  return value === '';
}

function isEmptyArray({ value }: { value: Array<any> }) {
  return value.length === 0;
}

function isNotTrue({ value }: { value: boolean }) {
  return value !== true;
}

function isNull({ value }: { value: any }) {
  return value == null;
}

function notPhone({ value }: { value: any }) {
  if (value === '') return false;

  return !_isString(value) || !/\+\d{1,20}/.test(value);
}

function notNumeric({ value }: { value: any }) {
  if (value === '') return false;

  return !_isString(value) || !/\d+/.test(value);
}

function notEmail({ value }: { value: any }) {
  if (value === '') return false;

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return !_isString(value) || !re.test(value.toLowerCase());
}

function notExactLength(exactLength: number) {
  return ({ value }: { value: any }) => {
    if (value === '') return false;

    return !_isString(value) || value.length !== exactLength;
  };
}

function notEqual(notValidValue: string) {
  return ({ value }: { value: any }) => {
    if (value === '') return false;

    return !_isString(value) || value === notValidValue;
  };
}

function notHasMinChars(minLength: number) {
  return ({ value }: { value: any }) => {
    if (value === '') return false;

    return !_isString(value) || value.length < minLength;
  };
}

function notHasMaxChars(maxLength: number) {
  return ({ value }: { value: any }) => {
    if (value === '') return false;

    return !_isString(value) || value.length > maxLength;
  };
}

function notNumberMoreThan(maxValue: number) {
  return ({ value }: { value: any }) => {
    if (value === '') return false;

    const valueNumber = Number(value);

    return isNaN(valueNumber) || !isFinite(valueNumber) || valueNumber > maxValue;
  };
}

function notNumberLessThan(minValue: number) {
  return ({ value }: { value: any }) => {
    if (value === '') return false;

    const valueNumber = Number(value);

    return isNaN(valueNumber) || !isFinite(valueNumber) || valueNumber < minValue;
  };
}

function zeroNumber({ value }: { value: any }) {
  if (value === '') return false;

  const valueNumber = Number(value);

  return isNaN(valueNumber) || !isFinite(valueNumber) || valueNumber === 0;
}

export const fieldValidators = {
  emptyString: {
    notValidCheck: isEmptyString,
    message: messages.validatorEmpty,
  } as TypeFieldValidator,
  emptyArray: {
    notValidCheck: isEmptyArray,
    message: messages.validatorEmpty,
  } as TypeFieldValidator,
  notTrue: {
    notValidCheck: isNotTrue,
    message: messages.validatorNotTrue,
  } as TypeFieldValidator,
  phone: {
    notValidCheck: notPhone,
    message: messages.validatorPhone,
  } as TypeFieldValidator,
  email: {
    notValidCheck: notEmail,
    message: messages.validatorEmail,
  } as TypeFieldValidator,
  numeric: {
    notValidCheck: notNumeric,
    message: messages.validatorNumeric,
  } as TypeFieldValidator,
  isNull: {
    notValidCheck: isNull,
    message: messages.validatorEmpty,
  } as TypeFieldValidator,
  zeroNumber: {
    notValidCheck: zeroNumber,
    message: messages.validatorZero,
  } as TypeFieldValidator,
  exactLength: (
    exactLength: number,
    message?: TypeFieldValidator['message']
  ): TypeFieldValidator => ({
    notValidCheck: notExactLength(exactLength),
    message: message || messages.validatorExactLength,
    labelData: { length: exactLength },
  }),
  notEqual: (
    notValidValue: string,
    message?: TypeFieldValidator['message'],
    labelData?: TypeFieldValidator['labelData']
  ): TypeFieldValidator => ({
    notValidCheck: notEqual(notValidValue),
    message: message || messages.validatorNotEqual,
    labelData: labelData || { value: notValidValue },
  }),
  minLength: (minLength: number): TypeFieldValidator => ({
    notValidCheck: notHasMinChars(minLength),
    message: messages.validatorMinLength,
    labelData: { length: minLength },
  }),
  maxLength: (maxLength: number): TypeFieldValidator => ({
    notValidCheck: notHasMaxChars(maxLength),
    message: messages.validatorMaxLength,
    labelData: { length: maxLength },
  }),
  maxNumber: (maxValue: number): TypeFieldValidator => ({
    notValidCheck: notNumberMoreThan(maxValue),
    message: messages.validatorMaxNumber,
    labelData: { maxValue },
  }),
  minNumber: (minValue: number): TypeFieldValidator => ({
    notValidCheck: notNumberLessThan(minValue),
    message: messages.validatorMinNumber,
    labelData: { minValue },
  }),
};
