import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import babelParser from "@babel/eslint-parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended, // Standard ESLint-Regeln für JS
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: globals.node,
    },
  },
  {
    files: ["frontend/**/*.js", "frontend/**/*.jsx", "frontend/**/*.tsx", "frontend/**/*.ts"],
    languageOptions: {
      sourceType: "module",
      parser: babelParser, // 🎯 Richtiger Parser für JSX & TS
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"], // 🎯 Unterstützt JSX & React
        },
      },
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    ignores: [
      "node_modules/",
      "frontend/dist/",
      "frontend/build/",
      "backend/dist/",
      "backend/build/",
    ], // Verhindert Fehler durch generierte Dateien
  },
];
