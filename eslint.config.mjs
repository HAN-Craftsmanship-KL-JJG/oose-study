import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

// Run with --max-warnings 0 (see package.json), so every warning fails the check.
export default defineConfig([
  globalIgnores([".next/**", "node_modules/**", "next-env.d.ts"]),
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    linterOptions: { reportUnusedDisableDirectives: "error" },
    rules: {
      // Size limits. Prettier wraps code at 100; max-len also catches long comments.
      "max-len": [
        "error",
        {
          code: 100,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "max-lines": ["error", { max: 250, skipBlankLines: false, skipComments: false }],
      "max-lines-per-function": ["error", { max: 120, skipBlankLines: true, skipComments: true }],
      "max-depth": ["error", 4],
      "max-params": ["error", 4],
      complexity: ["error", 15],
      // Strictness.
      eqeqeq: ["error", "always"],
      curly: ["error", "multi-line"],
      "no-console": ["error", { allow: ["error"] }],
      "prefer-const": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
    },
  },
  {
    // The question bank is data: longer files are fine, functions are rare.
    files: ["content/**/*.ts"],
    rules: { "max-lines": ["error", { max: 450 }] },
  },
  {
    files: ["**/*.{js,mjs}"],
    extends: [tseslint.configs.disableTypeChecked],
  },
]);
