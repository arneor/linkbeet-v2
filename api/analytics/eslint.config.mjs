import { baseConfig } from '../../eslint.config.base.mjs'

export default [
  ...baseConfig,
  {
    rules: {
      // NestJS specific
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'off', // NestJS uses Logger not console
    },
  },
]
