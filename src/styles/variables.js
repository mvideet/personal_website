import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #0f172a;
    --navy: #1e293b;
    --light-navy: #334155;
    --lightest-navy: #475569;
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --slate: #94a3b8;
    --light-slate: #cbd5e1;
    --lightest-slate: #f1f5f9;
    --white: #f8fafc;

    --primary: #38bdf8;
    --primary-tint: rgba(56, 189, 248, 0.1);
    --secondary: #a78bfa;

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
`;

export default variables;
