import React, { useEffect, useRef } from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledPostHeader = styled.header`
  margin-bottom: 40px;

  .back {
    display: inline-block;
    margin-bottom: 32px;
    color: var(--muted);
    font-size: var(--fz-sm);
    text-decoration: none;

    &:hover {
      color: var(--fg);
    }
  }

  h1 {
    margin-bottom: 8px;
    font-size: var(--fz-heading);
    letter-spacing: -0.02em;
  }

  .meta {
    margin: 0;
    color: var(--muted);
    font-size: var(--fz-sm);
  }
`;

const StyledPostContent = styled.article`
  line-height: 1.75;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 40px 0 12px;
  }

  h1 {
    font-size: var(--fz-xxl);
  }

  h2 {
    font-size: var(--fz-xl);
  }

  h3 {
    font-size: var(--fz-lg);
  }

  p,
  ul,
  ol {
    margin: 0 0 20px;
  }

  ul,
  ol {
    padding-left: 20px;

    li {
      margin: 6px 0;
    }
  }

  img {
    border-radius: var(--border-radius);
  }

  :not(pre) > code {
    padding: 0.15em 0.35em;
    border-radius: 4px;
    background-color: var(--surface);
  }

  table {
    width: 100%;
    margin: 24px 0;
    border-collapse: collapse;
    font-size: var(--fz-sm);

    th,
    td {
      padding: 8px;
      border-bottom: 1px solid var(--border);
      text-align: left;
    }
  }

  .katex {
    font-size: 1.05em;
  }

  .katex-display {
    margin: 24px 0;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

const StyledComments = styled.section`
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
`;

const Comments = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Only run on the client and only if not already injected
    if (!containerRef.current) {
      return;
    }
    if (containerRef.current.hasChildNodes()) {
      return;
    }

    const {
      GATSBY_GISCUS_REPO,
      GATSBY_GISCUS_REPO_ID,
      GATSBY_GISCUS_CATEGORY,
      GATSBY_GISCUS_CATEGORY_ID,
    } = process.env;

    const repo = GATSBY_GISCUS_REPO || 'mvideet/personal_website';
    const repoId = GATSBY_GISCUS_REPO_ID || 'R_kgDOPIuPlg';
    const category = GATSBY_GISCUS_CATEGORY || 'Q&A';
    const categoryId = GATSBY_GISCUS_CATEGORY_ID || 'DIC_kwDOPIuPls4CuGlR';

    // Proceed even if env vars are not set by falling back to defaults above

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'en');
    containerRef.current.appendChild(script);
  }, []);

  return <StyledComments ref={containerRef} aria-label="Comments" />;
};

const MdxPostTemplate = ({ data, location }) => {
  const { frontmatter, body } = data.mdx;
  const { title, date, category } = frontmatter;

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <StyledPostHeader>
        <Link className="back" to="/blog">
          ← All writing
        </Link>
        <h1>{title}</h1>
        <p className="meta">
          <time>
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </time>
          {category && <span className="category"> · {category}</span>}
        </p>
      </StyledPostHeader>

      <StyledPostContent>
        <MDXRenderer>{body}</MDXRenderer>
      </StyledPostContent>

      <Comments />
    </Layout>
  );
};

export default MdxPostTemplate;

MdxPostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        description
        date
        slug
        tags
        category
      }
    }
  }
`;
