import { excludeFalsy } from '../tsUtils/excludeFalsy';

import { getElementOffset } from './getElementOffset';

export function getHighestElementOffsetTop(idsArray: Array<string>) {
  const errorInputsOffsets = idsArray
    .map((id) => document.getElementById(id))
    .filter(excludeFalsy)
    .map((inputElement) => getElementOffset(inputElement).top);

  return errorInputsOffsets.length === 0 ? null : Math.min(...errorInputsOffsets);
}
