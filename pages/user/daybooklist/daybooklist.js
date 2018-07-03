// pages/user/daybooklist/daybooklist.js
Page({
  data:{
    decorlist:[]
  },
  toDayBookIn:function(e){
    console.log(e)
    var id = e.currentTarget.id;
    wx.navigateTo({
      url:'../../decorate/decoratein/decoratein?id='+id
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'publish/index/riji', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        openid: getApp().globalData.openid
      },
      success: function (res) {
        console.log(res)
        that.setData({
          decorlist: res.data
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