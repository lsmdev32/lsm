import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

import ignorePatterns from "./oxignore.json" with { type: "json" };

export default defineConfig({
  ...ultracite,
  ignorePatterns,
  sortTailwindcss: {
    functions: ["clsx", "cva", "tw", "twMerge", "cn", "twJoin", "tv"],
    // Sort against this project's theme, not Tailwind's bundled one.
    stylesheet: "assets/css/main.css",
  },
});
