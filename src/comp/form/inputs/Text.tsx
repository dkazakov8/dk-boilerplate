import cn from 'classnames';
import { ChangeEvent } from 'react';

import { Icon } from 'comp/icon';
import { Label } from 'comp/form/elements/Label';
import { Errors } from 'comp/form/elements/Errors';
import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { TypeFormConfig, TypeInputTextConfig } from 'models';
import { system } from 'const';
import { appendAutorun, generateInputId } from 'utils';

import { isValidFn } from '../handlers/isValidFn';
import { handleBlur } from '../handlers/handleBlur';
import { handleFocus } from '../handlers/handleFocus';
import { handleChange } from '../handlers/handleChange';
import { updateInputConfig } from '../handlers/updateInputConfig';
import styles from '../Form.scss';

export type PropsText<T extends TypeFormConfig<T>> = {
  name: keyof T;
  formConfig: T;
  inputConfig: TypeInputTextConfig;
  initialData?: Partial<TypeInputTextConfig>;
};

export class Text<T extends TypeFormConfig<T>> extends ConnectedComponent<PropsText<T>> {
  get wrapperClassName() {
    const { inputConfig } = this.props;

    return cn({
      [styles.inputWrapper]: true,
      [styles.focused]: inputConfig.isFocused,
      [styles.noClear]: inputConfig.noClear || inputConfig.disabled,
      [styles.disabled]: inputConfig.disabled,
      [styles.hasValue]: inputConfig.value !== '',
      [styles.hasErrors]: inputConfig.errors.length > 0,
      [inputConfig.className!]: Boolean(inputConfig.className),
    });
  }

  isValidFn = isValidFn(this.props.inputConfig);
  handleBlur = handleBlur(this, this.props.inputConfig);
  handleFocus = handleFocus(this);
  updateInputConfig = updateInputConfig(this.props.inputConfig);

  handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(this, this.props.inputConfig, event.target.value || '');
  };

  handleClearValue = () => {
    handleChange(this, this.props.inputConfig, this.props.inputConfig.emptyValue || '');
    this.isValidFn();
    this.props.initialData?.onClear?.();
  };

  UNSAFE_componentWillMount() {
    const { inputConfig, name, initialData } = this.props;

    const initialInputConfig = {
      id: initialData?.id || generateInputId(`_${name}`),
      value: initialData?.value || inputConfig.value,
      disabled: initialData?.disabled || inputConfig.disabled,
      isFocused: false,
      isValidFn: this.isValidFn,
      validators: inputConfig.validators || {},
      label: initialData?.label || inputConfig.label,
      className: initialData?.className || inputConfig.className,
      prependComponent: initialData?.prependComponent || inputConfig.prependComponent,
    };

    this.updateInputConfig(initialInputConfig);

    appendAutorun(this, this.onDisabledChange);
  }

  onDisabledChange = () => {
    const { inputConfig } = this.props;

    if (inputConfig.disabled === true && inputConfig.errors.length) {
      updateInputConfig(inputConfig)({ errors: [] });
    }
  };

  render() {
    const { getLn } = this.context;
    const { name, inputConfig, initialData } = this.props;

    const isTextarea = inputConfig.type === 'textarea';

    const maxLengthWithDefault =
      // eslint-disable-next-line no-nested-ternary
      typeof inputConfig.maxLength === 'number'
        ? inputConfig.maxLength
        : isTextarea
        ? system.TEXTAREA_MAX_LENGTH
        : system.INPUT_MAX_LENGTH;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Component = isTextarea ? 'textarea' : 'input';

    const componentProps = {
      id: inputConfig.id,
      name,
      type: isTextarea ? undefined : 'text',
      value: inputConfig.value,
      disabled: inputConfig.disabled,
      tabIndex: inputConfig.tabIndex,
      autoFocus: inputConfig.autoFocus,
      autoComplete: inputConfig.autoComplete,
      maxLength: maxLengthWithDefault,
      placeholder: inputConfig.placeholder ? getLn(inputConfig.placeholder) : undefined,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onChange: this.handleChange,
    };

    return (
      <div className={this.wrapperClassName}>
        <Label
          inputConfig={inputConfig}
          labelData={initialData?.labelData || inputConfig.labelData}
        />
        <div className={styles.inputInner}>
          {inputConfig.prependComponent != null && inputConfig.prependComponent()}

          <Component {...componentProps} />

          {inputConfig.value.length > 0 && !inputConfig.noClear && !inputConfig.disabled && (
            <Icon
              id={`${componentProps.id}__reset`}
              glyph={'closeCircle'}
              className={styles.iconReset}
              onClick={this.handleClearValue}
            />
          )}

          {inputConfig.appendComponent != null && inputConfig.appendComponent()}
        </div>

        {!inputConfig.hideErrors && <Errors errors={inputConfig.errors} />}
      </div>
    );
  }
}
