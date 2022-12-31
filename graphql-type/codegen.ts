import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://docs.github.com/public/schema.docs.graphql',
  documents: 'documents/**/*.gql',
  generates: {
    'types.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        { typescript: {} },
        { 'typescript-operations': {} },
        { 'typescript-document-nodes': {} },
      ],
      config: {
        enumsAsTypes: true,
        immutableTypes: true,
        useTypeImports: true,
        defaultScalarType: 'unknown',
        scalars: {
          /** A (potentially binary) string encoded using base64. */
          Base64String: 'string',
          /** An ISO-8601 encoded date string. */
          Date: 'string',
          /** An ISO-8601 encoded UTC date string. */
          DateTime: 'string',
          /** A Git object ID. */
          GitObjectID: 'string',
          /** A fully qualified reference name (e.g. `refs/heads/master`). */
          GitRefname: 'string',
          /** Git SSH string */
          GitSSHRemote: 'string',
          /** An ISO-8601 encoded date string. Unlike the DateTime type, GitTimestamp is not converted in UTC. */
          GitTimestamp: 'string',
          /** A string containing HTML code. */
          HTML: 'string',
          /** An ISO-8601 encoded UTC date string with millisecond precision. */
          PreciseDateTime: 'string',
          /** An RFC 3986, RFC 3987, and RFC 6570 (level 4) compliant URI string. */
          URI: 'string',
          /** A valid x509 certificate string */
          X509Certificate: 'string',
        },
      },
    },
  },
};

export default config;
