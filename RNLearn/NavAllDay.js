/**
 * Created by chenyn on 16/10/12.
 */

import React, { Component } from 'react';
import {Text, Navigator } from 'react-native';


export default class NavAllDay extends  Component {
    render() {
        return (
            <Navigator initialRoute={{title: 'Awesome Scene', index: 0}} // initialRoute初始化第一个页面
                       renderScene={(route, navigator) =>                // renderScene返回基于route title显示文本的方法
                       <Text>Hello {route.title}</Text>
                       }
                       style={{padding: 100}}
            />
        );
    }
}