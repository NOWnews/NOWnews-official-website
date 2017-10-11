import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import moment from 'moment';
import TypeIcon from '../../../components/News/TypeIcon';
import Pagination from '../../../components/Pagination';

class BlockItems9 extends PureComponent {
  constructor (props) {
    super(props);
    this.select = this.select.bind(this);
  }

  select (index) {
    if (this.props.selectVideo !== index) {
      this.props.selectVideo(index);
      window.document.documentElement.scrollTop = 0; // For chrome, IE
      window.document.body.scrollTop = 0;// For Safari, Edge
    }
  }

  render () {
    const { local, newsList, page } = this.props;
    const items = newsList.map(({ sn, MainPhoto, shortTitle, startedAt }, index) => {
      return (
        <div key={sn} className={css(styles.blockItem)} onClick={() => { this.select(index); }}>
          <TypeIcon type='VIDEO' />
          <img className={css(styles.img)} src={MainPhoto.thumbnail} />
          <div className={css(styles.bottom)}>
            <div className={css(styles.title)}><h3 className={css(styles.h3)}>{shortTitle}</h3></div>
            <img src='/icons/whiteClock.png' />
            <span className={css(styles.time)}>
              {moment(startedAt).format('YYYY/MM/DD')}
            </span>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className='clearfix'>
          { items }
        </div>
        <Pagination {...page} {...local} />
      </div>
    );
  }
};

const styles = StyleSheet.create({
  blockItem: {
    color: '#000',
    cursor: 'pointer',
    float: 'left',
    height: 245,
    marginBottom: 30,
    marginLeft: 11.5,
    marginRight: 11.5,
    position: 'relative',
    width: 300
  },
  img: {
    height: 168,
    marginBottom: 5,
    maxWidth: '100%',
    maxHeight: 168,
    width: '100%'
  },
  title: {
    margin: '5px 0'
  },
  h3: {
    fontSize: '16px',
    fontWeight: 'normal'
  },
  time: {
    color: '#888',
    fontSize: 13,
    marginLeft: 5,
    marginTop: 5,
    position: 'relative',
    top: -2
  }
});

BlockItems9.propTypes = {
  local: PropTypes.object,
  newsList: PropTypes.array.isRequired,
  page: PropTypes.object.isRequired,
  selectVideo: PropTypes.func.isRequired
};

export default BlockItems9;
