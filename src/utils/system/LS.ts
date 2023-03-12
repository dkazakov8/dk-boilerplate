const storage = IS_CLIENT ? window.localStorage : null;

const LOCAL_STORAGE_ENABLED = (() => {
  const testKey = 'test';

  try {
    storage!.setItem(testKey, '1');
    storage!.getItem(testKey);
    storage!.removeItem(testKey);

    return true;
  } catch (error) {
    return false;
  }
})();

export class LS {
  static get(key: string) {
    let data = null;

    if (LOCAL_STORAGE_ENABLED) {
      try {
        data = JSON.parse(storage!.getItem(key)!);
      } catch (error) {
        console.error(error);
      }
    }

    return data;
  }

  static set(key: string, value: any) {
    if (LOCAL_STORAGE_ENABLED) {
      try {
        storage!.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    }
  }

  static remove(key: string) {
    if (LOCAL_STORAGE_ENABLED) {
      try {
        storage!.removeItem(key);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
