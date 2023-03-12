import { wrapMessages } from 'dk-localize';

export const messages = wrapMessages(__dirname, {
  pageTitleSuffix: 'Page',
  notificationUpdateApp: 'We’ve made some updates, please refresh the page',
  notificationUpdateAppConfirm: 'Reload',

  INTERNAL_SERVER_ERROR: 'Server error',
  VALIDATION: 'Incorrect data received',

  validatorNotTrue: 'Field should be checked',
  validatorEmpty: 'Field should not be empty',
  validatorValidDate: 'Date is not valid',
  validatorEmail: 'Fill in correct email',
  validatorNumeric: 'Fill in numeric characters',
  validatorPhone: 'Incorrect phone number',
  validatorMinDate: 'The date should be after {date}',
  validatorMaxDate: 'The date should be before {date}',
  validatorExactLength: 'The length should equal {length}',
  validatorNotEqual: 'Field should not equal "{value}"',
  validatorMinLength: 'The length should be no less than {length}',
  validatorMaxLength: 'The length should be no more than {length}',
  validatorMaxNumber: 'Value should be less or equal {maxValue}',
  validatorMinNumber: 'Value should be more or equal {minValue}',
  validatorZero: 'Value should be more than 0',
});
