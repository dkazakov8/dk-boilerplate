```jsx 
import _kebabCase from 'lodash/kebabCase';
import styles from './sg.scss';

const texts = [
  'textMainBlack', 
  'textSecondary', 
  'textMainWhite', 
  'textTertiary', 
  'textSuccess', 
  'textError',
  'textSystemBlue',
  'textYellowBrand',
  'textSurge',
];

const icons = [
  'iconMainBlack', 
  'iconSecondary', 
  'iconWhite', 
  'iconTertiary', 
  'iconSuccess', 
  'iconError',
  'iconSystemBlue',
  'iconYellowBrand',
  'iconSurge',
  'iconPaleYellow',
];

const lines = [
  'lineBorder', 
  'lineBorderActive', 
  'lineProgressBar', 
  'lineBorderError', 
  'lineSeparatorLight', 
  'lineSeparatorDark',
  'lineSeparatorSystem',
];

const backgrounds = [
  'bgWhite', 
  'bgGray', 
  'bgGrayTransparent', 
  'bgSystemGray', 
  'bgWhiteAlpha', 
  'bgGlass',
  'bgBlack',
  'bgYellowBrand',
  'bgYellowBrandLight',
  'bgSurgeLight',
];

const buttons = [
  'buttonYellowBrand', 
  'buttonYellowBrandHover', 
  'buttonYellowBrandPressed', 
  'buttonSecondary', 
  'buttonSecondaryHover', 
  'buttonSecondaryPressed', 
  'buttonWhite', 
  'buttonWhiteHover',
  'buttonWhitePressed',
  'buttonBlack',
  'buttonBlackHover',
  'buttonBlackPressed',
  'buttonSystemBlue',
  'buttonTransparent',
];

<div className={styles.root}>
  <div className={styles.title}>Text</div>
  <div className={styles.block}>
    {texts.map(className => (
      <div key={className} className={styles.color}>
        <div className={styles[className]}/>
        <div>{_kebabCase(className)}</div>
      </div>
    ))}
  </div>
  
  <div className={styles.title}>Icons</div>
  <div className={styles.block}>
    {icons.map(className => (
      <div key={className} className={styles.color}>
        <div className={styles[className]}/>
        <div>{_kebabCase(className)}</div>
      </div>
    ))}
  </div>
  
  <div className={styles.title}>Lines</div>
  <div className={styles.block}>
    {lines.map(className => (
      <div key={className} className={styles.color}>
        <div className={styles[className]}/>
        <div>{_kebabCase(className)}</div>
      </div>
    ))}
  </div>
  
  <div className={styles.title}>Background</div>
  <div className={styles.block}>
    {backgrounds.map(className => (
      <div key={className} className={styles.color}>
        <div className={styles[className]}/>
        <div>{_kebabCase(className)}</div>
      </div>
    ))}
  </div>
  
  <div className={styles.title}>Buttons</div>
  <div className={styles.block}>
    {buttons.map(className => (
      <div key={className} className={styles.color}>
        <div className={styles[className]}/>
        <div>{_kebabCase(className)}</div>
      </div>
    ))}
  </div>
</div>
```