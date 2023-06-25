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

    const links = [
      { route: routes.first2, title: getLn(messages.linkFirst) },
      { route: routes.second, title: getLn(messages.linkSecond) },
    ];

    return (
      <div className={styles.wrapper}>
        <div className={styles.menu}>
          {links.map((link) => {
            return (
              <Link
                key={link.title}
                route={link.route}
                className={cn(
                  styles.menuItem,
                  store.router.currentRoute.name === link.route.name && styles.isActive
                )}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
        <div className={styles.content}>{this.props.children}</div>
      </div>
    );
  }
}
