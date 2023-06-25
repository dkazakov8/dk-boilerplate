import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { errorCodes } from 'const';
import error404 from 'assets/images/error404.svg';
import error500 from 'assets/images/error500.svg';
import { Icon } from 'comp/icon';

import styles from './Error.scss';
import { messages } from './messages';

export type PropsErrorPage = {
  errorNumber: typeof errorCodes.INTERNAL_ERROR | typeof errorCodes.NOT_FOUND;
};

// eslint-disable-next-line import/no-default-export
export default class Error extends ConnectedComponent<PropsErrorPage> {
  UNSAFE_componentWillMount() {
    const { actions } = this.context;

    void actions.routing.setMetaData({
      title: messages.metaTitle,
    });
  }

  render() {
    const { getLn } = this.context;
    const { errorNumber } = this.props;

    if (errorNumber === errorCodes.NOT_FOUND) {
      return (
        <div className={styles.content}>
          <div className={styles.image} dangerouslySetInnerHTML={{ __html: error404 }} />
          <div className={styles.title}>{getLn(messages.error404Title)}</div>
        </div>
      );
    }

    return (
      <div className={styles.content}>
        <a href={'/'} className={styles.logoLink}>
          <Icon glyph={'logo'} className={styles.logo} />
        </a>
        <div className={styles.image} dangerouslySetInnerHTML={{ __html: error500 }} />
        <div className={styles.title}>{getLn(messages.error500Title)}</div>
        <div className={styles.subtitle}>{getLn(messages.error500Subtitle)}</div>
      </div>
    );
  }
}
