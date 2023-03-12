import { MouseEvent, ReactNode, RefObject } from 'react';
import cn from 'classnames';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Icon, PropsIcon } from 'comp/icon';
import { Ripple } from 'comp/ripple';
import { TypeRouteValues } from 'routes';

import styles from './Button.scss';

export type PropsButton<T extends TypeRouteValues> = {
  type: 'grey' | 'yellow' | 'white' | 'black';
  size?: 'small' | 'medium';
  iconLeft?: PropsIcon['glyph'];
  iconRight?: PropsIcon['glyph'];
  route?: T;
  active?: boolean;
  params?: T['params'];
  element?: 'submit' | 'a' | 'label';
  onClick?: (event?: MouseEvent) => undefined | boolean | void;
  iconOnly?: PropsIcon['glyph'];
  children?: ReactNode;
  disabled?: boolean;
  tabIndex?: number;
  className?: string;
  isLoading?: boolean;
  forwardRef?: RefObject<HTMLDivElement | HTMLAnchorElement>;
  linkRegularSrc?: string;
  htmlFor?: string;
  id?: string;
  hidden?: boolean;
  smallInMobile?: boolean;
};

export class Button<T extends TypeRouteValues> extends ConnectedComponent<PropsButton<T>> {
  get wrapperClassName() {
    const {
      type,
      size,
      active,
      element,
      iconLeft,
      disabled,
      iconOnly,
      iconRight,
      className,
      isLoading,
      smallInMobile,
    } = this.props;

    return cn({
      [styles.button]: true,
      [styles.small]: size === 'small',
      [styles.medium]: size === 'medium' || !size,
      [styles.smallInMobile]: smallInMobile,
      [styles[type]]: Boolean(styles[type]),
      [styles.disabled]: Boolean(disabled),
      [styles.active]: Boolean(active),
      [styles.hasIcon]: Boolean(iconLeft || iconRight || iconOnly),
      [styles.isLoading]: Boolean(isLoading),
      [styles.isSubmit]: element === 'submit',
      [styles.iconLeft]: Boolean(iconLeft && !iconRight),
      [styles.iconOnly]: Boolean(iconOnly),
      [styles.iconRight]: Boolean(iconRight && !iconLeft),
      [styles.iconBoth]: Boolean(iconLeft && iconRight),
      [className as string]: Boolean(className),
    });
  }

  handleClick = (event: MouseEvent) => {
    const { actions } = this.context;
    const { route, onClick, disabled, params, isLoading } = this.props;

    if (disabled || isLoading) return;

    if (onClick && onClick(event) === false) return;

    if (route) void actions.routing.redirectTo({ route, params });
  };

  render() {
    const {
      id,
      hidden,
      htmlFor,
      element,
      iconLeft,
      iconOnly,
      children,
      tabIndex,
      disabled,
      iconRight,
      isLoading,
      forwardRef,
      linkRegularSrc,
    } = this.props;

    if (element === 'submit' && hidden) {
      return (
        <div onClick={this.handleClick} className={styles.hidden}>
          <input type={'submit'} value={''} tabIndex={tabIndex} disabled={disabled} />
        </div>
      );
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    let Element: any = 'div';
    if (element === 'a') Element = 'a';
    if (element === 'label') Element = 'label';

    return (
      <Element
        className={this.wrapperClassName}
        onClick={this.handleClick}
        ref={forwardRef}
        href={linkRegularSrc}
        htmlFor={htmlFor}
        id={id}
      >
        {Boolean(iconLeft) && <Icon glyph={iconLeft!} className={styles.icon} />}

        {Boolean(iconOnly) && <Icon glyph={iconOnly!} className={styles.icon} />}

        {!isLoading && !iconOnly && <span>{children}</span>}

        {element === 'submit' && (
          <input type={'submit'} value={''} tabIndex={tabIndex} disabled={disabled} />
        )}

        {isLoading && <div className={styles.loader} />}

        {Boolean(iconRight) && <Icon glyph={iconRight!} className={styles.icon} />}

        <Ripple rippleClassName={styles.ripple} />
      </Element>
    );
  }
}
