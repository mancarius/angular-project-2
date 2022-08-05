export class LocalMap<S = string, T = any> {
  private _storage: Storage;

  constructor(storageType: "local" | "session" = "local") {
    this._storage =
      storageType === "local" ? window.localStorage : window.sessionStorage;
  }

  /**
   * Get item
   * @param key
   * @returns
   */
  get(key: S): T {
    const value = this._storage.getItem(String(key));

    if (value !== null) {
      const isNumber = !isNaN(Number(value));

      // return number
      if (isNumber) {
        return Number(value) as unknown as T;
      }

      // return boolean or object
      try {
        return JSON.parse(value);
      } catch (err) {
        /* do nothing */
      }
    }

    // return null or string
    return value as unknown as T;
  }

  /**
   * Set item
   * @param key
   * @param value
   */
  set(key: S, value: T): void {
    const type = typeof value;

    try {
      switch (type) {
        case "object":
          const isArray = Array.isArray(value);

          if (isArray) {
            this._storage.setItem(String(key), JSON.stringify(value));
          } else {
            this._storage.setItem(String(key), JSON.stringify({ ...value }));
          }

          break;

        case "boolean":
          this._storage.setItem(String(key), JSON.stringify(value));
          break;

        default:
          this._storage.setItem(String(key), String(value));
      }
    } catch (error) {
      console.warn("[LocalMap] Error while storing value. " + error.message);
    }
  }
}
