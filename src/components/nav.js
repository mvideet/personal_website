import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { navLinks } from '@config';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';
import { IconLogo } from '@components/icons';

const StyledHeader = styled(motion.header)`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(10px);
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
    props.scrollDirection === 'up' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: rgba(15, 23, 42, 0.85);
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};

    ${props =>
    props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      color: var(--primary);
      width: 42px;
      height: 42px;
      position: relative;
      z-index: 1;

      &:hover,
      &:focus {
        outline: 0;
        svg {
          fill: var(--primary-tint);
        }
      }

      svg {
        fill: none;
        transition: var(--transition);
        user-select: none;
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-sm);

      a {
        padding: 10px;

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: var(--primary);
          font-size: var(--fz-xs);
          text-align: right;
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-sm);
  }
`;

const Nav = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logo = (
    <div className="logo">
      <Link to="/" aria-label="home">
        <IconLogo />
      </Link>
    </div>
  );

  const resumeLink = (
    <a className="resume-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
      Resume
    </a>
  );

  if (prefersReducedMotion) {
    return (
      <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
        <StyledNav>
          {logo}
          <StyledLinks>
            <ol>
              {navLinks.map(({ url, name }, i) => (
                <li key={i}>
                  <Link to={url}>{name}</Link>
                </li>
              ))}
            </ol>
            <div>{resumeLink}</div>
          </StyledLinks>
          <Menu />
        </StyledNav>
      </StyledHeader>
    );
  }

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.1, duration: 0.3 } },
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <StyledHeader
      initial="hidden"
      animate={isMounted ? 'visible' : 'hidden'}
      variants={headerVariants}
      scrollDirection={scrollDirection}
      scrolledToTop={scrolledToTop}>
      <StyledNav>
        <motion.div variants={navItemVariants}>{logo}</motion.div>

        <StyledLinks>
          <ol>
            {navLinks.map(({ url, name }, i) => (
              <motion.li key={i} variants={navItemVariants} transition={{ delay: i * 0.1 + 0.3 }}>
                <Link to={url}>{name}</Link>
              </motion.li>
            ))}
          </ol>
          <motion.div
            variants={navItemVariants}
            transition={{ delay: navLinks.length * 0.1 + 0.3 }}>
            {resumeLink}
          </motion.div>
        </StyledLinks>

        <motion.div variants={navItemVariants}>
          <Menu />
        </motion.div>
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
