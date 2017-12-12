import React from 'react';

class BodyColor extends React.Component {
  static propTypes = {
    backgroundImageUrl: React.PropTypes.string
  }
  static defaultProps = {
    backgroundImageUrl: 'https://img.nownews.com/nownews_staging/images/5a2fb1a8e4156b269eeb2faf_201712121838.jpg'
  }
  componentDidMount () {
    var body = document.getElementsByTagName('body');
    body[0].style.background = `url(${this.props.backgroundImageUrl})`;
    body[0].style.backgroundPosition = 'center';
    body[0].style.backgroundRepeat = 'no-repeat';
    body[0].style.backgroundSize = '100%';
    body[0].style.backgroundAttachment = 'fixed';
    body[0].onclick = (event) => {
      let parentDom = event.target.parentElement.getAttribute('class');
      if (parentDom.indexOf('root_') > -1) {
        window.open('https://www.google.com', '_blank');
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
