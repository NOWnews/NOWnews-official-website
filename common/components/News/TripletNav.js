import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import ListItemSm from './ListItemSm';
import { Margin10 } from '../Layout';

class TripletNav extends PureComponent {
  constructor (props) {
    super(props);
    this.state = { tripletType: 'instant' };
    this.switchTripletType = this.switchTripletType.bind(this);
  }

  switchTripletType (type) {
    if (type === 'lbs') {
      this.props.loadLBSList();
    }
    this.setState({tripletType: type});
  }

  render () {
    const { list, mapCity } = this.props;
    const { tripletType } = this.state;
    const slicedList = list[tripletType].slice(0, 5);
    const titles = {
      instant: '即時新聞',
      interest: '您感興趣的新聞',
      lbs: '地區新聞'
    };
    const TripletIcons = ['instant', 'interest', 'lbs'].map((value) => {
      const imgName = (tripletType === value) ? `${value}_active` : value;

      return (
        <img key={value} onClick={() => { this.switchTripletType(value); }}
          className={css(styles.icon)} src={`/icons/${imgName}.png`} title={titles[value]} />
      );
    });
    const items = slicedList.map(({ sn, MainMenu, MainPhoto, shortTitle, startedAt, type, parseUrl }, key) => {
      return (
        <div key={key}>
          <ListItemSm
            category={MainMenu && MainMenu.name || '未分類'}
            data-on='click' data-event-category='news' data-event-action={`nav-${tripletType}`}
            photo={MainPhoto}
            title={shortTitle}
            time={startedAt}
            type={type}
            url={`${parseUrl}?from=page${tripletType}`} />
        </div>
      );
    });

    return (
      <Margin10>
        <div className={`relative ${css(styles.switchIconArea)}`}>
          <div className={css(styles.background)} />
          <div className={css(styles.switchIcons)}>
            { TripletIcons }
          </div>
          { tripletType === 'lbs' && <div className={css(styles.mapTitle)}>{ mapCity }</div>}
        </div>
        { tripletType === 'lbs' && mapCity === '' && <h3>尚未取得您的位置資訊</h3>}
        <div>{ items }</div>
      </Margin10>
    );
  }

};

const styles = StyleSheet.create({
  background: {
    background: 'url(/bg/bg-personal-right-side.png)',
    height: 95,
    position: 'absolute',
    top: 40,
    width: 300,
    zIndex: -1
  },
  icon: {
    curosr: 'pointer',
    margin: '0 5px',
    width: 80
  },
  mapTitle: {
    color: '#0080ff',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: '20px',
    margin: '5px 30px',
    textAlign: 'right'
  },
  switchIconArea: {
    height: 140
  },
  switchIcons: {
    margin: '0 10px',
    textAlign: 'center'
  }
});

TripletNav.propTypes = {
  list: PropTypes.object.isRequired,
  loadLBSList: PropTypes.func,
  mapCity: PropTypes.string.isRequired
};

export default TripletNav;
