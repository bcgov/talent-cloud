module.exports = {
    ignorePatterns: ['.eslintrc.js', 'build','public', 'index.tsx',  'node_modules'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      tsconfigRootDir: __dirname,
      sourceType: 'module'
    },
    plugins: [
      '@typescript-eslint/eslint-plugin',
      'import',
      'prettier'
    ],
    
    extends: [
      'plugin:prettier/recommended',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended', 
      'plugin:@typescript-eslint/recommended', 
      'prettier'
    ], 
    root: false,
    env: {
      node: true,
      jest: true
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
      ],
      '@typescript-eslint/no-var-requires': 'off',
  
      'import/order': [
        1,
        {
          groups: [
            'external',
            'builtin',
            'internal',
            'sibling',
            'parent',
            'index'
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'external'
            },
            {
              pattern: './**',
              group: 'internal'
            },
            {
              pattern: '../**',
              group: 'internal'
            }
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      'comma-dangle': 'off',
    }
  };
  