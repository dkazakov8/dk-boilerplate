import cn from 'classnames';

import { Label } from 'comp/form/elements/Label';
import { Errors } from 'comp/form/elements/Errors';
import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { TypeFormConfig, TypeInputCheckboxConfig } from 'models';
import { appendAutorun, generateInputId } from 'utils';

import { isValidFn } from '../handlers/isValidFn';
import { updateInputConfig } from '../handlers/updateInputConfig';
import styles from '../Form.scss';

export type PropsCheckbox<T extends TypeFormConfig<T>> = {
  name: keyof T;
  inputRef: (...args: Array<any>) => any;
  formConfig: T;
  inputConfig: TypeInputCheckboxConfig;
  initialData?: Partial<TypeInputCheckboxConfig>;
};

export class Checkbox<T extends TypeFormConfig<T>> extends ConnectedComponent<PropsCheckbox<T>> {
  get wrapperClassName() {
    const { inputConfig } = this.props;

    return cn({
      [styles.inputWrapper]: true,
      [styles.checkbox]: true,
      [styles.checked]: inputConfig.value,
      [styles.focused]: inputConfig.isFocused,
      [styles.disabled]: inputConfig.disabled,
      [styles.hasErrors]: inputConfig.errors.length > 0,
      [inputConfig.className!]: Boolean(inputConfig.className),
    });
  }

  isValidFn = isValidFn(this.props.inputConfig);
  updateInputConfig = updateInputConfig(this.props.inputConfig);

  handleChange = () => this.updateInputConfig({ value: !this.props.inputConfig.value });

  UNSAFE_componentWillMount() {
    const { inputConfig, name, initialData } = this.props;

    const initialInputConfig = {
      id: generateInputId(`_${name}`),
      value: typeof initialData?.value !== 'undefined' ? initialData.value : inputConfig.value,
      disabled: initialData?.disabled || inputConfig.disabled,
      isFocused: false,
      isValidFn: this.isValidFn,
      validators: inputConfig.validators || {},
      className: initialData?.className || inputConfig.className,
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
    const { name, inputConfig, initialData, inputRef } = this.props;

    return (
      <div className={this.wrapperClassName} onClick={this.handleChange}>
        <Label
          inputConfig={inputConfig}
          labelData={initialData?.labelData || inputConfig.labelData}
          onClick={(e) => e?.preventDefault()}
        />
        <input
          type={'checkbox'}
          id={inputConfig.id}
          ref={inputRef}
          name={name}
          checked={inputConfig.value}
          disabled={inputConfig.disabled}
          tabIndex={inputConfig.tabIndex}
          autoFocus={inputConfig.autoFocus}
          onChange={() => true}
        />
        <div className={styles.toggle}>
          <div className={styles.toggleInner} />
        </div>
        <Errors errors={inputConfig.errors} />
      </div>
    );
  }
}
