module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'header-max-length': [2, 'always', 70],

    'subject-case': [2, 'always', 'lower-case'],

    'type-case': [2, 'always', 'lower-case'],

    'type-enum': [
      2,

      'always',

      [
        'feat',

        'fix',

        'docs',

        'style',

        'refactor',

        'perf',

        'test',

        'chore',

        'revert',
      ],
    ],
  },
};
