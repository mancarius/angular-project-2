import { ValueOf } from "@type/value-of";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FruitAttributes } from "@enum/fruit-attributes.enum";
import { FruitNutritionTypes } from "@enum/fruit-nutrition-types.enum";
import * as fromSearch from "src/app/features/search/store";
import { minMaxCrossValidator } from "src/app/shared/validators/min-max-cross.directive";

@Component({
  selector: "fruity-search-filters",
  templateUrl: "./search-filters.component.html",
  styleUrls: ["./search-filters.component.scss"],
})
export class SearchFiltersComponent implements OnInit {
  /**
   * FormGroup
   *
   * @memberof SearchFiltersComponent
   */
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

  /**
   * filter keys
   *
   * @type {(keyof fromSearch.types.filters)[]}
   * @memberof FiltersComponent
   */
  arguments: (keyof fromSearch.coreTypes.filters)[] = [
    "name",
    "family",
    "genus",
    "nutrition",
    "order",
  ];

  /**
   * Nutrition types
   *
   * @type {FruitNutritionTypes[]}
   * @memberof SearchFiltersComponent
   */
  nutritionTypes: FruitNutritionTypes[] = Object.keys(
    FruitNutritionTypes
  ) as FruitNutritionTypes[];

  @Input("requestParams") params: fromSearch.coreTypes.requestParams;
  @Input("loading") isLoading: boolean;
  @Output() onFiltersChange =
    new EventEmitter<fromSearch.coreTypes.requestParams>();

  constructor() {}

  ngOnInit(): void {
    const { filters } = this.params || {};

    if (filters && Object.keys(filters).length) {
      const [argument, value] =
        (Object.entries(filters)[0] as [
          FruitAttributes & "name",
          ValueOf<typeof filters>
        ]) || [];

      const {
        type = null,
        min = 0,
        max = 1000,
      } = typeof value === "object" ? value : {};

      // assign filters to form group
      this.filters.setValue({
        argument: argument || "all",
        value: typeof value === "object" ? value.type : value,
        min,
        max,
      });
    }
  }

  /**
   *
   */
  onFormSubmit(): void {
    if (this.filters.valid) {
      const { argument, value, min, max } = this.filters.getRawValue();

      const filters: fromSearch.coreTypes.requestParams["filters"] = {
        [argument]:
          argument === FruitAttributes.nutrition
            ? { type: value, min, max }
            : value,
      };

      this.onFiltersChange.emit({ ...this.params, filters });
    }
  }

  /**
   *
   * @param field
   * @returns
   */
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

  /**
   * Transform the field value to lowercase
   * @param field
   */
  toLowerCase(field: string): void {
    const control = this.filters.get(field);

    if (control) {
      const value = control.value;

      if (typeof value === "string" && value.trim().length) {
        control.setValue(value.toLocaleLowerCase());
      }
    }
  }
}
