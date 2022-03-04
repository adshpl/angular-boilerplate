import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup, FormControl, AbstractControl, ValidationErrors,
} from '@angular/forms';
import { RoutePaths } from 'constants/route-path';
import { ValidationErrorCodes } from 'constants/validation-error-codes';
import { AuthenticationService } from 'services/authentication.service';
import { FormService } from 'services/form.service';
import { confirmFields } from 'validators/confirm-fields.validator';

const { HOME, SIGN_IN } = RoutePaths;
const { PASSWORDS_SHOULD_MATCH } = ValidationErrorCodes;

@Component({
  selector: 'registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.scss'],
})
export class RegistrationComponent {
  form = new FormGroup({
    username: new FormControl(),
    login: new FormControl(),
    password: new FormControl(),
    repeatPassword: new FormControl(),
  }, {
    validators: confirmFields(['password', 'repeatPassword'], {
      message: PASSWORDS_SHOULD_MATCH,
    }),
  });

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formService: FormService,
  ) {}

  submit(): void {
    const {
      router, authenticationService, form, formService,
    } = this;
    const { username, login, password } = form.value;

    if (form.valid) {
      authenticationService
        .register(username, login, password)
        .subscribe(
          () => {
            authenticationService
              .login(login, password)
              .subscribe(
                () => router.navigate([HOME]),
                () => router.navigate([SIGN_IN]),
              );
          },
          (errors) => {
            const errorMessages = formService.collectErrorMessages(errors);
            formService.setServerErrorsToFormGroupControls(form, errorMessages);
          },
        );
    }
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get login(): FormControl {
    return this.form.get('login') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get repeatPassword(): FormControl {
    return this.form.get('repeatPassword') as FormControl;
  }

  get errors(): ValidationErrors | null {
    return this.form.errors;
  }
}
