import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';

class NewsList12 extends PureComponent {
  render () {
    const { newsList } = this.props;
    console.log(newsList.length);
    if (newsList.length !== 12) {
      return null;
    }
    const rows = [0, 2, 4, 6, 8, 10];
    let items = [];

    rows.forEach((row) => {
      let linkClass = css(
        styles.link,
        (row === 0) && styles.firstLineLink
      );

      let newsForLeft = newsList[row];
      let newsForRight = newsList[row + 1];
      items.push(
        <Link key={newsForLeft.sn} className={linkClass} to={newsForLeft.parseUrl}>
          <span className={css(styles.label)}>{newsForLeft.MainMenu.name}</span>
          <span>{newsForLeft.shortTitle}</span>
        </Link>
      );

      items.push(
        <Link key={newsForRight.sn} className={linkClass} to={newsForRight.parseUrl}>
          <span className={css(styles.label)}>{newsForRight.MainMenu.name}</span>
          <span>{newsForRight.shortTitle}</span>
        </Link>
      );
    });

    return (
      <div className={css(styles.box)}>
        { items }
      </div>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    marginBottom: 10
  },
  firstLineLink: {
    borderTop: '1px solid #A8A9AA'
  },
  link: {
    borderBottom: '1px solid #A8A9AA',
    color: '#000000',
    display: 'inline-block',
    fontSize: 15,
    lineHeight: '27px',
    margin: '0 10px',
    textDecoration: 'none',
    width: 309
  },
  label: {
    background: '#fec340',
    fontSize: 14,
    margin: '0 6px',
    padding: '2px 5px'
  }
});

NewsList12.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default NewsList12;
