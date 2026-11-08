import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import shadcn from "ultracite/oxlint/shadcn";
import vue from "ultracite/oxlint/vue";

import ignorePatterns from "./oxignore.json" with { type: "json" };

export default defineConfig({
  env: core.env,
  extends: [core, vue, shadcn, antiSlop],
  ignorePatterns: [...(core.ignorePatterns ?? []), ...ignorePatterns],
  jsPlugins: [...shadcn.jsPlugins, "oxlint-tailwindcss"],
  options: { typeAware: true },
  rules: {
    "func-style": "off",
    "no-await-in-loop": "off",
    "require-await": "off",
    "sort-keys": "off",
    complexity: "off",
    "oxc/no-barrel-file": "off",
    // Both plugins report these; hand each problem to one of them.
    "shadcn/no-unknown-classes": "off",
    "tailwindcss/no-unknown-classes": "error",
    "tailwindcss/no-conflicting-classes": "error",
    "tailwindcss/no-duplicate-classes": "warn",
    "tailwindcss/enforce-sort-order": "error",
    "tailwindcss/enforce-shorthand": "error",
    "tailwindcss/enforce-canonical": "error",
  },
  settings: {
    tailwindcss: {
      entryPoint: "assets/css/main.css",
    },
  },
});
