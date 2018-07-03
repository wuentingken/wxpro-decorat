// pages/fabu/mianji/mianji.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    huxing:'',
    mianji: ''
  },
  mianji:function(e){
    this.setData({
      mianji: e.detail.value
    })
  },
  toyusuan :function(){
    var that=this;
    if (this.data.mianji){
      wx.navigateTo({
        url: '../yusuan/yusuan?huxing=' + that.data.huxing + '&mianji=' + that.data.mianji
    })
    }else{
      wx.showToast({
        title: '请输入面积',
        icon: 'none',
        duration: 1000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      huxing: options.huxing
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