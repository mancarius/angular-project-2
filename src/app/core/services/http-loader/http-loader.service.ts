import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { coreActions } from "../../store/actions";

@Injectable({
  providedIn: "root",
})
export class HttpLoaderService {
  constructor(private _store: Store) {}

  show() {
    this._store.dispatch(coreActions.startLoading());
  }

  hide() {
    this._store.dispatch(coreActions.stopLoading());
  }
}
