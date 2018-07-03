// pages/user/usercenter/usercenter.js
Page({
  data:{
    username: getApp().globalData.nickName,
    userimg: getApp().globalData.avatarUrl
  },
  toIndex:function(){
    wx.redirectTo({
      url: '../../index/index'
    })
  },
  toCollect:function(){
    wx.navigateTo({
      url: '../collect/collect'
    })
  },
  toDraft:function(){
    wx.navigateTo({
      url: '../draft/draft'
    })
  },
  toDayBook:function(){
    wx.navigateTo({
      url: '../daybooklist/daybooklist'
    })
  },
  topicker: function () {
    wx.redirectTo({
      url: '../../tellus/telusindex/telusindex'
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log()
    this.setData({
      username: getApp().globalData.nickName,
      userimg: getApp().globalData.avatarUrl
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