import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FruitWithPhoto } from '@type/fruit';
import { Observable, ReplaySubject, map } from 'rxjs';
import * as fromSearch from "src/app/features/search/store";

@Component({
  selector: "fruity-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent implements OnInit {
  @Input("data") data$: Observable<fromSearch.coreTypes.results>;
  @Output("onFruitSelect") selectedFruit = new EventEmitter<FruitWithPhoto>();

  fruits$: ReplaySubject<fromSearch.coreTypes.results["items"]> =
    new ReplaySubject();

  constructor() {}

  ngOnInit(): void {
    this.data$.pipe(map((data) => data.items)).subscribe(this.fruits$);
  }

  /**
   *
   * @param fruit
   */
  selectFruit(fruit: FruitWithPhoto): void {
    this.selectedFruit.emit(fruit);
  }
}
