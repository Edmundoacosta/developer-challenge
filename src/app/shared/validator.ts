import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailFormatValidator(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!control.value) {
    return null;
  }
  if (emailRegex.test(control.value)) {
    return null;
  } else {
    return { invalidEmailFormat: true };
  }
}