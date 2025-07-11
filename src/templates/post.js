import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledPostContainer = styled.main`
  max-width: 1000px;
  margin: 0 auto;
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

const StyledPostHeader = styled.header`
  margin-bottom: 50px;

  .breadcrumb {
    color: var(--primary);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);

    .arrow {
      margin-right: 10px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      color: var(--primary);
    }
  }

  h1 {
    font-size: clamp(40px, 8vw, 60px);
    margin: 40px 0 20px;
    color: var(--lightest-slate);
  }

  .subtitle {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    margin: 0;

    time {
      color: var(--lightest-slate);
    }
  }

  .tag {
    margin-right: 10px;
    color: var(--primary);

    &:hover {
      color: var(--primary-tint);
    }
  }
`;

const StyledPostContent = styled.div`
  margin-bottom: 100px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
    color: var(--lightest-slate);
  }

  p {
    margin: 1em 0;
    line-height: 1.5;
    color: var(--light-slate);
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  code {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }

  blockquote {
    border-left: 3px solid var(--primary);
    padding-left: 20px;
    margin: 2em 0;
    font-style: italic;
    color: var(--light-slate);
  }

  ul,
  ol {
    padding-left: 20px;

    li {
      margin: 0.5em 0;
      color: var(--light-slate);
    }
  }
`;

const PostTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, date, tags } = frontmatter;

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <StyledPostContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/blog">All posts</Link>
        </span>

        <StyledPostHeader>
          <h1>{title}</h1>
          <p className="subtitle">
            <time>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {tags && tags.length > 0 && (
              <>
                <span>&nbsp;&mdash;&nbsp;</span>
                {tags.map((tag, i) => (
                  <span key={i} className="tag">
                    #{tag}
                  </span>
                ))}
              </>
            )}
          </p>
        </StyledPostHeader>

        <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />
      </StyledPostContainer>
    </Layout>
  );
};

export default PostTemplate;

PostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date
        slug
        tags
      }
    }
  }
`;
