// pages/fabu/liulan/liulan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: getApp().globalData.nickName,
    userimg: getApp().globalData.avatarUrl,
    huxing: '',
    mianji: '',
    yusuan: '',
    chengshi: '',
    fileimg: '',
    title: '',
    kongj: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var kongobj = JSON.parse(options.kongj) ;
    var kongarr=[];
    Object.keys(kongobj).forEach(function(key){
      kongarr.push({ "ty":key, "tz":kongobj[key] }); 
    })
    this.setData({
      huxing: options.huxing,
      mianji: options.mianji,
      yusuan: options.yusuan,
      chengshi: options.chengshi,
      fileimg: options.fileimg,
      title: options.title,
      kongj: kongarr 
    })
    console.log(kongarr)
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