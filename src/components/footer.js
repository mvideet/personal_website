import React from 'react';
import styled from 'styled-components';
import { email, socialMedia } from '@config';

const StyledFooter = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  margin-top: 80px;
  padding: 24px 0 48px;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: var(--fz-sm);

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    text-decoration: none;

    &:hover {
      color: var(--fg);
    }
  }
`;

const Footer = () => (
  <StyledFooter>
    <span>© {new Date().getFullYear()} Videet Mehta</span>
    <ul>
      {socialMedia
        .filter(({ name }) => name !== 'Instagram')
        .map(({ name, url }) => (
          <li key={name}>
            <a href={url}>{name === 'Twitter' ? 'X' : name}</a>
          </li>
        ))}
      <li>
        <a href={`mailto:${email}`}>Email</a>
      </li>
    </ul>
  </StyledFooter>
);

export default Footer;
