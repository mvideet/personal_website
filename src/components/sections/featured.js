import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledFeaturedContainer = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding-top: 10px;
`;

const StyledSectionHeading = styled(motion.h2)`
  font-size: clamp(22px, 4vw, var(--fz-heading));
  margin-bottom: 24px;
`;

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
`;

const StyledCard = styled(motion.li)`
  border: 1px solid var(--lightest-navy);
  background: var(--light-navy);
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--primary);
  }

  /* optional thumb placeholder if added later */

  .content {
    padding: 12px;
  }

  .title {
    font-size: clamp(16px, 2.5vw, 18px);
    margin: 0 0 6px;
  }

  .tech {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 10px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--light-slate);
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    query MinimalFeaturedQuery {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover
              tech
              github
            }
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);

  return (
    <StyledFeaturedContainer id="projects">
      <StyledSectionHeading
        className="numbered-heading"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}>
        Projects
      </StyledSectionHeading>

      <StyledProjectsGrid>
        {featuredProjects.map(({ node }, i) => {
          const { title, tech = [], github } = node.frontmatter;
          return (
            <StyledCard
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              viewport={{ once: true }}>
              <div className="content">
                <h3 className="title">
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    {title}
                  </a>
                </h3>
                {tech.length > 0 && (
                  <ul className="tech">
                    {tech.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            </StyledCard>
          );
        })}
      </StyledProjectsGrid>
    </StyledFeaturedContainer>
  );
};

export default Featured;
