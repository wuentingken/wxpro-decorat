// pages/user/collect/collect.js
Page({
  data: { 
    colllist:[],
    host: getApp().globalData.host,
    },
  tocoll:function(e){
    console.log(e)
    var cases = e.currentTarget.dataset.cases;
    var diary = e.currentTarget.dataset.diary;
    var ex = e.currentTarget.dataset.ex;
    if (ex){
        wx.navigateTo({
          url: '../../experience/experiencein/experiencein?id=' + ex + '&openid=' + getApp().globalData.openid
        })
    } else if (diary){
      wx.navigateTo({
        url: '../../decorate/decoratein/decoratein?id=' + diary + '&openid=' + getApp().globalData.openid
      })
    }else{
      wx.navigateTo({
        url: '../../case/casein/casein?id=' + cases + '&openid=' + getApp().globalData.openid
      })
    }
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: getApp().globalData.host + 'publish/index/save_list', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openid: getApp().globalData.openid
      },
      success: function (res) {
        console.log(res)
        that.setData({
          colllist: res.data
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})