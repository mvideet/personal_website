import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledIntroSection = styled.section`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding-top: calc(var(--nav-height) + 20px);

  /* subtle spotlight behind intro to make it pop */
  &:before {
    content: '';
    position: absolute;
    inset: -40px -20px 0;
    background: radial-gradient(650px 220px at 15% 0%, var(--primary-tint), transparent 60%);
    pointer-events: none;
    z-index: -1;
  }

  .overline {
    color: var(--primary);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    margin-bottom: 6px;
  }

  .name {
    font-size: clamp(48px, 9vw, 88px);
    margin: 0 0 10px;
    color: var(--lightest-slate);
    line-height: 1.05;
    letter-spacing: -0.5px;
    position: relative;
    display: inline-block;

    /* gradient underline */
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      height: 3px;
      width: min(180px, 40%);
      background: linear-gradient(90deg, var(--primary), transparent);
      border-radius: 2px;
    }

    /* minimal animated caret */
    &:before {
      content: '';
      position: absolute;
      left: calc(100% + 8px);
      bottom: 6px;
      width: 2px;
      height: 0.9em;
      background: var(--primary);
      animation: intro-caret 1.1s steps(1, end) infinite;
    }
  }

  .tagline {
    color: var(--slate);
    font-size: clamp(18px, 3.2vw, 24px);
    margin: 0 0 18px;
    max-width: 820px;
    line-height: 1.5;
  }

  /* Make bolded text pop consistently without inline styles */
  .tagline strong,
  .body strong {
    color: var(--primary);
    font-weight: 700;
  }

  .body p {
    margin-bottom: 12px;
    font-size: var(--fz-lg);
    line-height: 1.6;
  }

  .cta {
    margin-top: 18px;
    a {
      ${({ theme }) => theme.mixins.button};
    }
  }

  @keyframes intro-caret {
    0%,
    40% {
      opacity: 1;
    }
    50%,
    100% {
      opacity: 0;
    }
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
  const skills = ['PyTorch', 'JAX', 'DDP', 'Deepspeed', 'CUDA', 'SQL', 'Node.JS', 'React'];

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
        <motion.h1
          className="name"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}>
          Videet Mehta.
        </motion.h1>
        <p className="tagline">
          I'm a student at <strong style={{ color: 'var(--primary)' }}>MIT</strong> studying
          Computer Science. I'm passionate about{' '}
          <strong style={{ color: 'var(--primary)' }}>frontier AI research</strong> in multi-modal
          large language models.
        </p>

        <div className="body">
          <p>
            I'm currently interning at{' '}
            <a href="https://mercuria.com" target="_blank" rel="noreferrer">
              <strong>Mercuria Energy Trading</strong>
            </a>
            , where I'm working on forecasting marginal prices and doing low-level{' '}
            <strong style={{ color: 'var(--primary)' }}>GPU optimizations</strong> for weather
            models. I'm also working at{' '}
            <a href="https://sarvam.ai" target="_blank" rel="noreferrer">
              <strong>Sarvam AI</strong>
            </a>{' '}
            to build India's first conversational speech AI in Hindi and English.
          </p>
          <p>
            I'm also doing research at{' '}
            <a href="https://sls.csail.mit.edu/" target="_blank" rel="noreferrer">
              <strong>MIT's Spoken Language Systems Lab</strong>
            </a>{' '}
            under Jehanzeb Mirza on finding optimal attention heads for audio event classification &
            spoofing detection.
          </p>
          <p>
            I'm also proud to have previously represented{' '}
            <strong style={{ color: 'var(--primary)' }}>USA</strong> in the{' '}
            <strong style={{ color: 'var(--primary)' }}>
              International Olympiad in Artificial Intelligence
            </strong>{' '}
            in 2024 and to have won a{' '}
            <strong style={{ color: 'var(--primary)' }}>gold medal</strong>! I now am part of the
            scientific committee for 2025 USA AI Olympiad Team.
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
