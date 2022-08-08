import { Observable, map } from "rxjs";
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FruitWithPhoto } from '@type/fruit';
import { Route } from '@enum/route.enum';
import { FruitAttributes } from '@enum/fruit-attributes.enum';

@Component({
  selector: "fruity-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  @Input("fruit") fruit$: Observable<FruitWithPhoto>;
  @Output("closeDrawer") closeDrawer = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get familyLink$() {
    return this.fruit$.pipe(
      map((fruit) => ["/" + Route.search, FruitAttributes.family, fruit.family])
    );
  }

  get orderLink$() {
    return this.fruit$.pipe(
      map((fruit) => ["/" + Route.search, FruitAttributes.order, fruit.order])
    );
  }

  get genusLink$() {
    return this.fruit$.pipe(
      map((fruit) => ["/" + Route.search, FruitAttributes.genus, fruit.genus])
    );
  }

  close() {
    this.closeDrawer.emit();
  }
}
