import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../../components/Layout';

const Tags = ({ tags }) => (
  <Margin10>
    { tags.length > 0 && '關鍵字' }
    {tags.map(({ sn, name }) =>
      <Link data-on='click' data-event-category='news' data-event-action='tag'
        className={css(styles.tag)} key={sn} to={`/search?timeRange=lastWeek&keyword=${name}&from=tag`}>{ name }</Link>
    )}
  </Margin10>
);

const styles = StyleSheet.create({
  tag: {
    color: '#000000',
    border: '1px solid #000000',
    borderRadius: 30,
    display: 'inline-block',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 10,
    padding: '1.5px 8px',
    textDecoration: 'none'
  }
});

Tags.propTypes = {
  tags: PropTypes.array.isRequired
};

export default Tags;
