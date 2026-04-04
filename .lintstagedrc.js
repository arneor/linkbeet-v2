module.exports = {
  // Next.js apps
  'web/**/*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write'
  ],
  'admin/**/*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write'
  ],
  // Mobile
  'mobile/**/*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write'
  ],
  // NestJS services
  'api/**/*.ts': [
    'eslint --fix',
    'prettier --write'
  ],
  // Shared packages
  'shared/**/*.ts': [
    'eslint --fix',
    'prettier --write'
  ],
  // JSON, MD files
  '**/*.{json,md}': [
    'prettier --write'
  ]
}
