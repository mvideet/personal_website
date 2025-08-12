import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledJobsSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding-top: 10px;
`;

const StyledList = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
`;

const StyledItem = styled(motion.li)`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px 14px;
  align-items: baseline;
  border-bottom: 1px dashed var(--lightest-navy);
  padding-bottom: 12px;

  .role {
    font-weight: 600;
    color: var(--lightest-slate);
  }

  .company a {
    color: var(--primary);
  }

  .meta {
    grid-column: 1 / -1;
    display: flex;
    gap: 12px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--slate);
  }

  .desc {
    grid-column: 1 / -1;
    color: var(--light-slate);
    font-size: var(--fz-md);
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query MinimalJobsQuery {
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

  return (
    <StyledJobsSection id="jobs">
      <motion.h2
        className="numbered-heading"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}>
        Work Experience
      </motion.h2>

      <StyledList>
        {jobsData.map(({ node }, i) => (
          <StyledItem
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
            viewport={{ once: true }}>
            <div className="role">
              {node.frontmatter.title}{' '}
              <span className="company">
                @{' '}
                <a href={node.frontmatter.url} target="_blank" rel="noopener noreferrer">
                  {node.frontmatter.company}
                </a>
              </span>
            </div>
            <div
              className="range"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fz-xs)',
                color: 'var(--light-slate)',
              }}>
              {node.frontmatter.range}
            </div>
            <div className="meta">
              {node.frontmatter.location && <span>{node.frontmatter.location}</span>}
            </div>
            <div className="desc" dangerouslySetInnerHTML={{ __html: node.html }} />
          </StyledItem>
        ))}
      </StyledList>
    </StyledJobsSection>
  );
};

export default Jobs;
