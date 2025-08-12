/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      key="theme-init"
      dangerouslySetInnerHTML={{
        __html: `
          (function(){
            try {
              var stored = localStorage.getItem('theme');
              var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
              var theme = stored || (prefersLight ? 'light' : 'dark');
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {}
          })();
        `,
      }}
    />,
  ]);
};
