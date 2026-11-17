import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTag = styled.span`
  display: inline-block;
  margin-right: 10px;
  padding: 0 7px;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--muted);
  font-size: var(--fz-xxs);
  line-height: 18px;
  vertical-align: 2px;
  white-space: nowrap;

  &.research {
    border-color: var(--underline);
    color: var(--fg);
  }
`;

// "research" (original work) or "tutorial" (explainers of existing ideas)
const CategoryTag = ({ category }) =>
  category ? <StyledTag className={category}>{category}</StyledTag> : null;

CategoryTag.propTypes = {
  category: PropTypes.string,
};

export default CategoryTag;
