import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Section, RowList } from '../list';

// "Sep. 2025 - Present" / "March 2023 - April 2024" -> "2025 – now" / "2023 – 2024"
const years = range => {
  const [start, end] = range.split(/\s+-\s+/);
  const year = s => (/present/i.test(s) ? 'now' : (s.match(/\d{4}/) || [s])[0]);
  const a = year(start);
  const b = end ? year(end) : '';
  return !b || a === b ? a : `${a} – ${b}`;
};

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query HomeJobsQuery {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              range
              url
            }
          }
        }
      }
    }
  `);

  return (
    <Section id="experience">
      <h2>Experience</h2>
      <RowList>
        {data.jobs.edges.map(({ node: { frontmatter } }) => {
          const { title, company, range, url } = frontmatter;
          return (
            <li key={`${company}-${title}`}>
              <span className="primary">
                <a href={url}>{company}</a> <span className="secondary">· {title}</span>
              </span>
              <span className="meta">{years(range)}</span>
            </li>
          );
        })}
      </RowList>
    </Section>
  );
};

export default Jobs;
