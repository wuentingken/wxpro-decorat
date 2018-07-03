// pages/fabu/where/where.js
var model = require('../../../../model/model.js')
var item = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      show: false,
    },
    huxing: '',
    mianji: '',
    yusuan: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
    this.setData({
      huxing: e.huxing,
      mianji: e.mianji,
      yusuan: e.yusuan
    })
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
  },
  tophoto:function(){
    var that = this;
    if (this.data.province) {
      wx.navigateTo({
        url: '../photo/photo?huxing=' + that.data.huxing + '&mianji=' + that.data.mianji + '&yusuan=' + that.data.yusuan + '&city=' + that.data.province + that.data.city + that.data.county
      })
    } else {
      wx.showToast({
        title: '请选择城市',
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