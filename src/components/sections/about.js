import React, { useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled(motion.div)`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--primary);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled(motion.div)`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: normal;
      filter: none;
    }

    &:hover,
    &:focus {
      outline: 0;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
      border: 2px solid var(--primary);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = ['Python', 'PyTorch', 'JAX', 'SQL', 'Node.JS', 'React'];

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <StyledAboutSection id="about" ref={ref}>
      <motion.h2
        className="numbered-heading"
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.5, delay: 0.1 }}>
        About Me
      </motion.h2>

      <div className="inner">
        <StyledText
          variants={variants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <div>
            <p>
              Hi! My name is Videet Mehta and I'm a student at MIT studying Computer Science. I'm
              originally from Houston, Texas. I'm interested in AI research and applied-AI in the
              startup space.
            </p>

            <p>
              Fast-forward to today, and I've had the privilege of working at{' '}
              <a href="https://mercuria.com/">a commodities trading firm</a>,{' '}
              <a href="https://www.sarvam.ai/">an AI industry research lab</a>, and{' '}
              <a href="https://www.hiddenstudios.gg/">a gaming start-up</a>,{' '}
              <a href="https://sls.csail.mit.edu/">an MIT NLP lab</a>
            </p>

            <p>
              Additionally, I'm proud to have represented USA in the{' '}
              <a href="https://ioai-official.org/the-worlds-best-studios-in-ai-honoured-at-the-first-international-artificial-intelligence-olympiad-in-burgas-bulgaria/">
                2024 International Olympiad in Artificial Intelligence
              </a>{' '}
              and to have won a gold medal!
            </p>
            <p>Here are a few technologies I've been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic
          variants={variants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.3 }}>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
