module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat',     // new feature
      'fix',      // bug fix
      'chore',    // maintenance
      'docs',     // documentation
      'style',    // formatting
      'refactor', // code refactor
      'test',     // adding tests
      'perf',     // performance
      'ci',       // CI/CD changes
      'build',    // build changes
      'revert'    // revert commit
    ]],
    'subject-max-length': [2, 'always', 100],
    'subject-case': [2, 'always', 'lower-case'],
  }
}
