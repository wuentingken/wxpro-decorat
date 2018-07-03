// pages/experience/experiencelist/experiencelist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exper:[],
    host: getApp().globalData.host,
    id:''
  },
  toexin:function(e){
    var that = this;
    wx.navigateTo({
      url: '../experiencein/experiencein?id=' + e.target.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    var that = this;
    var biaoqian = options.biaoqian;
    wx.request({
      url: getApp().globalData.host + 'publish/experience/cover_index', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        biaoqian: biaoqian
      },
      success: function (res) {
        console.log(res)
        that.setData({
          exper: res.data
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