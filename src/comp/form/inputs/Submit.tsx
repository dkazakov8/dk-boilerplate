import _values from 'lodash/values';

import { transformers } from 'compSystem/transformers';
import { Button } from 'comp/button';
import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { appendAutorun, getFormInputsConfig } from 'utils';
import { TypeAnyInput, TypeFormConfig, TypeInputSubmitConfig } from 'models';

import { updateInputConfig } from '../handlers/updateInputConfig';

export type PropsSubmit<T> = {
  formConfig: T;
  inputConfig: TypeInputSubmitConfig;
  initialData?: Partial<TypeInputSubmitConfig>;
  onClick: () => void;
  hidden?: boolean;
};

export class Submit<T extends TypeFormConfig<T>> extends ConnectedComponent<PropsSubmit<T>> {
  UNSAFE_componentWillMount() {
    const { inputConfig, initialData } = this.props;

    const initialInputConfig = {
      id: initialData?.id || inputConfig.id,
      label: initialData?.label || inputConfig.label,
      labelData: initialData?.labelData || inputConfig.labelData,
      buttonType: initialData?.buttonType || inputConfig.buttonType,
      buttonProps: initialData?.buttonProps || inputConfig.buttonProps,
      className: initialData?.className || inputConfig.className,
    };

    this.updateInputConfig(initialInputConfig);
  }

  componentDidMount() {
    const { inputConfig } = this.props;

    if (!inputConfig.notDisabledOnValidationError) {
      appendAutorun(this, this.setDisabled);
    }
  }

  setDisabled = () => {
    const { formConfig, inputConfig } = this.props;

    const formConfigWithoutSystem = getFormInputsConfig<typeof formConfig>(formConfig);

    const isDisabled = _values(formConfigWithoutSystem).some(
      // @ts-ignore
      (config: TypeAnyInput) => {
        if (config.validators.emptyString) {
          return !config.isValidFn?.(true);
        }

        if (config.validators.emptyArray) {
          return !config.isValidFn?.(true);
        }

        return false;
      }
    );

    transformers.batch(() => (inputConfig.disabled = isDisabled));
  };

  updateInputConfig = updateInputConfig(this.props.inputConfig as any);

  render() {
    const { getLn } = this.context;
    const { inputConfig, formConfig, onClick, hidden } = this.props;

    return (
      <Button
        {...inputConfig.buttonProps}
        type={inputConfig.buttonType || 'yellow'}
        element={'submit'}
        onClick={onClick}
        id={inputConfig.id}
        tabIndex={inputConfig.tabIndex}
        disabled={inputConfig.disabled}
        className={inputConfig.className}
        isLoading={inputConfig.buttonProps?.isLoading || formConfig.SYSTEM.isSubmitting}
        hidden={hidden}
      >
        {getLn(inputConfig.label, inputConfig.labelData)}
      </Button>
    );
  }
}
