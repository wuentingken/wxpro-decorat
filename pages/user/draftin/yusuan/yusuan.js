// pages/fabu/yusuan/yusuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      yusuan:'',
      id:''
  },
  yusuan: function (e) {
    this.setData({
      yusuan: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.yusuan){
      that.setData({
        yusuan: options.yusuan,
        id:options.id
      })
    }
  },
  toarea: function() {
    var that = this;
    if (this.data.yusuan) {
      wx.navigateTo({
        url: '../photo/photo?yusuan='+ that.data.yusuan +'&id='+that.data.id
      })
    } else {
      wx.showToast({
        title: '请输入预算',
        icon: 'none',
        duration: 1000
      })
    }
    
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