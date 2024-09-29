import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] }, // Ignore 'dist' folder
  {
    extends: [
      js.configs.recommended, // ESLint's recommended JS rules
      ...tseslint.configs.recommended, // TypeScript ESLint recommended rules
      'plugin:prettier/recommended', // Prettier for formatting
    ],
    files: ['**/*.{ts,tsx}'], // Apply to TypeScript and TSX files
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript version
      globals: globals.browser, // Browser globals
    },
    plugins: {
      'react-hooks': reactHooks, // React Hooks ESLint plugin
      'react-refresh': reactRefresh, // React Refresh ESLint plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Enforce React hooks rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error', // Enforce Prettier formatting as ESLint errors
    },
  }
);
