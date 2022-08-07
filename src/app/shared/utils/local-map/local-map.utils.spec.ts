import { LocalMap } from "./local-map.utils";

describe("LocalMap", () => {
  let localMap: LocalMap<any>;
  let sessionStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    localMap = new LocalMap<any>("session");
    sessionStorageSpy = jasmine.createSpyObj("localStorage", [
      "getItem",
      "setItem",
      "removeItem",
      "clear",
    ]);

    sessionStorageSpy.setItem.and.stub();
    sessionStorageSpy.removeItem.and.stub();
    sessionStorageSpy.clear.and.stub();

    // assign spy storage
    localMap["_storage"] = sessionStorageSpy;
  });

  describe("#_storage", () => {
    it("should be a valid Storage instance", () => {
      expect(new LocalMap()["_storage"]).toBeInstanceOf(window.Storage);

      expect(new LocalMap("session")["_storage"]).toBeInstanceOf(
        window.Storage
      );
    });
  });

  describe("#get", () => {
    it("should return stored value as object", () => {
      const expectedValue = { expected: "value" };

      sessionStorageSpy.getItem
        .withArgs("fakeKey")
        .and.returnValue(JSON.stringify(expectedValue));

      const response = localMap.get("fakeKey");

      expect(typeof response).toBe("object");
    });

    it("should return stored value as number", () => {
      sessionStorageSpy.getItem.withArgs("fakeKey").and.returnValue("0");

      const response = localMap.get("fakeKey");

      expect(typeof response).toBe("number");
    });

    it("should return stored value as string", () => {
      const expectedValue = "2a";

      sessionStorageSpy.getItem
        .withArgs("fakeKey")
        .and.returnValue(expectedValue);

      const response = localMap.get("fakeKey");

      expect(typeof response).toBe("string");
    });
  });

  describe("#set", () => {
    it("should pass array as a string to #storage.serItem", () => {
      const fakeKey = "fakeKey";
      const fakeValue = ["fake", "array"];
      const expectedValueParam = JSON.stringify(fakeValue);

      localMap.set(fakeKey, fakeValue);

      expect(sessionStorageSpy.setItem).toHaveBeenCalledOnceWith(
        fakeKey,
        expectedValueParam
      );
    });

    it("should pass object as a string to #storage.serItem", () => {
      const fakeKey = "fakeKey";
      const fakeValue = { fake: "object" };
      const expectedValueParam = JSON.stringify(fakeValue);

      localMap.set(fakeKey, fakeValue);

      expect(sessionStorageSpy.setItem).toHaveBeenCalledOnceWith(
        fakeKey,
        expectedValueParam
      );
    });

    it("should pass boolean as a string to #storage.serItem", () => {
      const fakeKey = "fakeKey";
      const fakeValue = false;
      const expectedValueParam = JSON.stringify(fakeValue);

      localMap.set(fakeKey, fakeValue);

      expect(sessionStorageSpy.setItem).toHaveBeenCalledOnceWith(
        fakeKey,
        expectedValueParam
      );
    });
  });

  describe("#removeOne", () => {
    it("should call the storage method #removeItem with the passed key", () => {
      const fakeKey = "fakeKey";

      localMap.removeOne(fakeKey);

      expect(sessionStorageSpy.removeItem).toHaveBeenCalledWith(fakeKey);
    });
  });

  describe("#removeMany", () => {
    it("should call the storage method #removeItem 3 times with the passed keys", () => {
      const fakeKeys = ["fakeKey1", "fakeKey2", "fakeKey3"];

      localMap.removeMany(fakeKeys);

      expect(sessionStorageSpy.removeItem).toHaveBeenCalledTimes(3);
      fakeKeys.forEach((key) =>
        expect(sessionStorageSpy.removeItem).toHaveBeenCalledWith(key)
      );
    });
  });

  describe("#clear", () => {
    it("should call the storage method #clear", () => {
      localMap.clear();

      expect(sessionStorageSpy.clear).toHaveBeenCalledTimes(1);
    });
  });
});
