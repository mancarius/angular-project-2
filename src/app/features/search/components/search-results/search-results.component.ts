import { Component, Input, OnInit } from '@angular/core';
import * as fromSearch from "src/app/features/search/store";

@Component({
  selector: "fruity-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"],
})
export class SearchResultsComponent implements OnInit {
  @Input("data") data: fromSearch.types.results;

  constructor() {}

  ngOnInit(): void {}
}
