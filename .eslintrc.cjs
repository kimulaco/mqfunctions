module.exports = {
  env: {
    node: true,
    jest: true,
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      files: ['./rollup.config.js'],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
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
  ],
}
