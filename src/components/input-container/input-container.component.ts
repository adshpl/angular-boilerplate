import { Component, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

export type TTranslationParams = {
  field: string;
};

@Component({
  selector: 'input-container',
  templateUrl: 'input-container.component.html',
  styleUrls: ['input-container.component.scss'],
})
export class InputContainerComponent {
  @Input() label = '';
  @Input() title = '';
  @Input() name = '';
  @Input() formControl = new FormControl();

  get errors(): ValidationErrors | null {
    const {
      formControl: {
        errors,
      },
    } = this;

    return errors;
  }

  get translationParams(): TTranslationParams {
    const { title } = this;

    return {
      field: title,
    };
  }
}
