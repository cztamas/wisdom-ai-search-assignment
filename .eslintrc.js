'use strict';

module.exports = {
  env: { jest: true, node: true },
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  rules: {
    'node/no-unpublished-require': 'off',
    'no-process-exit': 'off',
    'no-unused-vars': 'warn',
    strict: 'warn'
  }
};
