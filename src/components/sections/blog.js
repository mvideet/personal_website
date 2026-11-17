import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Section, RowList } from '../list';
import PostLink from '../post-link';

const Blog = () => {
  const data = useStaticQuery(graphql`
    query HomeWritingQuery {
      posts: allMdx(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 5
      ) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMM YYYY")
              slug
              external
            }
          }
        }
      }
    }
  `);

  return (
    <Section id="writing">
      <h2>Writing</h2>
      <RowList>
        {data.posts.edges.map(({ node: { frontmatter } }) => (
          <li key={frontmatter.slug}>
            <span className="primary">
              <PostLink {...frontmatter} />
            </span>
            <span className="meta">{frontmatter.date}</span>
          </li>
        ))}
      </RowList>
      <Link className="more" to="/blog">
        All writing →
      </Link>
    </Section>
  );
};

export default Blog;
