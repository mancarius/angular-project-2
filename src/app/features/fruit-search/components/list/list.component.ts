import { Component, Input, OnInit } from '@angular/core';
import * as fromSearch from "@fruit/search/store";

@Component({
  selector: 'fruity-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input("items") items: fromSearch.types.results['items'];

  constructor() { }

  ngOnInit(): void {
  }

}
