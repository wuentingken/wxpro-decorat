// pages/user/daybookin/daybookin.js
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  data: {
    showP: false,
    animationPing: {},
    anli:{},
    host: getApp().globalData.host,
    pinglun:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nic:'',
    pinglun:[],
    id:'',
    scimg:'../../img/collect.png',
    zanimg:'../../img/zan.png',
    colred:false,
    colyel:false
  },
  confir:function(e){
    console.log(getApp().globalData.openid)
    var comment = e.detail.value;
    var anliid = e.currentTarget.id;
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'publish/index/comment', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        comment: comment,
        id:anliid,
        name: getApp().globalData.nickName,
        img: getApp().globalData.avatarUrl,
        openid: getApp().globalData.openid
      },
      success: function (res) {
        if(res==0){
          console.log('评论失败')
        }else{
          wx.showToast({
            title: '评论成功，正在审核',
            icon: 'none',
            duration: 1000
          })
        }
        that.setData({
          nic: ''
        })
      }
    })
  },
  showPing: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 400,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(500).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationPing: animation.export(),
      // 改变view里面的Wx：if
      showP: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationPing: animation.export()
      })
    }, 200)
  },
  hidePing: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(500).step()
    that.setData({
      animationPing: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationPing: animation.export(),
        showP: false
      })
    }, 200)
  },
  sc:function(){
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'publish/index/save', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: that.data.id,
        openid: getApp().globalData.openid
      },
      success: function () {
        wx.request({
          url: getApp().globalData.host + 'publish/index/index', //仅为示例，并非真实的接口地址
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            id: that.data.id,
            openid: getApp().globalData.openid
          },
          success: function (res) {
            console.log(res)
            that.setData({
              anli: res.data
            })
            if (res.data.save_or == 1) {
              that.setData({
                scimg: '../../img/collectactive.png',
                colyel: true
              })
            } else {
              that.setData({
                scimg: '../../img/collect.png',
                colyel: false
              })
            }
          }
        });
      }
    })
  },
  zan: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'publish/index/like', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: that.data.id,
        openid: getApp().globalData.openid
      },
      success: function () {
        wx.request({
          url: getApp().globalData.host + 'publish/index/index', //仅为示例，并非真实的接口地址
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            id: that.data.id,
            openid: getApp().globalData.openid
          },
          success: function (res) {
            console.log(res)
            that.setData({
              anli: res.data
            })
            if (res.data.like_or == 1) {
              that.setData({
                zanimg: '../../img/zanactive.png',
                colred: true
              })
            } else {
              that.setData({
                zanimg: '../../img/zan.png',
                colred: false
              })
            }
          }
        });
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    })
    var id = options.id;
    wx.request({
      url: getApp().globalData.host + 'publish/index/index', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        id:id,
        openid: getApp().globalData.openid
      },
      success: function (res) {
        console.log(res)
        that.setData({
          anli: res.data,
        })
        var content = res.data.content;
        WxParse.wxParse('content', 'html', content, that, 5);
        if(res.data.like_or==1){
          that.setData({
            zanimg:'../../img/zanactive.png',
            colred:true
          })
        }else{
          that.setData({
            zanimg: '../../img/zan.png',
            colred: false
          })
        }
        if (res.data.save_or == 1) {
          that.setData({
            scimg: '../../img/collectactive.png',
            colyel: true
          })
        }else{
          that.setData({
            scimg: '../../img/collect.png',
            colyel: false
          })
        }
      }
    });
    wx.request({
      url: getApp().globalData.host + 'publish/index/com', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: id
      },
      success: function (res) {
        that.setData({
          pinglun: res.data
        })
      }
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})