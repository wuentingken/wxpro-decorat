// pages/fabu/setkong/setkong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upiii:'',
    filename:'',
    host: getApp().globalData.host,
    nowid:'',
    kongitem:{}
  },
  onLoad: function (options) {
    console.log(options)
    if(options.imgurl){
      this.setData({
        nowid: options.id,
        imgtext : options.imgtext,
        upiii:options.imgurl
      })
    }else{
      this.setData({
        nowid: options.id
      })
    } 
  },
  saveimgtext:function(e){
    var title = e.detail.value;
    var nowid = this.data.nowid;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      imgtext: title,
      nowid: nowid
    })
  },
  upimg:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          upiii: tempFilePaths,
        })
        wx.uploadFile({
          url: that.data.host + 'publish/diary/img_up', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            console.log(res)
            that.setData({
              filename: 'uploads/images/' + JSON.parse(res.data).file
            })
            //do something
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];
            prevPage.setData({
              imgurl: that.data.filename
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

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