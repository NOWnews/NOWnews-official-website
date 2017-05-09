import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../../components/Layout';

const Tags = ({ tags }) => (
  <Margin10>
    關鍵字
    {tags.map(({ sn, name }) =>
      <Link className={css(styles.tag)} key={sn} to={`/search?keyword=${name}`}>{ name }</Link>
    )}
  </Margin10>
);

const styles = StyleSheet.create({
  tag: {
    color: '#000000',
    border: '1px solid #000000',
    borderRadius: 30,
    fontSize: 14,
    marginLeft: 10,
    padding: '1.5px 8px',
    textDecoration: 'none'
  }
});

Tags.propTypes = {
  tags: PropTypes.array.isRequired
};

export default Tags;
