type TProcess = {
  ENVIRONMENT: string;
  GRAPHQL_API: string;
};

const {
  env: {
    ENVIRONMENT = 'development',
    GRAPHQL_API = 'http://localhost:3003/graphql',
  },
} = process;

export const Process: TProcess = {
  ENVIRONMENT,
  GRAPHQL_API,
};
