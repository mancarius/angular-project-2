import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Returns true if min and max values cross
 * @param control 
 * @returns 
 */
export const minMaxCrossValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const min = control.get("min");
  const max = control.get("max");

  return min && max && min.value > max.value ? { minMaxCross: true } : null;
};
