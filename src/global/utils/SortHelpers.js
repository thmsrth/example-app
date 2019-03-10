import { getLastKeyValueFromObject } from './FormatHelpers';

export function sortObjectMethod(attr, sortOrder = 'ASC') {
  return function sort(a, b) {
    const aAttr = attr ? getLastKeyValueFromObject(attr, a)[1] : a;
    const bAttr = attr ? getLastKeyValueFromObject(attr, b)[1] : b;

    // case insensitive
    const aAttrCI = typeof aAttr === 'string' ? aAttr.toLowerCase() : aAttr;
    const bAttrCI = typeof bAttr === 'string' ? bAttr.toLowerCase() : bAttr;

    if (aAttrCI < bAttrCI) {
      return sortOrder === 'DESC' ? 1 : -1;
    }
    if (aAttrCI > bAttrCI) {
      return sortOrder === 'DESC' ? -1 : 1;
    }
    return 0;
  };
}

const SortHelpers = {
  sortObjectMethod,
};

export default SortHelpers;
