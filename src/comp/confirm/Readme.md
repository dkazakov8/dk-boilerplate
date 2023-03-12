```jsx 
import styles from './sg.scss';
import { StoreContext } from '../../compSystem/StoreContext';
import { Confirm } from './Confirm';
import { Button } from '../button';
import { images } from '../../assets/images';

const context = React.useContext(StoreContext);

const longText = `A short Title Is Best. A message could be a short, complete sentence`;

const openConfirm = (params) => {
  context.actions.ui.confirmRaise({
    title: 'A short Title Is Best.',
    ...params,
    onReject: removeMobile,
    onConfirm: removeMobile,
  });
}

const setMobile = () => document.body.classList.add('mobile');

const removeMobile = () => document.body.classList.remove('mobile');

const arr = [
  {text: 'Title only', action: (params) => openConfirm({...params}) },
  {text: 'Long title', action: (params) => openConfirm({ ...params, title: longText }) },
  {text: 'Buttons with custom text', action: (params) => openConfirm({ ...params, rejectText: 'Reject', confirmText: 'Confirm' }) },
  {text: 'Only confirm', action: (params) => openConfirm({ ...params, hideRejectButton: true }) },
  {text: 'Only confirm with custom text', action: (params) => openConfirm({ ...params, hideRejectButton: true, confirmText: 'Confirm' }) },
  {text: 'Buttons in column', action: (params) => openConfirm({...params, buttonsInColumn: true }) },
  {text: 'Buttons in column with custom text', action: (params) => openConfirm({...params, buttonsInColumn: true, rejectText: 'Reject', confirmText: 'Confirm' }) },
  {text: 'With image (large)', action: (params) => openConfirm({...params, image: images.example1 }) },
  {text: 'With image (small)', action: (params) => openConfirm({...params, image: images.example2 }) },
  {text: 'With text', action: (params) => openConfirm({...params, text: 'A message should be a short, complete sentence.' }) },
  {text: 'With icon', action: (params) => openConfirm({...params, icon: 'trashBin' }) },
  {text: 'Restrict backdrop click close', action: (params) => openConfirm({ ...params, restrictCloseOnBackdrop: true }) },
 ];

<div className={styles.root}>
  <Confirm />

  <div className={styles.label}>Confirm</div>
  <div className={styles.wrapper}>
    {arr.map(config => (<Button key={config.text} size={'small'} type={'yellow'} onClick={() => config.action({})}>{config.text}</Button>))}
  </div>
  <div className={styles.label}>Confirm (mobile)</div>
  <div className={styles.wrapper}>
    {arr.map(config => (<Button key={config.text} size={'small'} type={'yellow'} onClick={() => {
      setMobile();
      config.action({})
    }}>{config.text}</Button>))}
  </div>
</div>

```