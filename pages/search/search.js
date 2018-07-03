// pages/search/search.js
Page({
  data:{
    history:[],
    nic:''
  },
  gosear:function(e){
    var val = e.detail.value;
    this.setData({
      nic: ''
    })
    wx.navigateTo({
      url: '../searchin/searchin?val='+val,
    })
    
  },
  tosearchin:function(e){
    var val = e.currentTarget.dataset.content;
    wx.navigateTo({
      url: '../searchin/searchin?val=' + val,
    })
    
  },
  delhis:function(e){
    var that = this;
    var id = e.currentTarget.id;
    wx.request({
      url: getApp().globalData.host + 'publish/index/delete_history', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id:id
      },
      success: function (res) {
        if(res.data==1){
          wx.request({
            url: getApp().globalData.host + 'publish/index/history', //仅为示例，并非真实的接口地址
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              openid: getApp().globalData.openid
            },
            success: function (res) {
              console.log(res)
              that.setData({
                history: res.data
              })
            }
          })
        }
      }
    })
  },
  tosear:function(e){
    var val = e.target.dataset.type;
    wx.navigateTo({
      url: '../searchin/searchin?val=' + val,
    })
  },
  onLoad:function(options){
      // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'publish/index/history', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openid: getApp().globalData.openid
      },
      success: function (res) {
        console.log(res)
        that.setData({
          history: res.data
        })
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})