import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import typescriptEslintParser from '@typescript-eslint/parser'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'

export default [
  {
    ignores: ['dist/', 'coverage/', 'test/fixtures/js/mqfunctions.js'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.browser,
        ...globals.es6,
        window: true,
      },
    },
  },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['./rollup.config.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptEslintParser,
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]
