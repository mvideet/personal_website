import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: var(--light-navy);
  color: var(--lightest-slate);
  border: 1px solid var(--lightest-navy);
  transition: var(--transition);

  &:hover {
    border-color: var(--primary);
  }
`;

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('theme');
    const initial =
      stored ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark');
    document.documentElement.setAttribute('data-theme', initial);
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <Button onClick={toggle} aria-label="Toggle theme" title="Toggle theme">
      {theme === 'dark' ? '🌙' : '☀️'}
    </Button>
  );
};

export default ThemeToggle;
