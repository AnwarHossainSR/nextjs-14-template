module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb',
    // eslint TypeScript rules (github.com/typescript-eslint/typescript-eslint)
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // eslint react rules (github.com/yannickcr/eslint-plugin-react)

    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',

    // includes eslint-plugin-react / eslint-plugin-react-hooks / eslint-plugin-next
    // "next/core-web-vitals"
    'plugin:@next/next/recommended',

    // prettier plugin here disables ESLint rules related to code styling that may disagree with prettierrc rules
    // it only turn off rules so it needs to always be at the bottom
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'import',
    '@typescript-eslint',
    'react',
    'simple-import-sort',
    'prettier',
  ],
  root: true,
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'consistent-return': 'off',
    'import/extensions': 'off',
    // We will use href prop in Next.js's Link component instead of anchor tag
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: '@/**',
            position: 'after',
          },
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        aspects: ['invalidHref', 'preferButton'],
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
      },
    ],
    'jsx-a11y/label-has-associated-control': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys': 'off',
  },
  settings: {
    // TypeScript needs this to resolve nextjs absolute imports
    'import/resolver': {
      typescript: {
        project: '.',
      },
    },
    react: {
      version: 'detect',
    },
  },
};
