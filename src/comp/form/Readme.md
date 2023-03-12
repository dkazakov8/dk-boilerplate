```jsx 
import styles from './sg.scss';
import { StoreContext } from '../../compSystem/StoreContext';
import { Icon } from '../icon';
import { Button } from '../button';
import { fieldValidators, fieldFormatters } from '../../utils';
import { messages } from './messagesSg';
import { observable } from 'mobx';

const context = React.useContext(StoreContext);

const longValue = 'very long value shoul work correctly correctly very long value shoul work correctly correctly very long value shoul work correctly correctly very long value shoul work correctly correctly';

const formConfig = observable({
  regular: {
    type: 'text',
    value: '',
    validators: {},
    errors: [],
    label: messages.labelRegular,
    placeholder: messages.labelRegular,
  },
  regularNoLabel: {
    type: 'text',
    value: '',
    validators: {},
    errors: [],
    placeholder: messages.noLabel,
  },
  regularWithDefault: {
    type: 'text',
    value: 'default value',
    validators: {},
    errors: [],
    label: messages.labelRegularWithDefault,
    placeholder: messages.labelRegularWithDefault,
  },
  regularWithLong: {
    type: 'text',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.labelRegularWithLong,
    placeholder: messages.labelRegularWithLong,
  },
  regularNoClear: {
    type: 'text',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.regularNoClear,
    placeholder: messages.regularNoClear,
    noClear: true,
  },
  emptyRestricted: {
    type: 'text',
    value: '',
    validators: { emptyString: fieldValidators.emptyString },
    errors: [],
    label: messages.emptyRestricted,
    placeholder: messages.emptyRestricted,
  },
  emptyRestrictedNoText: {
    type: 'text',
    value: '',
    validators: { emptyString: fieldValidators.emptyString },
    errors: [],
    label: messages.emptyRestrictedNoText,
    placeholder: messages.emptyRestrictedNoText,
    hideErrors: true,
  },
  prepend: {
    type: 'text',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.prepend,
    placeholder: messages.prepend,
    prependComponent: () => <Icon glyph={'idCard'} className={styles.prepend} />,
  },
  prependNoClear: {
    type: 'text',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.prependNoClear,
    placeholder: messages.prependNoClear,
    prependComponent: () => <Button size={'small'} type={'grey'} className={styles.prepend}>Button</Button>,
    noClear: true,
  },
  append: {
    type: 'text',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.append,
    placeholder: messages.append,
    appendComponent: () => <Icon glyph={'idCard'} className={styles.append} />,
  },
  appendNoClear: {
    type: 'text',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.appendNoClear,
    placeholder: messages.appendNoClear,
    appendComponent: () => <Button size={'small'} type={'grey'} className={styles.append}>Button</Button>,
    noClear: true,
  },
  numeric: {
    type: 'text',
    value: '',
    validators: {},
    formatters: { removeNotNumeric: fieldFormatters.removeNotNumeric },
    errors: [],
    label: messages.numeric,
    placeholder: messages.numeric,
  },
  numericLimited: {
    type: 'text',
    value: '',
    validators: {},
    formatters: { removeNotNumeric: fieldFormatters.removeNotNumeric },
    errors: [],
    label: messages.numericLimited,
    placeholder: messages.numericLimited,
    maxLength: 4,
  },
  emptyValue: {
    type: 'text',
    value: 'asd',
    emptyValue: 'asd',
    validators: {},
    errors: [],
    label: messages.emptyValue,
    placeholder: messages.emptyValue,
  },
  disabled: {
    type: 'text',
    value: '',
    validators: {},
    errors: [],
    label: messages.disabled,
    placeholder: messages.disabled,
    disabled: true,
  },
  disabledWithValue: {
    type: 'text',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.disabledWithValue,
    placeholder: messages.disabledWithValue,
    disabled: true,
  },
  prependDisabled: {
    type: 'text',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.prependDisabled,
    placeholder: messages.prependDisabled,
    prependComponent: () => <Icon glyph={'idCard'} className={styles.prepend} />,
    disabled: true,
  },
  appendDisabled: {
    type: 'text',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.appendDisabled,
    placeholder: messages.appendDisabled,
    appendComponent: () => <Icon glyph={'idCard'} className={styles.append} />,
    disabled: true,
  },

  SYSTEM: {
    isSubmitting: false,
    clear() {},
  },
});

const formConfigTextarea = observable({
  regular: {
    type: 'textarea',
    value: '',
    validators: {},
    errors: [],
    label: messages.labelRegular,
    placeholder: messages.labelRegular,
  },
  regularNoLabel: {
    type: 'textarea',
    value: '',
    validators: {},
    errors: [],
    placeholder: messages.noLabel,
  },
  regularWithDefault: {
    type: 'textarea',
    value: 'default value',
    validators: {},
    errors: [],
    label: messages.labelRegularWithDefault,
    placeholder: messages.labelRegularWithDefault,
  },
  regularWithLong: {
    type: 'textarea',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.labelRegularWithLong,
    placeholder: messages.labelRegularWithLong,
  },
  regularNoClear: {
    type: 'textarea',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.regularNoClear,
    placeholder: messages.regularNoClear,
    noClear: true,
  },
  emptyRestricted: {
    type: 'textarea',
    value: '',
    validators: { emptyString: fieldValidators.emptyString },
    errors: [],
    label: messages.emptyRestricted,
    placeholder: messages.emptyRestricted,
  },
  emptyRestrictedNoText: {
    type: 'textarea',
    value: '',
    validators: { emptyString: fieldValidators.emptyString },
    errors: [],
    label: messages.emptyRestrictedNoText,
    placeholder: messages.emptyRestrictedNoText,
    hideErrors: true,
  },
  prepend: {
    type: 'textarea',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.prepend,
    placeholder: messages.prepend,
    prependComponent: () => <Icon glyph={'idCard'} className={styles.prepend} />,
  },
  prependNoClear: {
    type: 'textarea',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.prependNoClear,
    placeholder: messages.prependNoClear,
    prependComponent: () => <Button size={'small'} type={'grey'} className={styles.prepend}>Button</Button>,
    noClear: true,
  },
  append: {
    type: 'textarea',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.append,
    placeholder: messages.append,
    appendComponent: () => <Icon glyph={'idCard'} className={styles.append} />,
  },
  appendNoClear: {
    type: 'textarea',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.appendNoClear,
    placeholder: messages.appendNoClear,
    appendComponent: () => <Button size={'small'} type={'grey'} className={styles.append}>Button</Button>,
    noClear: true,
  },
  numeric: {
    type: 'textarea',
    value: '',
    validators: {},
    formatters: { removeNotNumeric: fieldFormatters.removeNotNumeric },
    errors: [],
    label: messages.numeric,
    placeholder: messages.numeric,
  },
  numericLimited: {
    type: 'textarea',
    value: '',
    validators: {},
    formatters: { removeNotNumeric: fieldFormatters.removeNotNumeric },
    errors: [],
    label: messages.numericLimited,
    placeholder: messages.numericLimited,
    maxLength: 4,
  },
  emptyValue: {
    type: 'textarea',
    value: 'asd',
    emptyValue: 'asd',
    validators: {},
    errors: [],
    label: messages.emptyValue,
    placeholder: messages.emptyValue,
  },
  disabled: {
    type: 'textarea',
    value: '',
    validators: {},
    errors: [],
    label: messages.disabled,
    placeholder: messages.disabled,
    disabled: true,
  },
  disabledWithValue: {
    type: 'textarea',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.disabledWithValue,
    placeholder: messages.disabledWithValue,
    disabled: true,
  },
  prependDisabled: {
    type: 'textarea',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.prependDisabled,
    placeholder: messages.prependDisabled,
    prependComponent: () => <Icon glyph={'idCard'} className={styles.prepend} />,
    disabled: true,
  },
  appendDisabled: {
    type: 'textarea',
    value: longValue,
    validators: {},
    errors: [],
    label: messages.appendDisabled,
    placeholder: messages.appendDisabled,
    appendComponent: () => <Icon glyph={'idCard'} className={styles.append} />,
    disabled: true,
  },

  SYSTEM: {
    isSubmitting: false,
    clear() {},
  },
});

const formConfigCheckbox = observable({
  desktopCheckbox: {
    type: 'checkbox',
    value: false,
    validators: {},
    errors: [],
    label: messages.desktopCheckbox,
  },
  desktopCheckboxLongLabel: {
    type: 'checkbox',
    value: false,
    validators: {},
    errors: [],
    label: messages.desktopCheckboxLongLabel,
  },
  desktopCheckboxOn: {
    type: 'checkbox',
    value: true,
    validators: {},
    errors: [],
    label: messages.desktopCheckboxOn,
  },
  desktopCheckboxDisabled: {
    type: 'checkbox',
    value: false,
    validators: {},
    errors: [],
    label: messages.desktopCheckboxDisabled,
    disabled: true,
  },
  desktopCheckboxDisabledOn: {
    type: 'checkbox',
    value: true,
    validators: {},
    errors: [],
    label: messages.desktopCheckboxDisabledOn,
    disabled: true,
  },

  SYSTEM: {
    isSubmitting: false,
    clear() {},
  },
});

const formConfigCheckboxMobile = observable({
  mobileCheckbox: {
    type: 'checkbox',
    value: false,
    validators: {},
    errors: [],
    label: messages.desktopCheckbox,
  },
  mobileCheckboxLongLabel: {
    type: 'checkbox',
    value: false,
    validators: {},
    errors: [],
    label: messages.desktopCheckboxLongLabel,
  },
  mobileCheckboxOn: {
    type: 'checkbox',
    value: true,
    validators: {},
    errors: [],
    label: messages.desktopCheckboxOn,
  },
  mobileCheckboxDisabled: {
    type: 'checkbox',
    value: false,
    validators: {},
    errors: [],
    label: messages.desktopCheckboxDisabled,
    disabled: true,
  },
  mobileCheckboxDisabledOn: {
    type: 'checkbox',
    value: true,
    validators: {},
    errors: [],
    label: messages.desktopCheckboxDisabledOn,
    disabled: true,
  },

  SYSTEM: {
    isSubmitting: false,
    clear() {},
  },
});

setTimeout(() => {
  formConfig.emptyRestricted.isValidFn();
  formConfig.emptyRestrictedNoText.isValidFn();

  formConfigTextarea.emptyRestricted.isValidFn();
  formConfigTextarea.emptyRestrictedNoText.isValidFn();
}, 0);

<div className={styles.root}>
  <div className={styles.label}>Text input</div>
  <Form formConfig={formConfig} className={styles.form}>
    {({inputs, submit}) => (
      <>
        {Object.values(inputs).map(input => input)}
      </>
    )}
  </Form>
  <div className={styles.label}>Textarea input</div>
  <Form formConfig={formConfigTextarea} className={styles.form}>
    {({inputs, submit}) => (
      <>
        {Object.values(inputs).map(input => input)}
      </>
    )}
  </Form>
  <div className={styles.label}>Checkbox (desktop)</div>
  <Form formConfig={formConfigCheckbox} className={styles.formCheckbox}>
    {({inputs, submit}) => (
      <>
        {Object.values(inputs).map(input => input)}
      </>
    )}
  </Form>
  <div className={styles.label}>Checkbox (mobile)</div>
  <Form formConfig={formConfigCheckboxMobile} className={`${styles.formCheckbox} mobile`}>
    {({inputs, submit}) => (
      <>
        {Object.values(inputs).map(input => input)}
      </>
    )}
  </Form>
</div>
```