module.exports = {
  ignorePatterns: [
    '.eslintrc.js',
    'build',
    'cypress',
    'cypress.config.ts',
    'node_modules',
  ],
  extends: ['react-app', 'prettier'],
  plugins: [
    'eslint-plugin-prettier',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'import',
    'unused-imports',
  ],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
  rules: {
    'import/order': [
      1,
      {
        groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
          },
          {
            pattern: './**',
            group: 'internal',
          },
          {
            pattern: '../**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    'comma-dangle': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
