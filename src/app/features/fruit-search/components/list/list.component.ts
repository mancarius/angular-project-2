import { Component, Input, OnInit } from '@angular/core';
import * as fromSearch from "@fruit/search/store";

@Component({
  selector: "fruity-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  @Input("fruits") fruits: fromSearch.types.results;

  constructor() {}

  ngOnInit(): void {}
}
