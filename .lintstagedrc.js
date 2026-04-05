module.exports = {
  'web/**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  'admin/**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  'mobile/**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  'api/**/*.ts': ['eslint --fix', 'prettier --write'],
  'shared/**/*.ts': ['eslint --fix', 'prettier --write'],
  '**/*.{json,md}': ['prettier --write'],
}
