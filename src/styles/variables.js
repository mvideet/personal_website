import { css } from 'styled-components';

const variables = css`
  :root {
    --bg: #ffffff;
    --fg: #111111;
    --muted: #666666;
    --faint: #999999;
    --border: #e5e5e5;
    --surface: #f5f5f5;
    --underline: #cccccc;

    --font-sans: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue',
      Arial, sans-serif;
    --font-mono: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace;

    --content-width: 640px;
    --border-radius: 6px;
    --transition: color 0.15s ease, text-decoration-color 0.15s ease;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 28px;

    /* Aliases for older components (archive, 404, Prism) */
    --navy: var(--bg);
    --dark-navy: var(--bg);
    --light-navy: var(--surface);
    --lightest-navy: var(--border);
    --navy-shadow: transparent;
    --dark-slate: var(--faint);
    --slate: var(--muted);
    --light-slate: var(--fg);
    --lightest-slate: var(--fg);
    --white: var(--fg);
    --primary: var(--fg);
    --primary-tint: var(--surface);
    --green: var(--fg);
    --nav-height: 0px;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #111111;
      --fg: #ededed;
      --muted: #a1a1a1;
      --faint: #707070;
      --border: #262626;
      --surface: #1a1a1a;
      --underline: #444444;
    }
  }
`;

export default variables;
