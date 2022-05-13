module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint/eslint-plugin", "react", "react-hooks", "@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "project": "./tsconfig.json",
    "sourceType": "module",
    "warnOnUnsupportedTypeScriptVersion": false,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "semi": "off",
    "@typescript-eslint/semi": ["off"],
    "react/prop-types": ["off"],
    "prettier/prettier": "warn",
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/ban-types": ["off"],
    "react/display-name": ["off"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
