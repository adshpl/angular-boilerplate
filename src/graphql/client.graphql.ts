import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpLinkHandler } from 'apollo-angular/http/http-link';
import { InMemoryCache } from '@apollo/client/core';
import { Process } from 'constants/process';

const { GRAPHQL_API } = Process;

export type TFactory = {
  cache: InMemoryCache;
  link: HttpLinkHandler;
};

export const ClientGraphql = {
  provide: APOLLO_OPTIONS,
  useFactory: (httpLink: HttpLink): TFactory => ({
    cache: new InMemoryCache(),
    link: httpLink.create({
      uri: GRAPHQL_API,
    }),
  }),
  deps: [
    HttpLink,
  ],
};
