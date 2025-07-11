import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Icon } from '@components/icons';

const StyledFeaturedContainer = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 20px; /* Simple top padding */
`;

const StyledSectionHeading = styled(motion.h2)`
  font-size: clamp(24px, 5vw, var(--fz-heading));
  margin-bottom: 50px;
`;

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: flex;
  flex-direction: column;
  gap: 100px; /* Space between projects */
  margin: 0;
  padding: 0;
`;

const StyledProject = styled(motion.li)`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 70px;
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;
    z-index: 2;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
        text-align: left;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
    .project-tech-list,
    .project-links {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }
    }
  }

  .project-image {
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 200px;
      opacity: 0.25;
    }

    a {
      display: block;
      width: 100%;
      height: 100%;
      background-color: var(--primary);
      border-radius: var(--border-radius);

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--navy);
        mix-blend-mode: screen;
        transition: var(--transition);
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);
      transition: var(--transition);
    }

    &:hover,
    &:focus {
      .img {
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

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }
`;

const Featured = () => {
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
            }
            html
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}>
        Some Things I've Built
      </StyledSectionHeading>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, tech, github, cover } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">
                      <a href={github} target="_blank" rel="noopener noreferrer">
                        {title}
                      </a>
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

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
                    </div>
                  </div>
                </div>

                <div className="project-image">
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    {image && <GatsbyImage image={image} alt={title} className="img" />}
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
