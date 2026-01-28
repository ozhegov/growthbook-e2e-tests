import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';
import customRules from './eslint/index.js';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ['e2e/tests/**/*.test.ts'],
    plugins: {
      playwright,
      custom: customRules,
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'custom/require-allure-id': 'error',
      'custom/require-role-tag': 'error',
    },
  },
];
