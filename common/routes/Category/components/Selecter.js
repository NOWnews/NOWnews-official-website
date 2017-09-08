import React, { PropTypes, PureComponent } from 'react';
import FontAwesome from 'react-fontawesome';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../../components/Layout';

class Selecter extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.switchOpenStatus = this.switchOpenStatus.bind(this);
    this.switchMenu = this.switchMenu.bind(this);
  }

  switchOpenStatus () {
    this.setState({isOpen: !this.state.isOpen});
  }

  switchMenu (categoryName, url) {
    this.setState({isOpen: false});
    window.history.pushState(null, null, url);
    this.props.loadData(categoryName);
  }

  render () {
    let { options, selected } = this.props;

    let items = options.map(({ categoryName, sn, url, name }) => {
      let isActive = (sn === selected.sn) ? css(styles.activeItem) : '';
      categoryName = 'fuhaa';
      return (
        <span key={sn} className={`${css(styles.item)} ${isActive}`}
          onClick={() => { this.switchMenu(categoryName, url); }}>
          {name}
        </span>
      );
    });
    let iconRotate = (this.state.isOpen) ? 'fa-rotate-270' : 'fa-rotate-90';
    let isOpen = (this.state.isOpen) ? '' : 'hide';
    return (
      <Margin10 className='center'>
        <button className={css(styles.selecter)} onClick={this.switchOpenStatus}>
          <span className={css(styles.selType)}>分類</span>
          <span className={css(styles.selTitle)}>{ selected.name || '請選擇' }</span>
          <FontAwesome name='play' className={`${iconRotate} ${css(styles.selIcon)}`} size='2x' />
        </button>
        <div className={`clearfix ${isOpen} ${css(styles.itemBox)}`}>{ items }</div>
      </Margin10>
    );
  }
};

const styles = StyleSheet.create({
  activeItem: {
    color: '#1886FB'
  },
  itemBox: {
    background: '#ffffff',
    marginTop: 10,
    opacity: 0.8,
    padding: '10px 20px',
    position: 'absolute',
    textAlign: 'center',
    width: 970,
    zIndex: 100
  },
  item: {
    color: '#000000',
    float: 'left',
    padding: '8px 0',
    width: 155,
    ':hover': {
      opacity: 0.6
    }
  },
  selecter: {
    backgroundImage: 'url("/bg/bg-channel-selecter.png")',
    backgroundRepeat: 'repeat-y',
    border: 0,
    cursor: 'pointer',
    height: 54,
    lineHeight: '54px',
    outline: 'none',
    position: 'relative',
    width: 327
  },
  selIcon: {
    position: 'absolute',
    top: 16.5,
    right: 30
  },
  selTitle: {
    fontSize: 20,
    left: 15,
    position: 'relative'
  },
  selType: {
    color: '#ffffff',
    fontSize: 25,
    left: 13,
    position: 'absolute'
  }
});

Selecter.propTypes = {
  options: PropTypes.array.isRequired,
  loadData: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
};

export default Selecter;
