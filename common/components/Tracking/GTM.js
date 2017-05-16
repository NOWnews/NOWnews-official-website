import { Component, PropTypes } from 'react';
import buildGTM from 'react-google-tag-manager';

class GTM extends Component {

  static defaultProps = {
    additionalEvents: {},
    dataLayerName: 'dataLayer',
    scriptId: 'react-google-tag-manager-gtm'
  };

  componentDidMount () {
    const gtm = buildGTM({
      id: this.props.gtmId,
      additionalEvents: this.props.additionalEvents,
      dataLayerName: this.props.dataLayerName
    });

    if (!window[this.props.dataLayerName]) {
      eval(gtm.scriptAsHTML().replace(/<\/?script>/g, '')); // eslint-disable-line
    }
  }

  render () {
    const gtm = buildGTM({
      id: this.props.gtmId,
      additionalEvents: this.props.additionalEvents,
      dataLayerName: this.props.dataLayerName
    });

    return gtm.noScriptAsReact();
  }
}

GTM.propTypes = {
  gtmId: PropTypes.string.isRequired,
  dataLayerName: PropTypes.string,
  additionalEvents: PropTypes.object
};

export default GTM;
