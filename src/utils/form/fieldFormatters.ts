export const fieldFormatters = {
  upperCase(value: string) {
    return value.toUpperCase();
  },

  restrictLeadingZero(value: string) {
    if (value.length > 1) {
      return value.replace(/^[0]/, '');
    }

    return value;
  },

  removeSpaces(value: string) {
    return value.replace(/\s/g, '');
  },

  removeNotNumeric(value: string) {
    return value.replace(/\D/g, '');
  },

  removeNotPhone(value: string) {
    return value
      .replace(/[^\d+]/g, '')
      .replace(/\++/g, '+')
      .replace(/(\d)\+/g, '$1');
  },

  removeNotSearch(value: string) {
    return value.replace(/[^\s0-9a-z.,'+-]/gi, '');
  },
};
