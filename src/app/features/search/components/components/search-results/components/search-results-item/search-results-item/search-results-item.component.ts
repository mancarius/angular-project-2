import { animate, style, transition, trigger } from "@angular/animations";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FruitWithPhoto } from "@type/fruit";

@Component({
  selector: "fruity-search-results-item",
  templateUrl: "./search-results-item.component.html",
  styleUrls: ["./search-results-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsItemComponent implements OnInit {
  @Input("fruit") fruit: FruitWithPhoto;

  constructor() {}

  ngOnInit(): void {}
}
