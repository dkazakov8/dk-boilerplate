```jsx 
import { icons } from '../../assets/icons';
import styles from './sg.scss';

<div className={styles.root}>
  <div className={styles.label}>24x24</div>
  <div className={styles.wrapper}>
    {Object.keys(icons).filter(name => !name.includes('16')).map((glyph, i) => <Icon key={i} glyph={glyph} title={glyph}/>)}
  </div>
  <div className={styles.label}>16x16</div>
  <div className={styles.wrapper16}>
    {Object.keys(icons).filter(name => name.includes('16')).map((glyph, i) => <Icon key={i} glyph={glyph} title={glyph}/>)}
  </div>
</div>
```