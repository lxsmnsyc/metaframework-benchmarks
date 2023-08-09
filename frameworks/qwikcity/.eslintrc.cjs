module.exports = {
  root: true,
  extends: [
    'lxsmnsyc/typescript/react',
    'plugin:qwik/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error', {
        devDependencies: ['**/*.test.ts'],
      },
    ],
    'react/no-unknown-property': 'off',
  },
};
