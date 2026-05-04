import { defineConfig } from "vite";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// @storybook/addon-vitest has a Windows bug: micromatch path matching fails
// with backslashes. Fixed directly in node_modules/.../index.js (see patch).
//
// Second Windows bug: in browser mode, import.meta.url is an http:// URL.
// convertToFilePath only strips file:// so the _isRunningFromThisFile check
// always returns false, registering no tests.
// Fix: a post-order plugin that replaces _isRunningFromThisFile = <check> with
// _isRunningFromThisFile = true after storybookTest's transform has run.
const storybookBrowserFix = {
  name: 'storybook-browser-windows-fix',
  transform: {
    order: 'post',
    handler(code, id) {
      const fwd = id.split(path.sep).join('/');
      if (!fwd.match(/\.stories\.(ts|tsx|js|jsx|mjs)$/)) return;
      if (!code.includes('_isRunningFromThisFile')) return;
      return {
        code: code.replace(
          /const _isRunningFromThisFile = .+?;/,
          'const _isRunningFromThisFile = true;'
        ),
        map: null,
      };
    },
  },
};

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(async () => ({
  test: {
    projects: [{
      extends: true,
      test: {
        environment: "jsdom"
      }
    }, {
      extends: true,
      plugins: [
        ...await storybookTest({
          configDir: path.join(dirname, '.storybook')
        }),
        storybookBrowserFix,
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts'],
      }
    }]
  }
}));
