module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    "arrow-spacing": ["warn", { "before": true, "after": true }],
    "comma-spacing": ["warn", { "before": false, "after": true }],
    "object-curly-spacing": ["warn", "always"],
    "quotes": ["error", "single"],
    "no-trailing-spaces": ["error"],
    'no-console': 'warn',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
