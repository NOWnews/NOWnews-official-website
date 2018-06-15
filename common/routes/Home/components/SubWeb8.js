import React, { PureComponent } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

class SubWeb8 extends PureComponent {
  render () {
    const list = [
      { img: 'sight', text: '今日觀點 Sight', url: 'https://sight.nownews.com/?utm_source=nownews&utm_medium=desktop_home' },
      { img: 'chinapost', text: 'China Post', url: 'https://chinapost.nownews.com/?utm_source=nownews&utm_medium=desktop_home' },
      { img: 'bobee', text: '保庇Bobee', url: 'https://bobee.nownews.com/?utm_source=nownews&utm_medium=desktop_home' },
      { img: 'petsmao', text: '寵毛網', url: 'https://petsmao.nownews.com/?utm_source=nownews&utm_medium=desktop_home' },
      { img: 'trend', text: 'Trend', url: 'https://trend.nownews.com/?utm_source=nownews&utm_medium=desktop_home' },
      { img: 'health', text: 'NOW健康', url: 'http://healthmedia.nownews.com/?utm_source=nownews&utm_medium=desktop_home' }
    ];
    const items = list.map(({ img, text, url }) => {
      return (
        <a key={img} href={url}
          className={css(styles.blockItem)}
          data-on='click' data-event-category='home' data-event-action='sub-web'
          target='_blank'>
          <img src={`/subWebBanner_colorful/${img}.jpg`} alt={text} />
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
