import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/features/*/components/*',
                '@/features/*/services/*',
                '@/features/*/hooks/*',
                '@/features/*/schemas/*',
                '@/features/*/types/*',
                '@/features/*/queries/*',
                '@/features/*/translations/*',
                '@/features/*/utils/*',
              ],
              message: 'Do not import directly from feature internals. Import only from the feature\'s index.ts (barrel file).',
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
