import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'errorMessage'})
export class ErrorMessagePipe implements PipeTransform {
  transform(value: Record<string, unknown>|null): string|null {
    if (!value) {
      return null;
    }

    switch (true) {
      case value.required:
        return 'Dieses Feld ist eine Pflichtangabe';
      case value.email:
        return 'Die E-Mail-Adresse ist nicht richtig formatiert';
      default:
        return 'Dieser Wert ist ungültig';
    }
  }
}
