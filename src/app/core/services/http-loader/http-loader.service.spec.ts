import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { coreActions } from "../../store/actions";
import { HttpLoaderService } from "./http-loader.service";

describe("HttpLoaderService", () => {
  let service: HttpLoaderService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
    });

    service = TestBed.inject(HttpLoaderService);
    store = TestBed.inject(MockStore);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("#show", () => {
    it("should dispatch correct store action", () => {
      const dispatchSpy = spyOn(store, "dispatch").and.stub();

      service.show();

      expect(dispatchSpy).toHaveBeenCalledWith(coreActions.startLoading());
    });
  });

  describe("#hide", () => {
    it("should dispatch correct store action", () => {
      const dispatchSpy = spyOn(store, "dispatch").and.stub();

      service.hide();

      expect(dispatchSpy).toHaveBeenCalledWith(coreActions.stopLoading());
    });
  });
});
