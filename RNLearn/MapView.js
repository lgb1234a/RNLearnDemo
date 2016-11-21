/**
 * Created by chenyn on 16/10/14.
 */

import React, {
    Component, PropTypes
} from  'react';

import  {
    requireNativeComponent,
    View,
    Text
} from 'react-native';


var RCTMapView = requireNativeComponent('RCTMapView', MapView);
//
// MapView.propTypes = {
//
//     pitchEnabled: React.PropTypes.bool,
//
//     region: React.PropTypes.shape ({
//         latitude: React.PropTypes.number.isRequired,
//         longitude: React.PropTypes.number.isRequired,
//
//         latitudeDelta: React.PropTypes.number.isRequired,
//         longitudeDelta: React.PropTypes.number.isRequired,
//     }),
//
// };

export default class  MapView extends React.Component {

    // 构造
      constructor(props) {
          super(props);
        this._onChange = this._onChange.bind(this);
      }

      _onChange(event){
          if(!this.props.onRegionChange) {
              return;
          }
          this.props.onRegionChange(event.nativeEvent.region);
      }

    static  propTypes = {
        pitchEnabled: PropTypes.bool,

        onRegionChange: React.PropTypes.func,

        region: React.PropTypes.shape ({
            latitude: React.PropTypes.number.isRequired,
            longitude: React.PropTypes.number.isRequired,

            latitudeDelta: React.PropTypes.number.isRequired,
            longitudeDelta: React.PropTypes.number.isRequired,
        }),
    };

    render() {
        return <RCTMapView {...this.props} onChange={this._onChange} />;

    }
}
