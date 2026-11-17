import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import { RowList } from '../components/list';
import CategoryTag from '../components/category-tag';
import PostLink from '../components/post-link';

const StyledHeader = styled.header`
  margin-bottom: 32px;

  h1 {
    font-size: var(--fz-heading);
    letter-spacing: -0.02em;
  }

  p {
    color: var(--muted);
  }
`;

const StyledPosts = styled(RowList)`
  li {
    padding: 12px 0;
  }

  .description {
    display: block;
    color: var(--muted);
    font-size: var(--fz-sm);
  }
`;

const BlogPage = ({ location, data }) => {
  const posts = data.allMdx.edges;

  return (
    <Layout location={location}>
      <Helmet title="Writing" />

      <StyledHeader>
        <h1>Writing</h1>
        <p>Notes on AI research, papers I've read and things I've built.</p>
      </StyledHeader>

      <StyledPosts>
        {posts.map(({ node: { frontmatter } }) => (
          <li key={frontmatter.slug}>
            <span className="primary">
              <PostLink {...frontmatter} />
              {frontmatter.description && (
                <span className="description">{frontmatter.description}</span>
              )}
            </span>
            <span className="meta">
              <CategoryTag category={frontmatter.category} />
              <span className="date">{frontmatter.date}</span>
            </span>
          </li>
        ))}
      </StyledPosts>
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
            date(formatString: "MMM D, YYYY")
            slug
            external
            category
          }
        }
      }
    }
  }
`;
