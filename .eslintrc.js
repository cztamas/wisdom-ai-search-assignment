'use strict';

module.exports = {
  env: { jest: true, node: true },
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  rules: {
    'node/no-unpublished-require': 'off',
    'no-unused-vars': 'warn',
    strict: 'warn',
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        version: '>=20.0.0',
      },
    ],
  },
};
