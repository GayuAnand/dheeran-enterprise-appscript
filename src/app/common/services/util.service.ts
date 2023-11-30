import moment from 'moment';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UtilService {
  moment = moment;

  snackBarRef!: MatSnackBarRef<TextOnlySnackBar>;

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action?: string, options: MatSnackBarConfig = {}) {
    const defaultOptions = Object.assign({
      horizontalPosition: 'center',
      verticalPosition: 'top',
    }, options);

    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }

    this.snackBarRef = this.snackBar.open(message, action, defaultOptions);
    this.snackBarRef.onAction().subscribe(() => this.snackBarRef.dismiss());
  }

  formatDate(dateStr: string) {
    const d = this.moment(dateStr);
    return d.isValid() ? d.format("DD MMM'YY") : dateStr;
  }

  getObjectKeys(obj: Record<string, any>) {
    return Object.keys(obj);
  }

  stopEventPropagation(event: Event) {
    event.stopPropagation();
  }

  sortObjectsByProperty(property: string | ((d: any) => string), caseSensitive = false): any {
    let sortOrder = 1;
    let properties: string[] = [];
    let valueGetter: ((n: any) => string);

    if (typeof property === 'function') {
      valueGetter = property;
    } else if (typeof property === 'string') {
      properties = (property as string).split(/\s*,\s*/);
      valueGetter = (d: any): string => {
        const propWithValue = properties.find((prop) => d[prop]);
        return propWithValue ? d[propWithValue] : '';
      };

      // Descending order if key startswith '-'
      if ((property as string).startsWith('-')) {
        sortOrder = -1;
        property = (property as string).substr(1);
      }
    }

    return function (a: any, b: any): number {
      let valueA = valueGetter(a);
      let valueB = valueGetter(b);

      if (!caseSensitive) {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (sortOrder === -1) {
        return valueB.localeCompare(valueA);
      }
      return valueA.localeCompare(valueB);
    };
  }

  async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.openSnackBar(`Copied '${text}' to clipboard.`, undefined, { duration: 3000 });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
}