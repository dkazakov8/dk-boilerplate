import cn from 'classnames';
import { ReactNode } from 'react';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Link } from 'comp/link';
import { routes, TypeRouteValues } from 'routes';

import { messages } from './messages';
import styles from './Layout.scss';

export class Layout extends ConnectedComponent<{ children: ReactNode }, TypeRouteValues> {
  render() {
    const { getLn, store } = this.context;

    return (
      <div className={styles.wrapper}>
        <div className={styles.menu}>
          <Link<typeof routes.first2>
            route={routes.first2}
            className={cn(
              styles.menuItem,
              store.router.currentRoute.name === routes.first2.name && styles.isActive
            )}
          >
            {getLn(messages.linkFirst)}
          </Link>
          <Link
            route={routes.second}
            params={{ id: '123' }}
            className={cn(
              styles.menuItem,
              store.router.currentRoute.name === routes.second.name && styles.isActive
            )}
          >
            {getLn(messages.linkSecond)}
          </Link>
        </div>
        <div className={styles.content}>{this.props.children}</div>
      </div>
    );
  }
}
