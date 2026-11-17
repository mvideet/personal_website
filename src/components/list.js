import styled from 'styled-components';

// A titled block on the homepage ("Writing", "Experience", ...)
export const Section = styled.section`
  margin-top: 56px;

  > h2 {
    margin-bottom: 16px;
    color: var(--muted);
    font-size: var(--fz-md);
    font-weight: 500;
  }

  .more {
    display: inline-block;
    margin-top: 12px;
    color: var(--muted);
    font-size: var(--fz-sm);
    text-decoration: none;

    &:hover {
      color: var(--fg);
    }
  }
`;

// A list of rows: primary text on the left, muted meta on the right
export const RowList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    padding: 8px 0;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 0;
    }
  }

  .primary {
    min-width: 0;

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--underline);
      }
    }
  }

  .secondary {
    color: var(--muted);
  }

  .meta {
    flex-shrink: 0;
    color: var(--muted);
    font-size: var(--fz-sm);
    font-variant-numeric: tabular-nums;

    .date {
      display: inline-block;
      min-width: 6.5em;
      text-align: right;

      @media (max-width: 480px) {
        min-width: 0;
        text-align: left;
      }
    }
  }
`;
