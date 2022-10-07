module.exports = {
  root: true,
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['./tsconfig.json'] },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-shadow': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-continue': 'off',
  },
};
