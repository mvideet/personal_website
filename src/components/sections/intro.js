import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledIntroSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding-top: calc(var(--nav-height) + 20px);

  .overline {
    color: var(--primary);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    margin-bottom: 6px;
  }

  .name {
    font-size: clamp(28px, 6vw, 48px);
    margin: 0 0 8px;
    color: var(--lightest-slate);
  }

  .tagline {
    color: var(--slate);
    font-size: clamp(16px, 2.5vw, 20px);
    margin: 0 0 14px;
  }

  .body p {
    margin-bottom: 12px;
  }

  .cta {
    margin-top: 18px;
  }
`;

const SkillsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  gap: 6px 10px;
  padding: 0;
  margin: 12px 0 0 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 18px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--light-slate);

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: var(--primary);
      font-size: var(--fz-sm);
      line-height: 12px;
    }
  }
`;

const Intro = () => {
  const skills = ['Python', 'PyTorch', 'JAX', 'SQL', 'Node.JS', 'React'];

  return (
    <StyledIntroSection id="about">
      <motion.h2
        className="numbered-heading"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}>
        About Me
      </motion.h2>

      <div>
        <div className="overline">Hi, my name is</div>
        <h1 className="name">Videet Mehta.</h1>
        <p className="tagline">
          I'm a student at MIT studying Computer Science. I'm passionate about frontier AI research
          and its applications in the real world.
        </p>

        <div className="body">
          <p>
            Hi! I'm Videet Mehta, a Computer Science student at MIT passionate about pushing the
            boundaries of AI. My interests focuses on optimizing large language models and
            understanding reasoning capabilities. In the future, I want to work on either applied-AI
            or in core-AI research.
          </p>
          <p>
            Fast-forward to today, and I've had the privilege of working at a commodities trading
            firm, an AI industry research lab, a gaming start-up, an MIT NLP lab.
          </p>
          <p>
            Additionally, I'm proud to have represented USA in the International Olympiad in
            Artificial Intelligence and to have won a gold medal!
          </p>
          <p>Here are a few technologies I've been working with recently:</p>
          <SkillsList>
            {skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </SkillsList>
        </div>

        <div className="cta">
          <a
            className="inline-link"
            href="https://github.com/mvideet"
            target="_blank"
            rel="noreferrer">
            Check out my Github!
          </a>
        </div>
      </div>
    </StyledIntroSection>
  );
};

export default Intro;
