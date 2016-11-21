/**
 * 入口页面, 提供全局的Navigator引用
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Platform,
  View
} from 'react-native';

import Flow from './Flow';
import Welcome from './Welcome';
import Http from './common/Http';

class AppNavigator extends Component {
  // 页面场景切换效果
  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.FloatFromRight;
  }

  // 处理页面跳转
  renderScene(route, navigator) {
    Http.setNavigator(navigator);
    const Component = route.component;
    return (
      <View style={{flex: 1}}>
        <Component navigator={navigator} route={route} {...route.passProps} />
      </View>
    )
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Navigator
        initialRoute={{ component:  Welcome }}
        configureScene={this.configureScene}
        renderScene={this.renderScene} />
    );
  }
}
AppRegistry.registerComponent('RNCandidateProj', () => AppNavigator);
