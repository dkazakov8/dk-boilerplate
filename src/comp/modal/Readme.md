```jsx 
import styles from './sg.scss';
import { StoreContext } from '../../compSystem/StoreContext';
import { Modal } from './Modal';
import { Button } from '../button';

const context = React.useContext(StoreContext);

const longText = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac`;

const openModal = (params) => {
  context.actions.ui.modalRaise({
    component: 'Example',
    componentProps: { text: 'Some text' },
    ...params,
  });
}

const asyncBeforeLoad = () => new Promise(resolve => setTimeout(() => resolve(), 1000));

const setMobile = () => document.body.classList.add('mobile');

const removeMobile = () => document.body.classList.remove('mobile');

const arrSync = [
  {text: 'No close on backdrop', action: (params) => openModal({...params}) },
  {text: 'Close on backdrop', action: (params) => openModal({ ...params, closeByBackdrop: true }) },
  {text: 'Shake on open', action: (params) => openModal({ ...params, shakeOnInit: true }) },
  {text: 'With back', action: (params) => openModal({ ...params, onBack: () => console.log('back') }) },
  {text: 'With long text', action: (params) => openModal({ ...params, onBack: () => console.log('back'), componentProps: { text: longText } }) },
  {text: 'Header detached', action: (params) => openModal({...params, component: 'ExampleHeaderAbsolute' }) },
];

const arrAsync = arrSync.map(config => ({
  ...config, 
  action: () => config.action({ beforeLoad: asyncBeforeLoad })
}));

const arrSyncMobile = arrSync.map(config => ({
  ...config, 
  action: () => {
    setMobile();
    
    return config.action({ onClose: removeMobile })
  }
}));

const arrAsyncMobile = arrSync.map(config => ({
  ...config, 
  action: () => {
    setMobile();
    
    return config.action({ onClose: removeMobile, beforeLoad: asyncBeforeLoad })
  }
}));

const layouts = [
  { arr: arrSync, title: 'Sync' },
  { arr: arrAsync, title: 'Async' },
  { arr: arrSyncMobile, title: 'Sync (mobile)' },
  { arr: arrAsyncMobile, title: 'Async (mobile)' },
];

<div className={styles.root}>
  <Modal />

  {layouts.map(config => (
    <div key={config.title}>
      <div className={styles.label}>{config.title}</div>
      <div className={styles.wrapper}>
        {config.arr.map(config => (<Button key={config.text} size={'small'} type={'yellow'} onClick={() => config.action({})}>{config.text}</Button>))}
      </div>
    </div>
  ))}
</div>
```