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
    ],
    languageOptions: {
      ecmaVersion: 2022,
      parser: typescriptEslintParser,
      parserOptions: {
        project: ["./tsconfig.json"],
        sourceType: "module",
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
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
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-explicit-any": "error",
      "prettier/prettier": ["error", {}, { "usePrettierrc": true }]
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "prettier/prettier": "error",
    },
  },
  eslintPluginPrettierRecommended
);
