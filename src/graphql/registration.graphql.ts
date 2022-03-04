import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { RequestGraphql } from './request.graphql';

export type TRequestGraphqlResponse = {
  registration: {
    id: string;
    username: string;
    login: string;
    createdAt: string;
  };
};

@Injectable()
export class RegistrationGraphql extends RequestGraphql {
  register(username: string, login: string, password: string): Observable<TRequestGraphqlResponse> {
    return this.mutate({
      mutation: gql`
        mutation register($username: String!, $login: String!, $password: String!) {
          register(username: $username, login: $login, password: $password) {
            id
            username
            login
            createdAt
          }
        }
      `,
      variables: {
        username,
        login,
        password,
      },
    });
  }
}
