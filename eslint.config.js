import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  { ignores: ["build", "dist", "coverage", "node_modules"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
    },
    rules: {
      ...js.configs.recommended.rules,
      // eslint-plugin-react: nhận diện identifier dùng trong JSX là "đã sử dụng".
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      // react-hooks: chỉ dùng 2 rule cổ điển, tránh bộ React Compiler quá gắt.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // catch {} rỗng là chủ đích trong code hiện tại → hạ xuống warn.
      "no-empty": ["warn", { allowEmptyCatch: true }],
      // unused-imports quản lý phần biến/import không dùng thay cho no-unused-vars.
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "none",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];
