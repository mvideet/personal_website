import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

const StyledNeuralNetwork = styled(motion.div)`
  position: relative;
  width: 450px;
  height: 450px;
  border-radius: 50%;
`;

const StyledConnection = styled(motion.line)`
  stroke: var(--primary);
  stroke-width: 1.5;
  opacity: 0.3;
  stroke-dasharray: 4 4;
`;

const StyledNode = styled(motion.circle)`
  fill: var(--light-navy);
  stroke: var(--primary);
  stroke-width: 2;
  cursor: pointer;
  filter: drop-shadow(0 0 8px rgba(100, 255, 218, 0.3));
`;

const StyledSkillLabel = styled(motion.text)`
  fill: var(--lightest-slate);
  font-family: var(--font-mono);
  font-size: 11px;
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
  user-select: none;
`;

const StyledParticle = styled(motion.circle)`
  fill: var(--primary);
  opacity: 0.6;
  filter: blur(0.5px);
`;

const NeuralNetwork = ({ rotateX, rotateY }) => {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Define skill nodes with positions and connections (scaled up for bigger network)
  const skills = [
    { id: 0, name: 'AI Research', x: 225, y: 80, size: 20, connections: [1, 2, 3] },
    { id: 1, name: 'Machine Learning', x: 340, y: 150, size: 18, connections: [0, 2, 4] },
    { id: 2, name: 'Python', x: 370, y: 250, size: 16, connections: [0, 1, 3, 5] },
    { id: 3, name: 'TensorFlow', x: 290, y: 340, size: 16, connections: [0, 2, 4] },
    { id: 4, name: 'React', x: 160, y: 370, size: 16, connections: [1, 3, 5] },
    { id: 5, name: 'JavaScript', x: 80, y: 280, size: 16, connections: [2, 4, 6] },
    { id: 6, name: 'Node.js', x: 100, y: 180, size: 14, connections: [5, 7] },
    { id: 7, name: 'Research', x: 160, y: 110, size: 18, connections: [0, 6] },
    { id: 8, name: 'MIT', x: 225, y: 225, size: 24, connections: [0, 1, 7] }, // Central node
  ];

  const connectionVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.3,
      transition: { duration: 2, ease: 'easeInOut' },
    },
    hover: {
      opacity: 0.8,
      strokeWidth: 3,
      transition: { duration: 0.3 },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: i => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      },
    }),
    hover: {
      scale: 1.4,
      transition: { duration: 0.3 },
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.4,
      },
    }),
    hover: {
      scale: 1.1,
      y: -2,
      transition: { duration: 0.3 },
    },
  };

  // Calculate connections for rendering
  const connections = [];
  skills.forEach(skill => {
    skill.connections.forEach(connectionId => {
      const connectedSkill = skills.find(s => s.id === connectionId);
      if (connectedSkill && skill.id < connectionId) {
        // Avoid duplicates
        connections.push({
          from: skill,
          to: connectedSkill,
          isHighlighted: hoveredNode === skill.id || hoveredNode === connectionId,
          id: `${skill.id}-${connectionId}`,
        });
      }
    });
  });

  // Generate particles for each connection
  const particles = [];
  connections.forEach((connection, connectionIndex) => {
    const numParticles = 2; // particles per connection
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        id: `particle-${connectionIndex}-${i}`,
        connectionId: connection.id,
        from: connection.from,
        to: connection.to,
        delay: i * 2 + connectionIndex * 0.5, // stagger particles
        isHighlighted: connection.isHighlighted,
      });
    }
  });

  return (
    <StyledNeuralNetwork style={{ rotateX, rotateY }} initial="hidden" animate="visible">
      <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* Render connections */}
        {connections.map((connection, i) => (
          <StyledConnection
            key={i}
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            variants={connectionVariants}
            initial="hidden"
            animate={connection.isHighlighted ? 'hover' : 'visible'}
          />
        ))}

        {/* Render floating particles */}
        {particles.map(particle => (
          <StyledParticle
            key={particle.id}
            r={particle.isHighlighted ? 3 : 2}
            initial={{
              cx: particle.from.x,
              cy: particle.from.y,
              opacity: 0,
            }}
            animate={{
              cx: [particle.from.x, particle.to.x, particle.from.x],
              cy: [particle.from.y, particle.to.y, particle.from.y],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: 4,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.5, 0.9, 1],
            }}
            style={{
              filter: particle.isHighlighted
                ? 'drop-shadow(0 0 6px var(--primary))'
                : 'blur(0.5px)',
            }}
          />
        ))}

        {/* Render skill nodes */}
        {skills.map((skill, i) => (
          <g key={skill.id}>
            <StyledNode
              r={skill.size}
              cx={skill.x}
              cy={skill.y}
              variants={nodeVariants}
              initial="hidden"
              animate={skill.id === 8 ? 'pulse' : hoveredNode === skill.id ? 'hover' : 'visible'}
              custom={i}
              onMouseEnter={() => setHoveredNode(skill.id)}
              onMouseLeave={() => setHoveredNode(null)}
              whileHover={{ scale: 1.3 }}
            />
            <StyledSkillLabel
              x={skill.x}
              y={skill.y + skill.size + 24}
              variants={labelVariants}
              initial="hidden"
              animate={hoveredNode === skill.id ? 'hover' : 'visible'}
              custom={i}>
              {skill.name}
            </StyledSkillLabel>
          </g>
        ))}
      </svg>
    </StyledNeuralNetwork>
  );
};

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-500, 500], [5, -5]);
  const rotateY = useTransform(mouseX, [-500, 500], [-5, 5]);

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
      I'm a student at MIT studying Computer Science. I'm am currently working or have worked
      previously on AI development at trading firms, startups, and research labs. I'm interested in
      AI research and applied-AI am always learning about the latest research developments in the
      field.
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
            <NeuralNetwork rotateX={rotateX} rotateY={rotateY} />
          </div>
        </>
      )}
    </StyledHeroSection>
  );
};

NeuralNetwork.propTypes = {
  rotateX: PropTypes.object.isRequired,
  rotateY: PropTypes.object.isRequired,
};

export default Hero;
