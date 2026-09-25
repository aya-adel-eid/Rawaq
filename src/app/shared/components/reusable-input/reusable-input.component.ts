import { Component, forwardRef, Input, input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-reusable-input',
  imports: [],
  templateUrl: './reusable-input.component.html',
  styleUrl: './reusable-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReusableInputComponent),
      multi: true,
    },
  ],
})
export class ReusableInputComponent implements ControlValueAccessor {
  label = input<string>();
  idLabel = input<string>();
  @Input() typeInput!: string;
  placeholde = input<string>();
  control = input<AbstractControl | null>(null);
  group = input<FormGroup | null>(null);
  value = '';
  onChange = (value: string) => {};
  disabled = false;
  onTouched = () => {};
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  flag = true;
  toggle() {
    if (this.idLabel() == 'password' || this.idLabel() == 'rePassword') {
      this.flag = !this.flag;
      this.typeInput = this.flag ? 'password' : 'text';
    }
  }
}
