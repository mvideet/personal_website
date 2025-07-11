import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledBlogSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 20px;

  .blog-header {
    ${({ theme }) => theme.mixins.flexBetween};
    align-items: center;
    margin-bottom: 50px;

    h2 {
      margin: 0;
      font-size: clamp(24px, 5vw, var(--fz-heading));
    }

    .view-all-link {
      ${({ theme }) => theme.mixins.inlineLink};
      color: var(--primary);
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
    }
  }
`;

const StyledPostsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const StyledPost = styled(motion.li)`
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
    font-size: var(--fz-xl);

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

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 3
      ) {
        edges {
          node {
            excerpt(pruneLength: 120)
            frontmatter {
              title
              date
              tags
              slug
            }
          }
        }
      }
    }
  `);

  const posts = data.posts.edges;

  return (
    <StyledBlogSection id="blog">
      <div className="blog-header">
        <h2 className="numbered-heading">Recent Posts</h2>
        <Link className="view-all-link" to="/blog">
          View All Posts &rarr;
        </Link>
      </div>

      <StyledPostsGrid>
        {posts.length > 0 &&
          posts.map(({ node }, i) => {
            const { frontmatter, excerpt } = node;
            const { title, date, tags, slug } = frontmatter;

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

                    <div className="post-desc">{excerpt}</div>
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
                        {tags.slice(0, 3).map((tag, i) => (
                          <li key={i}>#{tag}</li>
                        ))}
                      </ul>
                    )}
                  </footer>
                </div>
              </StyledPost>
            );
          })}
      </StyledPostsGrid>
    </StyledBlogSection>
  );
};

export default Blog;
