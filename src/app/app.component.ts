import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Core } from './core/store/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoading$ = this._store.select('isLoading');

  constructor(private _store: Store<Core.state>) {}
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
