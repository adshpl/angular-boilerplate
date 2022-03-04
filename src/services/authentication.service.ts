import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginGraphql, TLoginGraphqlResponse } from 'graphql/login.graphql';
import { RegistrationGraphql, TRequestGraphqlResponse } from 'graphql/registration.graphql';
import { JWTService } from 'services/jwt.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private loginGraphql: LoginGraphql,
    private registrationGraphql: RegistrationGraphql,
    private jwtService: JWTService,
  ) {}

  login(login: string, password: string): Observable<TLoginGraphqlResponse> {
    return new Observable((subscriber) => {
      this.loginGraphql
        .login(login, password)
        .subscribe(
          (data: TLoginGraphqlResponse) => {
            const { jwtService } = this;

            const {
              login: {
                token,
              },
            } = data;

            jwtService.setToken(token);

            subscriber.next(data);
          },
          (errors) => subscriber.error(errors),
        );
    });
  }

  register(username: string, login: string, password: string): Observable<TRequestGraphqlResponse> {
    return new Observable((subscriber) => {
      this.registrationGraphql
        .register(username, login, password)
        .subscribe(
          (data) => subscriber.next(data),
          (errors) => subscriber.error(errors),
        );
    });
  }
}
