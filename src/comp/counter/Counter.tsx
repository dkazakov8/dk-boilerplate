import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Button } from 'comp/button';

import styles from './Counter.scss';

type PropsCounter = {
  value: number;
  title: string;
  isLoading: boolean;

  onIncrease: () => void;
};

export class Counter extends ConnectedComponent<PropsCounter> {
  render() {
    const { value, title, isLoading, onIncrease } = this.props;

    const text = 'Increase';

    return (
      <div className={styles.counterWrapper}>
        <div className={styles.counterTitle}>{title}</div>
        <div className={styles.counter}>
          <div className={styles.value}>{value}</div>
          <Button
            type={'grey'}
            size={'small'}
            className={styles.button}
            onClick={onIncrease}
            isLoading={isLoading}
          >
            {text}
          </Button>
        </div>
      </div>
    );
  }
}
