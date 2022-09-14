import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
import { Fruit } from "@type/fruit";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";

@Component({
  selector: "fruity-fruit-page",
  templateUrl: "./fruit-page.component.html",
  styleUrls: ["./fruit-page.component.scss"],
})
export class FruitPageComponent implements OnInit, OnDestroy {
  private _unsubscribeAll$ = new Subject<any>();

  fruit$ = new BehaviorSubject<Fruit>(null);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe(this.fruit$);
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next(null);
    this._unsubscribeAll$.complete();
  }
}
