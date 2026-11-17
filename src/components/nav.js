import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledNav = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 48px 0 56px;

  @media (max-width: 480px) {
    padding: 32px 0 40px;
  }

  a {
    text-decoration: none;
  }

  .name {
    font-weight: 600;
  }

  ul {
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
    list-style: none;

    a {
      color: var(--muted);

      &:hover,
      &[aria-current='page'] {
        color: var(--fg);
      }
    }
  }
`;

const links = [
  { name: 'home', url: '/' },
  { name: 'writing', url: '/blog' },
];

const Nav = ({ isHome }) => (
  <StyledNav>
    {isHome ? (
      <span />
    ) : (
      <Link className="name" to="/">
        Videet Mehta
      </Link>
    )}
    <nav>
      <ul>
        {links.map(({ name, url }) => (
          <li key={name}>
            <Link to={url}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  </StyledNav>
);

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
