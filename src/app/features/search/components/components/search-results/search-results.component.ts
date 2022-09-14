import { trigger, transition, style, animate } from "@angular/animations";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FruitWithPhoto } from "@type/fruit";
import { Observable, ReplaySubject, map, takeUntil, Subject } from "rxjs";
import * as fromSearch from "src/app/features/search/store";

@Component({
  selector: "fruity-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("listAnimation", [
      transition(":leave", [
        style({ transform: "scale(1)", opacity: 1 }),
        animate("200ms ease-out", style({ transform: "scale(0)", opacity: 0 })),
      ]),
      transition(":enter", [
        style({ transform: "scale(0)", opacity: 0 }),
        animate("200ms ease-out", style({ transform: "scale(1)", opacity: 1 })),
      ]),
    ]),
  ],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  @Input("data") data$: Observable<fromSearch.coreTypes.results>;
  @Input("disabled") disabled$: Observable<boolean>;
  @Output("onFruitSelect") selectedFruit = new EventEmitter<FruitWithPhoto>();

  fruits$: ReplaySubject<fromSearch.coreTypes.results["items"]> =
    new ReplaySubject();

  private _unsubscribeAll$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.data$
      .pipe(
        map((data) => data.items),
        takeUntil(this._unsubscribeAll$)
      )
      .subscribe(this.fruits$);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll$.next(true);
    this._unsubscribeAll$.complete();
  }

  /**
   *
   * @param fruit
   */
  selectFruit(fruit: FruitWithPhoto): void {
    this.selectedFruit.emit(fruit);
  }
}
