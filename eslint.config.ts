import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const config = [
  {
    ignores: ['**/.next/', '**/out/', '**/node_modules/', '.open-next/**'],
  },
  ...compat.extends('next/core-web-vitals'),
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
    },
  },
]

export default config
