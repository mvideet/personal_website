import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Intro, Jobs, Featured, Blog, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Intro />
      <Jobs />
      <Featured />
      <Blog />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
