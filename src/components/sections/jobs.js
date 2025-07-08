import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import styled from 'styled-components';
import { KEY_CODES } from '@utils';

const StyledJobsSection = styled.section`
  max-width: 700px;
  margin: 0;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--primary)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;
  transition: all 0.25s ease;

  &:hover,
  &:focus {
    background-color: var(--light-navy);
    color: var(--primary);
  }

  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }
`;

const StyledHighlight = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--primary);

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled(motion.div)`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--primary);
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

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

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
    }
  };

  useEffect(() => {
    if (tabFocus !== null) {
      focusTab();
    }
  }, [tabFocus]);

  const onKeyDown = e => {
    if (e.key === KEY_CODES.ARROW_UP || e.key === KEY_CODES.ARROW_DOWN) {
      e.preventDefault();
      const nextTab = tabFocus + (e.key === KEY_CODES.ARROW_DOWN ? 1 : -1);
      const nextFocus = (nextTab + jobsData.length) % jobsData.length;
      setTabFocus(nextFocus);
      setActiveTabId(nextFocus);
    }
  };

  const panelVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
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

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={onKeyDown}>
          {jobsData &&
            jobsData.map(({ node }, i) => (
              <StyledTabButton
                key={i}
                isActive={activeTabId === i}
                onClick={() => setActiveTabId(i)}
                ref={el => (tabs.current[i] = el)}
                id={`tab-${i}`}
                role="tab"
                aria-selected={activeTabId === i}
                aria-controls={`panel-${i}`}
                tabIndex={activeTabId === i ? '0' : '-1'}>
                <span>{node.frontmatter.company}</span>
              </StyledTabButton>
            ))}
          <StyledHighlight
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            initial={false}
            animate={{ y: `calc(${activeTabId} * var(--tab-height))` }}
          />
        </StyledTabList>

        <StyledTabPanels>
          <AnimatePresence mode="wait">
            {jobsData &&
              jobsData.map(({ node }, i) =>
                activeTabId === i ? (
                  <StyledTabPanel
                    key={i}
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex="0"
                    aria-labelledby={`tab-${i}`}
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.25 }}>
                    <h3>
                      <span>{node.frontmatter.title}</span>
                      <span className="company">
                        &nbsp;@&nbsp;
                        <a href={node.frontmatter.url} className="inline-link">
                          {node.frontmatter.company}
                        </a>
                      </span>
                    </h3>
                    <p className="range">{node.frontmatter.range}</p>
                    <div dangerouslySetInnerHTML={{ __html: node.html }} />
                  </StyledTabPanel>
                ) : null,
              )}
          </AnimatePresence>
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
