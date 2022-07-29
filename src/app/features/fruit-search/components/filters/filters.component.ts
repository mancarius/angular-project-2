import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as fromSearch from '@fruit/search/store';

@Component({
  selector: "fruit-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent implements OnInit {
  @Input("filters") filters: fromSearch.types.filters;
  @Output() filtersChange = new EventEmitter<fromSearch.types.filters>();

  constructor() {}

  ngOnInit(): void {}
}
