import { createGlobalStyle } from 'styled-components';
import variables from './variables';
import PrismStyles from './PrismStyles';

const GlobalStyle = createGlobalStyle`
  ${variables};

  html {
    box-sizing: border-box;
    width: 100%;
    color-scheme: light dark;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: var(--fg);
    color: var(--bg);
  }

  :focus-visible {
    outline: 2px solid var(--fg);
    outline-offset: 2px;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--bg);
    color: var(--fg);
    font-family: var(--font-sans);
    font-size: var(--fz-md);
    line-height: 1.65;
  }

  main {
    display: block;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 12px 0;
    font-weight: 600;
    color: var(--fg);
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  p {
    margin: 0 0 16px 0;
  }

  a {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: var(--underline);
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    transition: var(--transition);

    &:hover {
      text-decoration-color: var(--fg);
    }
  }

  img,
  .gatsby-image-wrapper {
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    fill: currentColor;
    vertical-align: middle;
  }

  button {
    cursor: pointer;
    font: inherit;
  }

  blockquote {
    margin: 24px 0;
    padding-left: 16px;
    border-left: 2px solid var(--border);
    color: var(--muted);
  }

  hr {
    height: 1px;
    margin: 32px 0;
    border: 0;
    background-color: var(--border);
  }

  code {
    font-family: var(--font-mono);
    font-size: 0.9em;
  }

  .skip-to-content {
    position: absolute;
    left: -999px;
    top: 8px;
    padding: 8px 12px;
    background: var(--fg);
    color: var(--bg);
    z-index: 99;

    &:focus {
      left: 8px;
    }
  }

  ${PrismStyles};
`;

export default GlobalStyle;
