import { ReactNode } from 'react';

// eslint-disable-next-line import/no-restricted-paths
import { PropsIcon } from '../comp/icon';

export type TypeConfirm = {
  // System
  isLeaving: boolean;
  isEntering: boolean;

  icon?: PropsIcon['glyph'];
  svg?: string;
  iconClassName?: string;
  text?: string;
  title: string;
  titleComponent?: () => ReactNode;
  image?: string;
  onReject?: () => void;
  onConfirm?: () => void;
  rejectText?: string;
  confirmText?: string;
  buttonsInColumn?: boolean;
  hideRejectButton?: boolean;
  restrictCloseOnBackdrop?: boolean;
  className?: string;
};
