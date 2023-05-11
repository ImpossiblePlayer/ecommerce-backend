const FS_LAYERS = [
  'src',
  'routes',
  'controllers',
  'middleware',
  'models',
  'services',
  'shared',
];

module.exports = {
  root: true,
  env: {
    browser: false,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: ['prettier', '@typescript-eslint', 'import'],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        pathGroups: FS_LAYERS.map((layer) => ({
          pattern: `**/?(*)${layer}{,/**}`,
          group: 'internal',
          position: 'after',
        })),
        distinctGroup: false,
        groups: [
          'builtin',
          'external',
          'internal',
          'type',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
  },
};
