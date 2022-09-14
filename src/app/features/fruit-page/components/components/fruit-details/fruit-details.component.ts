import { Observable, map } from "rxjs";
import { Component, Input, OnInit } from '@angular/core';
import { FruitWithPhoto } from '@type/fruit';
import { Route } from '@enum/route.enum';
import { FruitAttributes } from '@enum/fruit-attributes.enum';

@Component({
  selector: "fruity-details",
  templateUrl: "./fruit-details.component.html",
  styleUrls: ["./fruit-details.component.scss"],
})
export class FruitDetailsComponent implements OnInit {
  @Input("fruit") fruit$: Observable<FruitWithPhoto>;

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
}
