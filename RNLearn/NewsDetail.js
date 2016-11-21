/**
 * Created by chenyn on 16/10/20.
 */

import {
    View,
    Text,
    WebView,
    Image
} from 'react-native'

import React,{
    Component,
    PropTypes
} from 'react'

export  default class NewsDetail extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            content: []
        };

      }

      static propTypes = {
          url: PropTypes.string.isRequired,
      }

      // 请求数据
    async _onRequest(callback) {

        fetch(this.props.url)
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson.article.content);
                callback(responseJson.article.content);
                return responseJson.article;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        const  _this = this;
        this._onRequest((articleContent)=>{

            var content;

            try{
                content = JSON.parse(articleContent);
            }catch(ex){

            }

            var html = '';

            content&&content.forEach((item)=>{
                if(item.type === 'text'){

                    html+= '<Text width="100%" style="background-color: #111111">'+item.content+'</Text>';
                }else if(item.type == 'image'){
                    html+= '<img width="100%" src="'+ item.url+ '"/>';
                }
                html+= '<br/>';
            });

            // console.log(html);

            // this.content = articleContent;
            _this.setState({content : html})
        });
    }

    _subContentView(subContent) {
        if(subContent.type == 'text')
        {
            // return <WebView
            //     source={{html: subContent.content}}
            //     scalesPageToFit={true}
            // />
            return (<TextDetail textContent={subContent}></TextDetail>);
        }
        else if(subContent.type == 'image')
        {
            return (<ImageDetail imageContent={subContent}></ImageDetail>);
        }
        else if(subContent.type == 'GoodsDetail')
        {
            return (<GoodsDetail goodsContent={subContent}></GoodsDetail>);
        }
    }

    _createView() {

        if(this.state.content.length)
        {
            for(i = 0; i < this.state.content.length; i++)
            {
                var subContent = this.state.content[i];
                console.log(subContent.type);
                this._subContentView(subContent)
            }
            // this.content.forEach(subContent, (subContent)=>{
            //     this._subContentView(subContent)
            // });
            // this.content.map((subContent)=>{
            //     return (this._subContentView(subContent));
            // });
        }
    }

      render() {
              return (
                  <View style={{flex: 1}}>
                     <WebView
                           source={{html: this.state.content}}
                           scalesPageToFit={false}
                       />
                  </View>
              );
      }
}

// 文章里面的文本内容
/*
 \"type\":\"text\",
 \"content\":\"<p><title></title></p><p>《文明6》终于来了，由于还没有怎么玩《文明6》，今天就不讨论《文明6》了，今天想聊聊冠名在《文明》系列前面的那个人，席德梅尔。</p>\",
 \"state\":\"unfold\"
 */
class TextDetail extends React.Component {

    static propTypes = {
        textContent: PropTypes.object.isRequired,
    }

    render(){
        return (<Text>{this.props.textContent.content}</Text>);
    }
}

// 文章里面的图片内容
/*
 \"type\":\"image\",
 \"url\":\"http://static.iyingdi.com/article/2016/10/20/9ba26d10-7350-42d3-b790-27ee6fc89af8.jpeg@720w_1l.jpg%7Cwatermark=1&object=Y29tbW9uL3dhdGVybWFyay5wbmdAMjVQ&t=70&p=9&x=10&y=10\",
 \"caption\":\"文明4\",
 \"state\":\"unfold\"
 */
class ImageDetail extends React.Component {
    static propTypes = {
        imageContent: PropTypes.object.isRequired,
    }

    render(){
        return (<Image source={{uri: this.props.url}}></Image>);
    }
}


// 文章里面的物品内容
/*
 \"type\":\"goods\",
 \"title\":\"《代号Topdeck》二测激活码\",
 \"icon\":\"http://static.iyingdi.com/common/2016/10/17/ab6483ba-4122-4fd5-99ea-7dd5b4779642.jpg\",
 \"fire\":\"5\",
 \"price\":\"0\",
 \"id\":\"8aae37da57c2f5cf0157d0ba744a018b\"}
 */

class GoodsDetail extends React.Component {
    static propTypes = {
        goodsContent: PropTypes.object.isRequired,
    }

    render(){
        return (<Image source={{uri: this.props.goodsContent.icon}}></Image>);
    }
}