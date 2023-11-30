import { Component, HostBinding, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'de-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements ControlValueAccessor {
  @Input() label = '';

  @Input() options: string[] = [];

  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;

  private _value: any;

  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  // Function to call when the rating changes.
  onChange = (value: string) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    this._value = v;
  }

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(value: string): void {
    this._value = value;
    this.onChange(this.value);
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
