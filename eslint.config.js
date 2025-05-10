// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import typescriptEslintParser from "@typescript-eslint/parser";

export default tseslint.config(
  {
    ignores: [
      "**/.angular/*",
      "**/.vscode/*",
      "**/node_modules/*",
      "**/dist/*",
      "**/build/*",
      "*.js",
    ],
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended
    ],
    languageOptions: {
      ecmaVersion: 2022,
      parser: typescriptEslintParser,
      parserOptions: {
        project: ["./tsconfig.json"],
        sourceType: "module",
        ecmaVersion: 2020,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-class-suffix": "error",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/component-class-suffix": [
        "error",
        {
          suffixes: ["Component", "Page", "View"],
        }
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
          overrides: {
            constructors: "no-public"
          }
        }
      ],
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        }
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "prettier/prettier": ["error", {}, { "usePrettierrc": true }],
      "quotes": [
        "error",
        "double",
        { avoidEscape: true }
      ],
      "semi": ["error", "always"],
      "no-console": "off",
      curly: "error",
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      "arrow-body-style": ["error", "as-needed"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" }
      ]
    },
    settings: {
      "import/resolver": {
        typescript: {}
      }
    }
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      eslintPluginPrettierRecommended
    ],
    rules: {
      "@angular-eslint/template/banana-in-box": "error",
      "@angular-eslint/template/no-negated-async": "error",
      "@angular-eslint/template/cyclomatic-complexity": [
        "error", {
        maxComplexity: 5
      }],
      "prettier/prettier": "error",
    },
  },
);
