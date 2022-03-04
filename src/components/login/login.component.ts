import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup, FormControl, AbstractControl, ValidationErrors,
} from '@angular/forms';
import { RoutePaths } from 'constants/route-path';
import { AuthenticationService } from 'services/authentication.service';
import { FormService } from 'services/form.service';

const { HOME } = RoutePaths;

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl(),
    login: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formService: FormService,
  ) {}

  submit(): void {
    const { router, form, formService } = this;
    const { login, password } = form.value;

    if (form.valid) {
      this.authenticationService
        .login(login, password)
        .subscribe(
          () => router.navigate([HOME]),
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

  get errors(): ValidationErrors | null {
    return this.form.errors;
  }
}
