module.exports = {
  'env': {
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'rules': {
    'brace-style': [
      'error',
      '1tbs'
    ],
    'curly': [
      'error',
      'all'
    ],
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'always',
        'asyncArrow': 'always',
        'named': 'never'
      }
    ],
    'semi': 'error',
    'arrow-parens': 'error',
    'no-trailing-spaces': 'error',
    'no-multi-spaces': 'error'
  }
};
