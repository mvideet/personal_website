import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: row;
  align-items: center;
  min-height: 100vh;
  padding: var(--nav-height) 0 0 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .hero-text {
    flex: 1;

    h1 {
      margin: 0 0 15px 4px;
      color: var(--primary);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
      font-weight: 400;

      @media (max-width: 480px) {
        margin: 0 0 10px 2px;
      }
    }

    h2.big-heading {
      margin: 0;
    }

    h3 {
      margin-top: 5px;
      color: var(--slate);
      line-height: 0.9;
    }

    p {
      margin: 20px 0 0;
      max-width: 540px;
    }

    .cta-button {
      ${({ theme }) => theme.mixins.bigButton};
      margin-top: 50px;
    }
  }

  .hero-visual {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const StyledVisualElement = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  opacity: 0.4;
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-500, 500], [10, -10]);
  const rotateY = useTransform(mouseX, [-500, 500], [-10, 10]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseMove = e => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Videet Mehta.</h2>;
  const three = <h3 className="big-heading">I love to build AI models & tools</h3>;
  const four = (
    <p>
      I'm a student at MIT studying Computer Science. I'm currently working on AI research at
      trading firms, reserach labs, and startups. I'm interested in AI research and applied-AI and
      am looking to meet other like-minded people!
    </p>
  );
  const five = (
    <a className="cta-button" href="https://github.com/mvideet" target="_blank" rel="noreferrer">
      Check out my Github!
    </a>
  );

  const items = [one, two, three, four, five];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <StyledHeroSection onMouseMove={handleMouseMove}>
      {prefersReducedMotion ? (
        <div className="hero-text">
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </div>
      ) : (
        <>
          <motion.div
            className="hero-text"
            initial="hidden"
            animate={isMounted ? 'visible' : 'hidden'}
            variants={containerVariants}>
            {items.map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                {item}
              </motion.div>
            ))}
          </motion.div>
          <div className="hero-visual">
            <StyledVisualElement
              style={{ rotateX, rotateY }}
              animate={{
                scale: [1, 1.05, 1],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
