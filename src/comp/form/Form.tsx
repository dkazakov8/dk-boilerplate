/* eslint-disable @typescript-eslint/naming-convention */

import _mapValues from 'lodash/mapValues';
import _omit from 'lodash/omit';
import { FormEvent, ReactNode } from 'react';

import { transformers } from 'compSystem/transformers';
import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { TypeFormConfig, TypeFormSubmit, TypeInputTextConfig, TypeAnyInput } from 'models';
import { getFormInputsConfig, getNotValidFieldsIds, scrollToFirstElement } from 'utils';

import { Text } from './inputs/Text';
import { Submit } from './inputs/Submit';
import { Checkbox } from './inputs/Checkbox';

type TypeAnyInputComponent = typeof Text | typeof Checkbox;

type TypeChildrenProps<T> = { inputs: Record<keyof T, ReactNode>; submit: ReactNode };

export type TypeInitialData<T> = { [Key in keyof T]?: Partial<T[Key]> };

type PropsForm<T extends TypeFormConfig<T>> = {
  onSubmit?: TypeFormSubmit<T>;
  formConfig: T;
  className?: string;
  initialData?: TypeInitialData<T>;
  children: (childrenProps: TypeChildrenProps<T>) => ReactNode;
  hiddenSubmit?: boolean;
};

export class Form<T extends TypeFormConfig<T>> extends ConnectedComponent<PropsForm<T>> {
  componentsMapper: Record<TypeAnyInput['type'], TypeAnyInputComponent> = {
    text: Text,
    phone: Text,
    password: Text,
    textarea: Text,
    checkbox: Checkbox,
  };

  handlePreventSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  handleFormSubmit = () => {
    const { store, actions } = this.context;
    const { formConfig, onSubmit } = this.props;

    if (formConfig.SYSTEM.isSubmitting || !onSubmit) return Promise.resolve();

    transformers.batch(() => (formConfig.SYSTEM.isSubmitting = true));

    const formConfigWithoutSystem = _omit(formConfig, ['SYSTEM', 'submit']);
    const formInputsValues = _mapValues(formConfigWithoutSystem, ({ value }) => value);
    const notValidFieldsIds = getNotValidFieldsIds({ formConfig });

    if (notValidFieldsIds.length) {
      transformers.batch(() => (formConfig.SYSTEM.isSubmitting = false));

      return store.ui.modal
        ? actions.ui.modalShake()
        : Promise.resolve(scrollToFirstElement(notValidFieldsIds));
    }

    // @ts-ignore
    return onSubmit(formInputsValues)
      .then(() => {
        transformers.batch(() => (formConfig.SYSTEM.isSubmitting = false));
      })
      .catch(() => {
        transformers.batch(() => (formConfig.SYSTEM.isSubmitting = false));
      });
  };

  render() {
    const { children, className, formConfig, initialData, hiddenSubmit } = this.props;

    const formConfigWithoutSystem = getFormInputsConfig<typeof formConfig>(formConfig);

    const childrenProps: TypeChildrenProps<T> = {
      // @ts-ignore
      inputs: _mapValues(
        formConfigWithoutSystem,
        (inputConfig: TypeInputTextConfig, name: keyof T) => {
          const Component = this.componentsMapper[inputConfig.type];

          return (
            // @ts-ignore
            <Component<T>
              key={name}
              name={name}
              formConfig={formConfig}
              inputConfig={inputConfig!}
              initialData={initialData?.[name]}
            />
          );
        }
      ),
    };

    if (formConfig.submit) {
      childrenProps.submit = (
        <Submit<T>
          formConfig={formConfig}
          inputConfig={formConfig.submit}
          initialData={initialData?.submit}
          onClick={this.handleFormSubmit}
          hidden={hiddenSubmit}
        />
      );
    }

    return (
      <form onSubmit={this.handlePreventSubmit} className={className}>
        {children(childrenProps)}
      </form>
    );
  }
}
