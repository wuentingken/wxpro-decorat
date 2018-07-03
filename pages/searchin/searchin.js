// pages/searchin/searchin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colllist:'',
    host: getApp().globalData.host,
    showtext:false
  },
  tocoll: function (e) {
    console.log(e)
    var cases = e.currentTarget.dataset.cases;
    var diary = e.currentTarget.dataset.diary;
    var ex = e.currentTarget.dataset.ex;
    if (ex) {
      wx.navigateTo({
        url: '../experience/experiencein/experiencein?id=' + ex + '&openid=' + getApp().globalData.openid
      })
    } else if (diary) {
      wx.navigateTo({
        url: '../decorate/decoratein/decoratein?id=' + diary + '&openid=' + getApp().globalData.openid
      })
    } else {
      wx.navigateTo({
        url: '../case/casein/casein?id=' + cases + '&openid=' + getApp().globalData.openid
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'publish/index/search', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        search_data:options.val,
        openid: getApp().globalData.openid
      },
      success: function (res) {
        if(res.data.length==0){
          that.setData({
            showtext:true
          })
        }
        console.log(res)
        that.setData({
          colllist: res.data
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