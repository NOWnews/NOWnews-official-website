import React from 'react';

// 這是為變天廣告做的 Component 目前已經移除 2017.12.19
class BodyColor extends React.Component {
  static propTypes = {
    backgroundImageUrl: React.PropTypes.string,
    link: React.PropTypes.string
  }
  static defaultProps = {
    backgroundImageUrl: 'https://imagelab.nownews.com/?q=85&src=https://img.nownews.com/nownews_production/images/5a3669ec98199f72302044b4_201712172058.jpg',
    link: 'https://tw.beanfun.com/LineageM/web/index.aspx'
  }
  componentDidMount () {
    var body = document.getElementsByTagName('body');
    body[0].style.background = `#000 url(${this.props.backgroundImageUrl})`;
    body[0].style.backgroundPosition = 'top center';
    body[0].style.backgroundRepeat = 'no-repeat';
    body[0].style.backgroundSize = '100%';
    body[0].style.backgroundAttachment = 'fixed';
    body[0].onclick = (event) => {
      var parentDom = event.target.parentElement.getAttribute('class');
      if (parentDom.indexOf('root_') > -1) {
        window.open(this.props.link, '_blank');
      }
    };
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
