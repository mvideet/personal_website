import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Intro, Blog, Jobs, Featured } from '@components';

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <Intro />
    <Blog />
    <Jobs />
    <Featured />
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
