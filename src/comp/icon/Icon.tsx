import cn from 'classnames';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { icons } from 'assets/icons';

import styles from './Icon.scss';

export type PropsIcon = {
  id?: string;
  glyph: keyof typeof icons;
  title?: string;
  onClick?: any;
  className?: string;
  onMouseEnter?: () => void;
};

export class Icon extends ConnectedComponent<PropsIcon> {
  render() {
    const { glyph, className, ...props } = this.props;

    const iconContent = icons[glyph];

    if (!iconContent) {
      console.error(`Icon: no icon for glyph ${glyph}`);

      return null;
    }

    return (
      <div
        {...props}
        className={cn(styles.icon, className)}
        dangerouslySetInnerHTML={{ __html: iconContent }}
      />
    );
  }
}
