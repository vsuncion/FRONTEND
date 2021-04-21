import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() { }

  // type: true => onliy touch the forms, false => set error messages
  getValidationErrors(group: FormGroup, messages: any, formErrors: any, type: boolean): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.getValidationErrors(abstractControl, messages[key], formErrors[key], type);
      } else {
        if (type) {
          abstractControl.markAsTouched();
        }
        formErrors[key] = '';
        if (abstractControl && abstractControl.invalid && (abstractControl.touched || abstractControl.dirty)) {
          const msg = messages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              formErrors[key] += msg[errorKey] + ' ';
            }
          }
        }
      }
    });
    console.log(formErrors);
  }

  setAsUntoched(group: FormGroup, exclusions?: string[]): void {
    group.markAsUntouched();
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.setAsUntoched(abstractControl);
      } else {
        if (typeof exclusions !== 'undefined') {
          const ex = exclusions.find(el => el === key);
          if (!ex) {
            abstractControl.setValue('');
            abstractControl.markAsUntouched();
          }
        } else {
          abstractControl.setValue('');
          abstractControl.markAsUntouched();
        }

      }
    });
  }

  disableControls(group: FormGroup, exclusions?: [string]): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.disableControls(abstractControl, exclusions);
      } else {
        if (typeof exclusions !== 'undefined') {
          const ex = exclusions.find(el => el === key);
          if (!ex) {
            abstractControl.disable();
          }
        } else {
          abstractControl.disable();
        }
      }
    });
  }

  removeErrors(group: FormGroup, exclusions?: [string]): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.removeErrors(abstractControl, exclusions);
      } else {
        if (typeof exclusions !== 'undefined') {
          const ex = exclusions.find(el => el === key);
          if (!ex) {
            abstractControl.setErrors(null);
          }
        } else {
          abstractControl.setErrors(null);
        }
      }
    });
  }
}
