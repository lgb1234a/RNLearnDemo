/** * Sample React Native App * https://github.com/facebook/react-native * @flow */'use strict';import React, {PropTypes, Component} from 'react';import {    AppRegistry,    StyleSheet,    Text,    View,    ListView,    TouchableHighlight,    Navigator,    NavigatorIOS,    RefreshControl,    Dimensions,    ActivityIndicator,} from 'react-native';import NewsDetail from './NewsDetail'import CusTableViewCell from './CusTableViewCell';const windowInfo = Dimensions.get('window');export default class RNLearn extends React.Component {    // 构造      constructor(props, context) {        super(props, context);          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!= r2});        this.state = {            dataSource: ds.cloneWithRows([]),            refreshing: false,            showLoadMoreBtn: false,            animating: false,        };        this.timeStamp = 0;          this.size = 20;          this.scrollY = 0;          this.contentHeight = 0;          this.dataSource = [];      }    _onForward() {        this.props.navigator.push({            component: NewsDetail,            title: '详情',            passProps: { url: this.url }        });    }    _onRequest(callback) {          // http://www.iyingdi.com/article/list?module=19&size=20&system=ios&timestamp=1476944371&version=451          this._fetchData('http://www.iyingdi.com/article/list?module=19&size=20&system=ios&timestamp=0&version=451', callback)      }    async _fetchData(url, callback) {          fetch(url)              .then((response) => {                  return response.json();              })              .then((responseJson) => {                  console.log(responseJson.articles);                  if(callback)                  {                      console.log(responseJson.articles.length);                      var lastArticle = responseJson.articles[responseJson.articles.length - 1];                      // 用于加载更多数据                      this.timeStamp = lastArticle&&(lastArticle[2] - 1);                      callback(responseJson.articles);                  }              })              .catch((error) => {                  console.error(error);              });    }    _refreshData(responsJson) {          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!= r2});          this.setState({dataSource: ds.cloneWithRows(responsJson), indexPage: 0});    }    _onRefresh() {        this.setState({refreshing: true});        this._fetchData('http://www.iyingdi.com/article/list?module=19&size='+this.size+'&system=ios&timestamp=0&version=451', (responsJson)=>{            this.setState({refreshing: false});            console.log(responsJson);            this._refreshData(responsJson);            this.dataSource = responsJson;        });    }    _startAnimating() {        this.setState({animating: true});    }    _stopAnimating() {        this.setState({animating: false});    }    _loadMore() {        this._fetchData('http://www.iyingdi.com/article/list?module=19&size='+this.size+'&system=ios&timestamp='+this.timeStamp+'&version=451', (responseJson)=>{            this._stopAnimating();            this.dataSource.concat(responseJson);            this._refreshData(this.dataSource);        });    }    componentDidMount() {        this._onRequest((responsJson)=> {            this._refreshData(responsJson);            this.dataSource = responsJson;        });    }    render() {        return (            <View style={{flex: 1}}>                <ListView                    ref = {(listView) => {                        this._listView = listView                    }}                    style={styles.viewFrame}                    dataSource={this.state.dataSource}                    enableEmptySections={true}                    refreshControl={                        <RefreshControl                            refreshing={this.state.refreshing}                            onRefresh={this._onRefresh.bind(this)}                        />                    }                    renderRow={(rowData)=>{                        return(                            <CusTableViewCell rowData={rowData} cellPressed={(url)=>{                                this.url = url;                                this._onForward()                            }}/>                        )                    }}                    onScroll={(event)=> {                        console.log('scroll!'+ event.nativeEvent.contentOffset.y + '  ' + event.nativeEvent.contentSize.height + '  ' + windowInfo.height);                        this.scrollY = event.nativeEvent.contentOffset.y;                        this.contentHeight = event.nativeEvent.contentSize.height;                        if((this.contentHeight < windowInfo.height + this.scrollY) && !this.state.animating)                        {                            this._startAnimating();                            this._loadMore();                        }                    }}                    renderFooter={()=>{                            return (                                <View>                                    <TouchableHighlight>                                        <Text style={{                                            flex: 1,                                            backgroundColor: 'rgba(255, 255, 255, 0.0)',                                            fontSize: 15,                                            height: 25,                                            textAlign: 'center',                                            textAlignVertical: 'center',                                        }}>加载更多...</Text>                                    </TouchableHighlight>                                    <ActivityIndicator                                        animating={this.state.animating}                                        style={[styles.centering, {height: 20}]}                                        size='small'                                    />                                </View>                            )                    }}                />            </View>        );    }}class Learn extends React.Component {    render() {       return (<NavigatorIOS            style={{flex: 1}}            barTintColor='#ffffcc'            initialRoute={{title: '首页', component: RNLearn}}        />)    }}const styles = StyleSheet.create({    mapFrame: {        // width: 5,        // height: 5,        // marginBottom: 0,        // margin: 10,        // alignSelf:'stretch',        flex: 1,        backgroundColor: 'red',    },    viewFrame: {        flexDirection:'column',        marginTop:0,        flex: 1,        backgroundColor: 'green'    },    lineViewStyle: {        height: 1,        backgroundColor: '#000'    },    textStyle: {        color: '#000',        fontSize: 24,        backgroundColor: '#FFF'    },    highLightText:{        color: 'red',        fontSize: 24,        backgroundColor: 'green'    }});// 注意，这里用引号括起来的'HelloWorldApp'必须和你init创建的项目名一致AppRegistry.registerComponent('RNLearn', () => Learn);