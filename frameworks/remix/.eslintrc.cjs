/** @type {import('eslint').Linter.Config} */
module.exports = {
  "root": true,
  "extends": [
    'lxsmnsyc/typescript/react',
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node"
  ],
  "parserOptions": {
    "project": "./tsconfig.eslint.json",
    "tsconfigRootDir": __dirname,
  },
  "rules": {
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": ["**/*.test.ts"]
      }
    ],
  }
};
