import React from 'react';

class BodyColor extends React.Component {
  static propTypes = {
    backgroundImageUrl: React.PropTypes.string,
    link: React.PropTypes.string
  }
  static defaultProps = {
    backgroundImageUrl: 'https://imagelab.nownews.com/?q=85&src=https://img.nownews.com/nownews_production/images/5a3095257ae73a2cbd7f12fc_201712131049.jpg',
    link: 'https://tw.beanfun.com/LineageM/web/index.aspx'
  }
  componentDidMount () {
    // 下面這個判斷式 上正式前要移除
    // if (window.location.search.indexOf('ChangeDay') > -1)
    if (window.location.search.indexOf('ChangeDay') > -1) {
      var body = document.getElementsByTagName('body');
      body[0].style.background = `url(${this.props.backgroundImageUrl})`;
      body[0].style.backgroundPosition = 'center';
      body[0].style.backgroundRepeat = 'no-repeat';
      body[0].style.backgroundSize = '100%';
      body[0].style.backgroundAttachment = 'fixed';
      body[0].onclick = (event) => {
        let parentDom = event.target.parentElement.getAttribute('class');
        if (parentDom.indexOf('root_') > -1) {
          window.open(this.props.link, '_blank');
        }
      };
    }
  }
//   componentWillReceiveProps (nextProps) {
//   }
  componentWillUnmount () {
    var body = document.getElementsByTagName('body');
    body[0].style.background = `#FFFFFF`;
    body[0].onclick = null;
  }
  render () {
    return null;
  }
}

export default BodyColor;
