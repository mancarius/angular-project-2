import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FruitNutritionTypes } from "@enum/fruit-nutrition-types.enum";
import * as fromSearch from "@fruit/search/store";
import { minMaxCrossValidator } from "src/app/shared/validators/min-max-cross.directive";

@Component({
  selector: "fruity-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent implements OnInit {
  @Input("queryParams") queryParams: fromSearch.types.queryParams;
  @Output() onFiltersChange = new EventEmitter<fromSearch.types.queryParams>();

  filters = new FormGroup(
    {
      argument: new FormControl("name", [Validators.required]),
      value: new FormControl("", [Validators.required]),
      min: new FormControl(0, [Validators.min(0), Validators.max(999)]),
      max: new FormControl(1000, [Validators.min(1), Validators.max(1000)]),
    },
    {
      validators: [minMaxCrossValidator],
    }
  );

  arguments: (keyof fromSearch.types.filters)[] = [
    "name",
    "family",
    "genus",
    "nutrition",
    "order",
  ];

  nutritionTypes = Object.keys(FruitNutritionTypes) as FruitNutritionTypes[];

  constructor() {}

  ngOnInit(): void {
    const { arg: argument = "name", val: value = "", min = 0, max = 1000 } = this.queryParams || {};
    this.filters.setValue({ argument, value, min, max });
  }

  onFormSubmit(): void {
    if (this.filters.valid) {
      const {
        argument: arg,
        value: val,
        min,
        max,
      } = this.filters.getRawValue();

      this.onFiltersChange.emit({ ...this.queryParams, arg, val, min, max });
    }
  }

  getErrorMessage(field: string): string {
    const errors = this.filters.get(field)?.errors ?? {};
    const errorType = Object.keys(errors)[0];
    const errorInfo = Object.values(errors)[0];
    if (errorType) {
      switch (errorType) {
        case "min":
          return `Could not be smaller than ${errorInfo.min}`;
        case "max":
          return `Could not be greater than ${errorInfo.max}`;
        default:
          return "Invalid value";
      }
    }
  }
}
