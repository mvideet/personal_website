import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledMainContainer = styled.main`
  margin: 0 auto;
  max-width: 1600px;
  min-height: 100vh;
  padding: 200px 150px;

  @media (max-width: 1080px) {
    padding: 200px 100px;
  }
  @media (max-width: 768px) {
    padding: 150px 50px;
  }
  @media (max-width: 480px) {
    padding: 125px 25px;
  }
`;

const StyledTitle = styled.h1`
  font-size: clamp(40px, 8vw, 80px);
  margin-bottom: 50px;
  color: var(--lightest-slate);
`;

const StyledSubtitle = styled.h2`
  color: var(--primary);
  margin: 0 0 20px 0;
  font-weight: 400;
  font-size: var(--fz-lg);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const StyledGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  position: relative;
  margin-top: 50px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const StyledPost = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .post-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .post-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .post-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;
  }

  .folder {
    color: var(--primary);
    svg {
      width: 40px;
      height: 40px;
    }
  }

  .post-title {
    margin: 0 0 10px 0;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

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

  .post-desc {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .post-date {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    text-transform: uppercase;
  }

  .post-tags {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      color: var(--primary);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const BlogPage = ({ location, data }) => {
  const posts = data.allMdx.edges;

  return (
    <Layout location={location}>
      <Helmet title="Blog" />

      <StyledMainContainer>
        <header>
          <StyledTitle>Blog</StyledTitle>
          <StyledSubtitle>A collection of thoughts, ideas, and learnings</StyledSubtitle>
        </header>

        <StyledGrid>
          {posts.length > 0 &&
            posts.map(({ node }, i) => {
              const { frontmatter } = node;
              const { title, description, slug, date, tags } = frontmatter;
              return (
                <StyledPost key={i}>
                  <div className="post-inner">
                    <header>
                      <div className="post-top">
                        <div className="folder">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                          </svg>
                        </div>
                      </div>

                      <h3 className="post-title">
                        <Link to={slug}>{title}</Link>
                      </h3>

                      <div className="post-desc">{description}</div>
                    </header>

                    <footer>
                      <p className="post-date">
                        {new Date(date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      {tags && tags.length > 0 && (
                        <ul className="post-tags">
                          {tags.map((tag, i) => (
                            <li key={i}>#{tag}</li>
                          ))}
                        </ul>
                      )}
                    </footer>
                  </div>
                </StyledPost>
              );
            })}
        </StyledGrid>
      </StyledMainContainer>
    </Layout>
  );
};

BlogPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default BlogPage;

export const pageQuery = graphql`
  query {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            date
            tags
            slug
          }
        }
      }
    }
  }
`;
