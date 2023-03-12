import { system } from 'const';

import { getHighestElementOffsetTop } from './getHighestElementOffsetTop';
import { smoothScroll } from './smoothScroll';

export function scrollToFirstElement(idsArray: Array<string>) {
  const highestElementOffsetTop = getHighestElementOffsetTop(idsArray);

  if (highestElementOffsetTop != null) {
    void smoothScroll(highestElementOffsetTop - system.SPACE_BEFORE_INPUT_TOP_OFFSET);
  }
}
