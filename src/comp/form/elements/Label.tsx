import { MouseEvent } from 'react';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { TypeAnyInput } from 'models';

type PropsLabel = {
  onClick?: (event?: MouseEvent) => void;
  className?: string;
  labelData?: Record<string, any>;
  inputConfig: TypeAnyInput;
};

export class Label extends ConnectedComponent<PropsLabel> {
  render() {
    const { getLn } = this.context;
    const { onClick, className, labelData, inputConfig } = this.props;

    if (!inputConfig.label) return null;

    const isRequired = Object.keys(inputConfig.validators).some(
      (validatorName) => validatorName === 'emptyString' || validatorName === 'emptyArray'
    );

    let text =
      typeof inputConfig.label === 'object'
        ? getLn(inputConfig.label, labelData)
        : (inputConfig.label as unknown as string);

    if (isRequired) text += ' *';

    return (
      <label htmlFor={inputConfig.id} onClick={onClick} className={className}>
        {text}
      </label>
    );
  }
}
