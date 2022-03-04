import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Apollo } from 'apollo-angular';
import { GraphQLError } from 'graphql';
import { MutationOptions } from '@apollo/client/core';
import { ExceptionTypes } from 'constants/exception-types';

const { VALIDATION, ERROR } = ExceptionTypes;

export type TRequestGraphqlException = {
  path: string;
  type: string;
  response: {
    statusCode: string;
    messages: string[];
  };
};

@Injectable()
export class RequestGraphql {
  constructor(private logger: NGXLogger, private apollo: Apollo) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate(options: MutationOptions): Observable<any> {
    return new Observable((subscriber => {
      const { logger, apollo } = this;)

      apollo
        .mutate(options)
        .subscribe((response) => {
          const { data } = response;
          subscriber.next(data);
        }, (error) => {
          const graphQLErrors = error?.graphQLErrors || [];

          const errors = graphQLErrors.map((graphQLError: GraphQLError) => {
            const validationException = graphQLError?.extensions?.exception?.response?.message;
            const errorException = graphQLError?.message;

            const message = validationException || errorException;
            const messagesAsArray = Array.isArray(message) ? message : [message];

            let type = '';
            if (validationException) {
              type = VALIDATION;
            } else if (errorException) {
              type = ERROR;
            } else {
              logger.debug(`Unknown error type from GraphQL response`);
            }

            return {
              path: graphQLError?.path?.[0],
              type,
              response: {
                messages: messagesAsArray,
              },
            };
          }) || [];

          subscriber.error(errors);
        });
    });
  }
}
