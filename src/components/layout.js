import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Nav, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: calc(var(--content-width) + 48px);
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 480px) {
    padding: 0 16px;
  }

  #content {
    flex: 1;
  }
`;

const Layout = ({ children, location }) => {
  useEffect(() => {
    // Open external links in a new tab
    Array.from(document.querySelectorAll('a')).forEach(link => {
      if (link.host && link.host !== window.location.host) {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
      }
    });

    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        el.scrollIntoView();
      }
    }
  }, [location.pathname]);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <a className="skip-to-content" href="#content">
            Skip to content
          </a>

          <StyledContent>
            <Nav isHome={location.pathname === '/'} />
            <main id="content">{children}</main>
            <Footer />
          </StyledContent>
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
