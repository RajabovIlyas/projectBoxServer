module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'linebreak-style': 0,
    'no-console': 0,
    'max-len': 0,
    'no-throw-literal': 0,
    'no-unused-vars': 0,
    'no-invalid-this': 0,
    'new-cap': 0,
  },
};
