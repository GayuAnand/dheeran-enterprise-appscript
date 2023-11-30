import { Component, Input } from '@angular/core';

@Component({
  selector: 'de-spinner',
  template: `<mat-spinner [diameter]="size" [ngClass]="color"></mat-spinner>`,
  styles: [`
mat-spinner.white ::ng-deep svg {
  stroke: white !important;
}
`]
})
export class SpinnerComponent {
  @Input() size = 24;

  @Input() color = '';
}