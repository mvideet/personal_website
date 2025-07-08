import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled(motion.footer)`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: block;
  width: 100%;
  max-width: 270px;
  margin: 0 auto 10px;
  color: var(--light-slate);

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      &:hover {
        color: var(--primary);
      }
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <StyledFooter
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name} target="_blank" rel="noopener noreferrer">
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>
    </StyledFooter>
  );
};

export default Footer;
