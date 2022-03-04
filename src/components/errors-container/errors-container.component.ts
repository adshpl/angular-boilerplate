import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'errors-container',
  templateUrl: 'errors-container.component.html',
  styleUrls: ['errors-container.component.scss'],
})
export class ErrorsContainerComponent {
  @Input() translationParams? = {};
  @Input() errors: ValidationErrors | null = {};

  get errorsValues(): string[] {
    const { errors } = this;

    if (!errors) {
      return [];
    }

    return Object
      .keys(errors)
      .map((exception: string) => `validation/${exception}`);
  }
}
