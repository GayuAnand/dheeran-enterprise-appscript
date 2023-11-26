import moment from 'moment';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class UtilService {
  moment = moment;

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action?: string, options: MatSnackBarConfig = {}) {
    const defaultOptions = Object.assign({
      horizontalPosition: 'center',
      verticalPosition: 'top',
    }, options);

    this.snackBar.open(message, action, defaultOptions);
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