import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { TypeInputErrors } from 'models';

import styles from '../Form.scss';

type PropsErrors = {
  errors?: TypeInputErrors;
};

export class Errors extends ConnectedComponent<PropsErrors> {
  render() {
    const { getLn } = this.context;
    const { errors } = this.props;

    if (!errors || errors.length === 0) return null;

    return (
      <div className={styles.errors}>
        {errors.map((errorObject) => (
          <div className={styles.errorItem} key={errorObject.message.name}>
            {typeof errorObject.message === 'object'
              ? getLn(errorObject.message, errorObject.labelData)
              : (errorObject.message as unknown as string)}
          </div>
        ))}
      </div>
    );
  }
}
