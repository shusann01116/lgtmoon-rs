// @ts-check

import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const eslintConfig = tseslint.config(
  {
    ignores: ['**/.next/**', '**/node_modules/**', '**/pkg/**'],
  },
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
    },
    // @ts-expect-error - The nextPlugin is not typed
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'error',
    },
  },
  tseslint.configs.strict,
  prettierConfig,
);

export default eslintConfig;
