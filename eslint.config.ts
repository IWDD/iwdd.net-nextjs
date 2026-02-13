import { fileURLToPath } from 'node:url'

import { includeIgnoreFile } from '@eslint/compat'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  includeIgnoreFile(gitignorePath),
  globalIgnores(['worker-configuration.d.ts']),
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['./', '../'],
        },
      ],
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },
])

export default eslintConfig
