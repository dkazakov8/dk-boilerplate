import { wrapMessages } from 'dk-localize';

// eslint-disable-next-line import/no-unused-modules
export const messages = wrapMessages(__dirname, {
  labelRegular: 'Regular input',
  noLabel: 'Regular  (no label)',
  labelRegularWithDefault: 'With default value',
  labelRegularWithLong: 'With long value',
  emptyRestricted: 'Empty restricted',
  emptyRestrictedNoText: 'Empty restricted (hide error text)',
  regularNoClear: 'Clear button hidden',
  prepend: 'With prepend component',
  prependDisabled: 'With prepend component (disabled)',
  prependNoClear: 'With prepend component (clear button hidden)',
  append: 'With append component',
  appendDisabled: 'With append component (disabled)',
  appendNoClear: 'With append component (clear button hidden)',
  numeric: 'Numeric',
  numericLimited: 'Numeric (max length 4)',
  emptyValue: 'Empty value sets to asd',
  disabled: 'Disabled (no value)',
  disabledWithValue: 'Disabled (with value)',

  desktopCheckbox: 'Desktop (off)',
  desktopCheckboxLongLabel:
    'Some long text long text long text long text long text long text long text',
  desktopCheckboxOn: 'Desktop (on)',
  desktopCheckboxDisabled: 'Desktop disabled (off)',
  desktopCheckboxDisabledOn: 'Desktop disabled (on)',
  mobileCheckbox: 'Mobile (off)',
  mobileCheckboxOn: 'Mobile (on)',
  mobileCheckboxDisabled: 'Mobile disabled (off)',
  mobileCheckboxDisabledOn: 'Mobile disabled (on)',
});
