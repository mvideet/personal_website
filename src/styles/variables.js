import { css } from 'styled-components';

const variables = css`
  :root {
    /* Neutral, desaturated dark theme */
    --dark-navy: #0b1220; /* deep blue-gray */
    --navy: #0f172a; /* slate-900 */
    --light-navy: #1f2937; /* gray-800 */
    --lightest-navy: #334155; /* slate-700 */
    --navy-shadow: rgba(2, 6, 23, 0.7);
    --slate: #94a3b8; /* slate-400 */
    --light-slate: #cbd5e1; /* slate-300 */
    --lightest-slate: #e5e7eb; /* gray-200 */
    --white: #f9fafb; /* gray-50 */

    /* Neutral accent (subtle) */
    --primary: #94a3b8; /* slate-400 */
    --primary-tint: rgba(148, 163, 184, 0.15);
    --secondary: #a1a1aa; /* zinc-400 */
    /* Back-compat with mixins expecting --green */
    --green: var(--primary);

    --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 6px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }

  /* Light theme overrides */
  [data-theme='light'] {
    --dark-navy: #f8fafc; /* surfaces */
    --navy: #ffffff; /* background */
    --light-navy: #f1f5f9; /* cards */
    --lightest-navy: #e2e8f0; /* borders */
    --navy-shadow: rgba(0, 0, 0, 0.08);

    --slate: #475569; /* text secondary */
    --light-slate: #334155; /* text stronger */
    --lightest-slate: #0f172a; /* headings */
    --white: #0b1220; /* inverted */

    --primary: #0ea5e9; /* accent */
    --primary-tint: rgba(14, 165, 233, 0.15);
    --secondary: #64748b;
    --green: var(--primary);
  }
`;

export default variables;
