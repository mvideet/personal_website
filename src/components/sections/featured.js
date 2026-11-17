import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Section, RowList } from '../list';

const Featured = () => {
  const data = useStaticQuery(graphql`
    query HomeProjectsQuery {
      projects: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              url
            }
          }
        }
      }
    }
  `);

  const projects = data.projects.edges.filter(
    ({ node }) => node.frontmatter.github || node.frontmatter.url,
  );

  return (
    <Section id="projects">
      <h2>Projects</h2>
      <RowList>
        {projects.map(({ node: { frontmatter } }) => {
          const { title, tech, github, url } = frontmatter;
          return (
            <li key={title}>
              <span className="primary">
                <a href={url || github}>{title}</a>
              </span>
              {tech && <span className="meta">{tech.slice(0, 2).join(', ')}</span>}
            </li>
          );
        })}
      </RowList>
    </Section>
  );
};

export default Featured;
