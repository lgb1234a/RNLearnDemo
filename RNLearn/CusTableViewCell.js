/**
 * Created by chenyn on 16/10/18.
 */

import {
    StyleSheet,
    TouchableHighlight,
    Image,
    Text,
    View
} from 'react-native'

import React,{
    Component,
    PropTypes
} from 'react'

export default  class CusTableViewCell extends Component {

    static propTypes = {
        rowData: PropTypes.array.isRequired,
        cellPressed: PropTypes.func,
    }

    render() {
        return (

            <TouchableHighlight style={styles.touchableHighlightStyle} onPress={()=>{
                // http://www.iyingdi.com/article/27352
                var url = 'http://www.iyingdi.com/article/'+this.props.rowData[0];
                this.props.cellPressed(url);
            }}>
                <View style={{flexDirection: 'column'}}>

                    <View style={{flexDirection: 'row'}}>
                        <Image source={{uri: this.props.rowData[7]}} style={styles.imageStyle}></Image>

                        <View style={{flexDirection: 'column', flex: 1}}>
                                <Text style={styles.textStyle} numberOfLines={2}>{this.props.rowData[1]}</Text>

                                <View style={{flexDirection:'row', flex: 1,justifyContent:'space-between',alignItems:'flex-end'}}>
                                    <Text style={styles.commentStyle}>评论:{this.props.rowData[4]}</Text>
                                    <Text style={styles.releaseStyle}>{this.props.rowData[6]}</Text>
                                    <Text style={styles.typeStyle}>{this.props.rowData[8]}</Text>
                                </View>
                        </View>
                    </View>

                    <View style={styles.viewStyle}></View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({

    touchableHighlightStyle: {
        // marginTop: 10,
        backgroundColor: 'white',
        // marginBottom: 10,
    },

    viewStyle: {
        height: 1,
        backgroundColor: '#AAA',
    },

    imageStyle: {
        width: 150,
        height: 80,
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },

    commentStyle: {
        color: 'darkgray',
        fontSize: 12,
        marginLeft: 5,
        marginBottom: 5,
    },

    typeStyle: {
        color: 'darkgray',
        fontSize: 12,
        marginRight:15,
        marginBottom: 5,
    },

    releaseStyle: {
        color: 'darkgray',
        fontSize: 12,
        marginBottom: 5,
    },

    textStyle: {
        marginLeft: 5,
        marginTop: 5,
        color: 'black',
        fontSize: 15,
    },


});

/*

 0:27560
 1:"炉石官方发布神秘图片：来自加基森的问候"
 2:1477335878
 3:"旅法师营地"
 4:251
 5:69164
 6:"[19:-1][12:-1]"
 7:"http://static.iyingdi.com/common/2016/10/25/28a758fd-18f0-48ab-b385-20d751536b21.jpg@410h_720w_1e_1c_1l.jpg"
 8:"新闻"
 9:-1
 10:1
 11:3
 12:""
 13:505433
 14:"旅法师营地"

 */