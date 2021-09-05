import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';

export const email: ValidatorFn = (fc: AbstractControl) => {
  if (!(fc instanceof FormControl) && !(fc instanceof FormControl)) {
    return null;
  }

  const val = fc.value;

  if (typeof val !== 'string') {
    return null;
  }

  if (val.length === 0) {
    return null;
  }

  const expression =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regex = new RegExp(expression);

  const match = val.match(regex);

  return match ? null : {email: true};
};
