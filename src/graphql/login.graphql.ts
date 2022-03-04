import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { RequestGraphql } from 'graphql/request.graphql';

export type TLoginGraphqlResponse = {
  login: {
    token: string;
  };
};

@Injectable()
export class LoginGraphql extends RequestGraphql {
  login(login: string, password: string): Observable<TLoginGraphqlResponse> {
    return this.mutate({
      mutation: gql`
        mutation login($login: String!, $password: String!) {
          login(login: $login, password: $password) {
            token
          }
        }
      `,
      variables: {
        login,
        password,
      },
    });
  }
}
