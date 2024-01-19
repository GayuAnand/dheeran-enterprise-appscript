import moment from 'moment';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { CustomerModel } from 'src/app/models';
import { SettingsService } from './settings.service';

@Injectable()
export class UtilService {
  moment = moment;

  snackBarRef!: MatSnackBarRef<TextOnlySnackBar>;

  constructor(
    private snackBar: MatSnackBar,
    private settingsService: SettingsService,
  ) {}

  openSnackBar(message: string, action?: string, options: MatSnackBarConfig = {}) {
    const defaultOptions = Object.assign({
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    }, options);

    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }

    this.snackBarRef = this.snackBar.open(message, action, defaultOptions);
    this.snackBarRef.onAction().subscribe(() => this.snackBarRef.dismiss());
  }

  openErrorSnackBar(message: string, action: string = 'Close', options: MatSnackBarConfig = {}) {
    const defaultOptions = Object.assign({ duration: 0 }, options);
    this.openSnackBar(message, action, defaultOptions);
  }

  formatDate(dateStr: string, format?: string) {
    const d = this.moment(dateStr);
    return d.isValid() ? d.format(format || "DD MMM'YY") : dateStr;
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

  getFlexibleSearchTextRegexp(searchText = '') {
    if (/[0-9]/.test(searchText)) {
      // Has some numeric characters. Strict regex.
      return new RegExp(searchText, 'si');
    } else {
      // Has only non-numeric characters. Flexible regex.
      return new RegExp(searchText.split('').join('.*'), 'si');
    }
  }

  async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.openSnackBar(`Copied '${text}' to clipboard.`, undefined);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  async gtplActivation(customer: CustomerModel, activate: boolean) {
    const franchiseId = customer.STB?.toString().startsWith('31') ? 'SPCHE3954' : 'SPCHE5734';
    await this.copyToClipboard(`${franchiseId}: Please ${activate ? 'activate' : 'deactivate'} ${customer.STB}.`);

    if (this.settingsService.metadata.gtplWAGroupID) {
      window.open(this.settingsService.metadata.gtplWAGroupID, '_blank');
    } else {
      this.openSnackBar(`No WhatsApp group information to launch WhatsApp.`);
    }
  }

  async tactvActivation(customer: CustomerModel) {
    await this.copyToClipboard(`${customer.STB}`);
    window.open('https://sms.tactv.in','_blank');
  }

  exportObjectsToCSV(objects: Record<string, any>[], filename: string, keysToExport: string[] = []) {
    const keys: string[] = (keysToExport.length === 0) ? Object.keys(objects[0]) : keysToExport;
    const values: string[][] = [keys];
    objects.forEach(obj => values.push(keys.map((k) => this.escapeCSVCell(obj[k]))));
    this.exportToCSV(values, filename);
  }

  escapeCSVCell(cellData: string) {
    // Escape double quotes by doubling them
    let escapedData = (cellData || '').toString().replace(/"/g, '""');
  
    // If the data contains a comma or newline, enclose it in double quotes
    if (escapedData.includes(',') || escapedData.includes('\n')) {
      escapedData = `"${escapedData}"`;
    }
  
    return escapedData;
  }

  exportToCSV(csvValues: string[][], filename: string) {
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([csvValues.map(row => row.join(',')).join('\n')], { type: 'text/csv' }));
    a.download = filename.replace(/[^a-zA-Z0-1]/g, ' ').replace(/\s+/g, ' ') + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}