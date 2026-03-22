import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist', 'node_modules', 'build', '.netlify', 'public/desktop_pc', 'public/planet'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...eslintConfigPrettier.rules,

      // Prettier integration
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],

      // React specific rules
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off', // Since we're not using PropTypes
      'react/react-in-jsx-scope': 'off', // Not needed in React 18+
      'react/no-unescaped-entities': 'warn',
      'react/jsx-key': 'error',
      'react/no-unknown-property': [
        'error',
        {
          ignore: [
            'intensity',
            'position',
            'args',
            'object',
            'rotation',
            'castShadow',
            'receiveShadow',
            'polygonOffset',
            'polygonOffsetFactor',
            'flatShading',
            'groundColor',
            'angle',
            'penumbra',
            'shadow-mapSize',
            'position-y',
            'rotation-y',
            'options',
          ],
        },
      ],

      // React Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // General best practices
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-debugger': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-duplicate-imports': 'error',

      // Code quality
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-constant-condition': 'warn',
    },
  },
];
