import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import StaticContainer from 'react-static-container';

const GrabBag = ({ list }) => {
  const items = list.map(({ title, url }, key) => {
    return (
      <a className={css(styles.item)}
        href={url}
        target='_blank'
        key={key}>
        {title}
      </a>
    );
  });

  return (
    <StaticContainer>
      <div className={css(styles.box)}>
        <div className={css(styles.title)}>好康報報</div>
        <div className={css(styles.items)}>{ items }</div>
      </div>
    </StaticContainer>
  );
};

const styles = StyleSheet.create({
  box: {
  },
  title: {
    background: '#00A0D1',
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    padding: '10px'
  },
  item: {
    background: '#00A0D1',
    border: 0,
    borderRadius: 20,
    color: '#ffffff',
    cursor: 'pointer',
    float: 'left',
    fontSize: 16,
    padding: '7px 0',
    margin: '4px 15px',
    textDecoration: 'none',
    transition: '.2s opacity ease',
    width: 120,
    ':hover': {
      opacity: 0.6
    }
  },
  items: {
    background: '#E9EAEB',
    clear: 'both',
    height: 108,
    padding: '10px 0',
    textAlign: 'center',
    width: '100%'
  }
});

GrabBag.propTypes = {
  list: PropTypes.array.isRequired
};

export default GrabBag;
