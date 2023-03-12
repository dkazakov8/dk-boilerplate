import { TypeAnyInput } from './TypeAnyInput';
import { TypeInputSubmitConfig } from './TypeInputSubmitConfig';

export type TypeFormSystem = {
  SYSTEM: {
    isSubmitting: boolean;
    clear: ({ formConfigInStore }: { formConfigInStore: any }) => void;
  };
  submit?: TypeInputSubmitConfig;
};

export type TypeFormConfig<T> = TypeFormSystem & {
  [Key in keyof Omit<T, 'SYSTEM' | 'submit'>]: TypeAnyInput;
};

export type TypeFormConfigFields<T extends TypeFormSystem> = Omit<T, 'SYSTEM' | 'submit'>;
