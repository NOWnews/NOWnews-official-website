import React, { PropTypes } from 'react';
import ListItem from '../../../components/News/ListItem';
import { StyleSheet, css } from 'aphrodite/no-important';

const ReleatedContent = ({ type }) => (
  <div className={css(styles.box)}>
    <h2 >{ type }</h2>
    <div>
      { [1, 2, 3, 4].map((index) => <ListItem key={index} news={{}} />)}
    </div>
  </div>
);

const styles = StyleSheet.create({
  box: {
    marginTop: '1rem'
  }
});

ReleatedContent.propTypes = {
  type: PropTypes.string.isRequired
};

export default ReleatedContent;
