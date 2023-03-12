import { TypeMessage } from 'dk-localize';

// eslint-disable-next-line import/no-restricted-paths
import { PropsButton } from '../../comp/button';

export type TypeInputSubmitConfig = {
  type: 'submit';
  label: TypeMessage;

  id?: string;
  disabled?: boolean;
  tabIndex?: number;
  className?: string;
  labelData?: Record<string, any>;
  buttonType?: PropsButton<any>['type'];
  buttonProps?: Partial<PropsButton<any>>;
  notDisabledOnValidationError?: boolean;
};
