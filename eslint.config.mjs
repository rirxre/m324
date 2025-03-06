import js from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Backend: Gilt für alle Dateien im "backend"-Ordner
    files: ["backend/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node, // Setzt die Umgebung auf Node.js
    },
  },
  {
    // Frontend: Gilt für alle Dateien im "frontend"-Ordner
    files: ["frontend/**/*.js", "frontend/**/*.jsx"],
    languageOptions: {
      sourceType: "module",
      globals: globals.browser, // Setzt die Umgebung auf den Browser
    },
  },
  js.configs.recommended, // Empfohlene ESLint-Regeln für JS
  {
    ignores: ["node_modules/", "frontend/dist/"], // Verhindert Fehler im dist-Ordner
  },
];
