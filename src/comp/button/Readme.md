```jsx 
import styles from './sg.scss';

const buttons = [
  {type: 'yellow'},
  {type: 'grey'},
  {type: 'white'},
  {type: 'black'},
];

const withSmall = config => config.map(item => ({ ...item, size: 'small' }));

const withSubmit = config => config.map(item => ({ ...item, element: 'submit' }));

const withLoading = config => config.map(item => ({ ...item, isLoading: true }));

const withDisabled = config => config.map(item => ({ ...item, disabled: true }));

const withIconOnly = config => config.map(item => ({ ...item, iconOnly: 'trashBin' }));

const withIconLeft = config => config.map(item => ({ ...item, iconLeft: 'trashBin' }));

const withIconRight = config => config.map(item => ({ ...item, iconRight: 'trashBin' }));

const withIconBoth = config => config.map(item => ({ ...item, iconLeft: 'trashBin', iconRight: 'chevronRightSmall' }));

const conf = [
  { arr: buttons, title: 'Regular' },
  { arr: withIconOnly(buttons), title: 'Regular (icon only)' },
  { arr: withIconLeft(buttons), title: 'Regular (icon left)' },
  { arr: withIconRight(buttons), title: 'Regular (icon right)' },
  { arr: withIconBoth(buttons), title: 'Regular (icons left & right)' },
  { arr: withSubmit(buttons), title: 'Submit' },
  { arr: withIconOnly(withSubmit(buttons)), title: 'Submit (icon only)' },
  { arr: withIconLeft(withSubmit(buttons)), title: 'Submit (icon left)' },
  { arr: withIconRight(withSubmit(buttons)), title: 'Submit (icon right)' },
  { arr: withIconBoth(withSubmit(buttons)), title: 'Submit (icons left & right)' },
];

const Block = ({title, wrapperClassName}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  setTimeout(() => setIsLoading(!isLoading), 3000);
  
  return (
    <>
      <div className={styles.titleBig}>{title}</div>
      {conf.map((item, i) => (
        <div key={i}>
          <div className={styles.title}>{item.title}</div>
          <div className={wrapperClassName}>
            <div className={styles.label}>M:</div>
            {item.arr.map((params, i) => <Button key={i} {...params}>{params.type}</Button>)}
            {withDisabled(item.arr).map((params, i) => <Button key={i} {...params}>{params.type}</Button>)}
            <div className={styles.break} />
            {item.arr.slice(0, 1).map((params, i) => <Button key={i} {...params} isLoading={isLoading}>loading</Button>)}
          </div>
          <div className={wrapperClassName}>
            <div className={styles.label}>S:</div>
            {withSmall(item.arr).map((params, i) => <Button key={i} {...params}>{params.type}</Button>)}
            {withDisabled(withSmall(item.arr)).map((params, i) => <Button key={i} {...params}>{params.type}</Button>)}
            <div className={styles.break} />
            {withSmall(item.arr).slice(0, 1).map((params, i) => <Button key={i} {...params} isLoading={isLoading}>loading</Button>)}
          </div>
          <div className={wrapperClassName}>
            <div className={styles.label}>M:</div>
            {withLoading(item.arr).map((params, i) => <Button key={i} {...params}>{params.type}</Button>)}
            {withDisabled(withLoading(item.arr)).map((params, i) => <Button key={i} {...params}>{params.type}</Button>)}
          </div>
          <div className={wrapperClassName}>
            <div className={styles.label}>S:</div>
            {withLoading(withSmall(item.arr)).map((params, i) => <Button key={i} {...params}>{params.type}</Button>)}
            {withDisabled(withLoading(withSmall(item.arr))).map((params, i) => <Button key={i} {...params}>{params.type}</Button>)}
          </div>
        </div>
      ))}
    </>
  )
}

<div className={styles.root}>
  <Block title={'Auto width'} wrapperClassName={styles.wrapper} />
  <Block title={'Custom width'} wrapperClassName={styles.wrapperFixed} />
</div>
```