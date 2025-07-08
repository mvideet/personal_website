import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import styled from 'styled-components';
import { KEY_CODES } from '@utils';

const StyledJobsSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
`;

const StyledCompanyCards = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 20px 0;
  margin-bottom: 30px;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Make focusable for keyboard navigation */
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    gap: 12px;
    padding: 15px 0;
    margin-bottom: 25px;
  }
`;

const StyledCompanyCard = styled(motion.button)`
  flex-shrink: 0;
  width: 140px;
  height: 80px;
  background: ${({ isActive }) =>
    isActive
      ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark, #0a192f) 100%)'
      : 'var(--light-navy)'};
  border: 2px solid ${({ isActive }) => (isActive ? 'var(--primary)' : 'var(--lightest-navy)')};
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(100, 255, 218, 0.1);
    border-color: var(--primary);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.3);
  }

  .company-name {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: ${({ isActive }) => (isActive ? 'var(--navy)' : 'var(--lightest-slate)')};
    font-weight: 600;
    text-align: center;
    line-height: 1.2;
    margin: 0;
  }

  .company-icon {
    font-size: 24px;
    margin-bottom: 4px;
    display: block;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 70px;
    padding: 10px;

    .company-name {
      font-size: 10px;
    }

    .company-icon {
      font-size: 20px;
      margin-bottom: 2px;
    }
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 60px;
    padding: 8px;

    .company-name {
      font-size: 9px;
    }

    .company-icon {
      font-size: 18px;
    }
  }
`;

const StyledJobDetails = styled(motion.div)`
  background: var(--light-navy);
  border-radius: 16px;
  padding: 40px;
  border: 1px solid var(--lightest-navy);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark, #0a192f));
  }

  .job-header {
    margin-bottom: 30px;
  }

  .job-title {
    font-size: var(--fz-heading);
    font-weight: 600;
    color: var(--lightest-slate);
    margin-bottom: 8px;
    line-height: 1.3;

    .company-link {
      color: var(--primary);
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: var(--primary-light, #64ffda);
      }
    }
  }

  .job-period {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '📅';
      font-size: 14px;
    }
  }

  .job-location {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '📍';
      font-size: 14px;
    }
  }

  .job-description {
    ul {
      ${({ theme }) => theme.mixins.fancyList};
      font-size: var(--fz-lg);

      li {
        margin-bottom: 12px;
        color: var(--light-slate);
        line-height: 1.6;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 30px 25px;

    .job-title {
      font-size: var(--fz-xxl);
    }

    .job-description ul {
      font-size: var(--fz-md);
    }
  }

  @media (max-width: 480px) {
    padding: 25px 20px;

    .job-period,
    .job-location {
      font-size: var(--fz-xs);
    }
  }
`;

const StyledNavigationHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  color: var(--slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);

  @media (max-width: 768px) {
    margin-top: 15px;
    font-size: 10px;
  }
`;

// Company icons mapping
const getCompanyIcon = company => {
  const iconMap = {
    Mercuria: '⚡',
    'Hidden Studios': '🎮',
    MIT: '🏛️',
    Regenerative: '🧠',
    Houston: '🚀',
  };

  // Find partial matches for company names
  for (const [key, icon] of Object.entries(iconMap)) {
    if (company.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }

  return '🏢'; // Default icon
};

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;
  const [activeJobId, setActiveJobId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const focusCard = () => {
    if (cardsRef.current[tabFocus]) {
      cardsRef.current[tabFocus].focus();
    }
  };

  useEffect(() => {
    if (tabFocus !== null) {
      focusCard();
    }
  }, [tabFocus]);

  const onKeyDown = e => {
    // Handle both arrow keys and direct key strings for better compatibility
    if (
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === KEY_CODES.ARROW_LEFT ||
      e.key === KEY_CODES.ARROW_RIGHT
    ) {
      e.preventDefault();
      const isRightArrow = e.key === 'ArrowRight' || e.key === KEY_CODES.ARROW_RIGHT;
      const nextJob = activeJobId + (isRightArrow ? 1 : -1);
      const nextFocus = (nextJob + jobsData.length) % jobsData.length;
      setTabFocus(nextFocus);
      setActiveJobId(nextFocus);
    }
  };

  // Also handle global keyboard events
  useEffect(() => {
    const handleGlobalKeyDown = e => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        // Only handle if we're in the jobs section area
        const jobsSection = document.getElementById('jobs');
        if (jobsSection) {
          const rect = jobsSection.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          if (isInView) {
            onKeyDown(e);
          }
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeJobId, jobsData.length]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const detailsVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <StyledJobsSection id="jobs" ref={sectionRef}>
      <motion.h2
        className="numbered-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}>
        Where I've Worked
      </motion.h2>

      <StyledCompanyCards
        onKeyDown={onKeyDown}
        tabIndex="0"
        role="tablist"
        aria-label="Company navigation">
        {jobsData &&
          jobsData.map(({ node }, i) => (
            <StyledCompanyCard
              key={i}
              isActive={activeJobId === i}
              onClick={() => setActiveJobId(i)}
              ref={el => (cardsRef.current[i] = el)}
              aria-label={`${node.frontmatter.company} job details`}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}>
              <span className="company-icon">{getCompanyIcon(node.frontmatter.company)}</span>
              <p className="company-name">{node.frontmatter.company}</p>
            </StyledCompanyCard>
          ))}
      </StyledCompanyCards>

      <AnimatePresence mode="wait">
        {jobsData && jobsData[activeJobId] && (
          <StyledJobDetails
            key={activeJobId}
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            <div className="job-header">
              <h3 className="job-title">
                <span>{jobsData[activeJobId].node.frontmatter.title}</span>
                <span> @ </span>
                <a
                  href={jobsData[activeJobId].node.frontmatter.url}
                  className="company-link"
                  target="_blank"
                  rel="noopener noreferrer">
                  {jobsData[activeJobId].node.frontmatter.company}
                </a>
              </h3>
              <p className="job-period">{jobsData[activeJobId].node.frontmatter.range}</p>
              {jobsData[activeJobId].node.frontmatter.location && (
                <p className="job-location">{jobsData[activeJobId].node.frontmatter.location}</p>
              )}
            </div>
            <div
              className="job-description"
              dangerouslySetInnerHTML={{ __html: jobsData[activeJobId].node.html }}
            />
          </StyledJobDetails>
        )}
      </AnimatePresence>

      <StyledNavigationHint>
        <span>← →</span>
        <span>Use arrow keys or click to navigate</span>
      </StyledNavigationHint>
    </StyledJobsSection>
  );
};

export default Jobs;
