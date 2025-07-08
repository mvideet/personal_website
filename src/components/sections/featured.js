import React, { useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Icon } from '@components/icons';

const StyledFeaturedContainer = styled.section`
  position: relative;
  height: ${({ numProjects }) => numProjects * 120}vh;
`;

const StyledProjectsGrid = styled(motion.ul)`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  place-items: center;
  position: sticky;
  top: 0;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const StyledProject = styled(motion.li)`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;
    z-index: 2;
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;
    }
    .project-image {
      grid-column: 1 / 8;
    }
    .project-tech-list,
    .project-links {
      justify-content: flex-end;
    }
  }

  .project-image {
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    a {
      display: block;
      width: 100%;
      height: 100%;
      background-color: var(--primary);
      border-radius: var(--border-radius);

      .img {
        border-radius: var(--border-radius);
        mix-blend-mode: multiply;
        filter: grayscale(100%) contrast(1) brightness(70%);
      }

      &:hover .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--primary);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0 10px;
    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
      margin-right: 20px;
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    margin-top: 10px;

    a {
      padding: 10px;
      color: var(--lightest-slate);
      svg {
        width: 22px;
        height: 22px;
      }
    }
  }
`;

const Featured = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const data = useStaticQuery(graphql`
    query {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const numProjects = featuredProjects.length;

  return (
    <StyledFeaturedContainer id="projects" ref={ref} numProjects={numProjects}>
      <StyledProjectsGrid>
        {featuredProjects.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { external, title, tech, github, cover } = frontmatter;
          const image = getImage(cover);

          const step = 1 / numProjects;
          const start = i * step;
          const end = start + step;

          const fadeInStart = start + step * 0.1;
          const fadeInEnd = start + step * 0.3;
          const fadeOutStart = end - step * 0.3;
          const fadeOutEnd = end - step * 0.1;

          const opacity = useTransform(
            scrollYProgress,
            [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
            [0, 1, 1, 0],
          );
          const scale = useTransform(
            scrollYProgress,
            [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
            [0.8, 1, 1, 0.8],
          );

          return (
            <StyledProject as={motion.li} key={i} style={{ opacity, scale }}>
              <div className="project-content">
                <p className="project-overline">Featured Project</p>
                <h3 className="project-title">{title}</h3>
                <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
                {tech && (
                  <ul className="project-tech-list">
                    {tech.map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                )}
                <div className="project-links">
                  {github && (
                    <a
                      href={github}
                      aria-label="GitHub Link"
                      target="_blank"
                      rel="noopener noreferrer">
                      <Icon name="GitHub" />
                    </a>
                  )}
                  {external && (
                    <a
                      href={external}
                      aria-label="External Link"
                      target="_blank"
                      rel="noopener noreferrer">
                      <Icon name="External" />
                    </a>
                  )}
                </div>
              </div>

              <div className="project-image">
                <a href={external || github || '#'} target="_blank" rel="noopener noreferrer">
                  <GatsbyImage image={image} alt={title} className="img" />
                </a>
              </div>
            </StyledProject>
          );
        })}
      </StyledProjectsGrid>
    </StyledFeaturedContainer>
  );
};

export default Featured;
