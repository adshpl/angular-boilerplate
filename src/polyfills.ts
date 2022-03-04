import '@angular/localize/init';
import 'zone.js';

(window as any).process = {
  env: {
    ENVIRONMENT: undefined,
    GRAPHQL_API: undefined,
  },
};
