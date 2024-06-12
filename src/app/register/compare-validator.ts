import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[compare]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true }],
  standalone: true
})
export class CompareValidatorDirective implements Validator {
  @Input('compare') controlNameToCompare: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('control.value', control.value);
    console.log('compare', this.controlNameToCompare);
    if (!control.value) return null;

    const controlToCompare = this.controlNameToCompare;
    if (controlToCompare && controlToCompare !== control.value) {
      return { compare: true };
    }
    return null;
  }
}
