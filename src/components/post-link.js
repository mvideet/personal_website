import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

// Posts marked `external` are standalone HTML pages in /static, so they need a
// full page load instead of Gatsby's client-side routing.
const PostLink = ({ slug, title, external }) =>
  external ? <a href={slug}>{title}</a> : <Link to={slug}>{title}</Link>;

PostLink.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  external: PropTypes.bool,
};

export default PostLink;
