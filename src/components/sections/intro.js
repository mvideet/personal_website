import React from 'react';
import styled from 'styled-components';

const StyledIntro = styled.section`
  h1 {
    margin-bottom: 20px;
    font-size: var(--fz-heading);
    letter-spacing: -0.02em;
  }

  p {
    color: var(--fg);
  }
`;

const Intro = () => (
  <StyledIntro id="about">
    <h1>Videet Mehta</h1>
    <p>
      I'm a computer science student at MIT working on frontier AI research, mostly multimodal LLMs
      and making models run faster on real hardware.
    </p>
    <p>
      Right now I'm at <a href="https://hanlab.mit.edu/">HAN Lab</a>, using diffusion language
      models for speculative decoding, and at MIT's{' '}
      <a href="https://sls.csail.mit.edu/">Spoken Language Systems Lab</a> working on test-time
      training. I'll soon be joining <a href="https://www.together.ai/">Together AI</a> as a kernels
      researcher.
    </p>
    <p>
      Before that I pretrained audio encoders for on-device deployment at{' '}
      <a href="https://www.liquid.ai/">Liquid AI</a>, forecast marginal prices at{' '}
      <a href="https://mercuria.com">Mercuria Energy Trading</a>, and helped build India's first
      Hindi–English conversational speech model at <a href="https://sarvam.ai">Sarvam AI</a>.
    </p>
    <p>
      In 2024 I represented the USA at the International Olympiad in Artificial Intelligence and won
      a gold medal. I'm now on the organizing and scientific committee for the 2026 USA AI Olympiad
      team.
    </p>
  </StyledIntro>
);

export default Intro;
