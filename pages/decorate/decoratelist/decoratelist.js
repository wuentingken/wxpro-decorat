// pages/decorate/decoratelist/decoratelist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: getApp().globalData.host,
    decorlist:[],
    showtext: false
  },
  choicsty:function(e){
    var that = this;
    var val = e.target.id;
    wx.request({
      url: getApp().globalData.host + 'publish/diary/index', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        style: val
      },
      success: function (res) {
        if (res.data.length == 0) {
          that.setData({
            showtext: true
          })
        }else{
          that.setData({
            showtext: false
          })
        }
        that.setData({
          decorlist: res.data
        })
      }
    })
  },
  search:function(e){
    var that= this;
    var val = e.detail.value;
    wx.request({
      url: getApp().globalData.host + 'publish/diary/index', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        style:val
      },
      success: function (res) {
        if (res.data.length == 0) {
          that.setData({
            showtext: true
          })
        } else {
          that.setData({
            showtext: false
          })
        }
        that.setData({
          decorlist: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  decoratein:function(e){
    var id = e.target.dataset.id;
    var openid = e.target.dataset.openid;
    wx.navigateTo({
      url: '../decoratein/decoratein?id='+id+'&openid='+openid
    })
  },
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: getApp().globalData.host + 'publish/diary/index', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          decorlist: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})