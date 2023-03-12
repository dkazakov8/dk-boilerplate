import { TypeMessage } from 'dk-localize';

export type TypeFieldValidator = {
  message: TypeMessage;
  labelData?: Record<string, any>;
  notValidCheck: (params: { value: any }) => boolean;
};
