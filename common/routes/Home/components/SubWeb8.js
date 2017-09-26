import React, { PureComponent } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

class SubWeb8 extends PureComponent {
  render () {
    const list = [
      { img: 'sight', text: '今日觀點 Sight', url: 'https://sight.nownews.com/' },
      { img: 'chinapost', text: 'China Post', url: 'https://chinapost.nownews.com' },
      { img: 'pinknow', text: '粉樂NOW', url: 'https://pinknow.nownews.com/' },
      { img: 'bobee', text: '保庇Bobee', url: 'https://bobee.nownews.com/' },
      { img: 'ifunnow', text: 'iFunNOW', url: 'https://ifunnow.nownews.com/' },
      { img: 'playnow', text: 'PlayNOW', url: 'https://playnow.nownews.com/' },
      { img: 'petsmao', text: '寵毛網', url: 'https://www.petsmao.com/' },
      { img: 'sport', text: 'Sport', url: 'https://sport.nownews.com/' }
    ];
    const items = list.map(({ img, text, url }) => {
      return (
        <a key={img} href={url}
          className={css(styles.blockItem)}
          target='_blank'>
          <img src={`/subWebBanner/${img}.jpg`} alt={text} />
        </a>
      );
    });

    return (
      <div className='clearfix'>
        { items }
      </div>
    );
  };
}
const styles = StyleSheet.create({
  blockItem: {
    float: 'left',
    margin: '12px 11.5px',
    width: 300,
    position: 'relative'
  }
});

export default SubWeb8;
