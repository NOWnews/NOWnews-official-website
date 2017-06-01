import React, { PropTypes } from 'react';
import Footer from './Footer';
import Basic from './Basic';

const App = ({ children }) => (
  <Basic>
    {children}
    <Footer />
  </Basic>
);

App.propTypes = {
  children: PropTypes.shape().isRequired
};
export default App;
