// pages/fabu/kong/kong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txtStyle: '',
    kong:[],
    host: getApp().globalData.host,
    num:'0',
    nowtitle:'',
    nowktit:''
  },
  tosetkong:function(e){
    var num = this.data.num;
    var kong = this.data.kong;
    var imgtext,imgurl;
    var id = e.target.id;
    if (id == num){
      wx.navigateTo({
        url: '../setkong/setkong?id=' + id,
      })
    }else{
      kong.map(function (item,index){
        if(index==id){
          imgtext = item.imgtext;
          imgurl = item.imgurl;
        }
      })
      wx.navigateTo({
        url: '../setkong/setkong?id=' + id + '&imgtext=' + imgtext + '&imgurl=' + imgurl,
      })
    }
    
  },
  delkong:function(e){
    var index = e.target.dataset.index;

    var list = this.data.kong;

    list.splice(index,1)

    this.setData({
      kong: list
    })
  },
  onLoad: function (options) {
    var that = this;
    if(options.kongarr){
      var kongarr = JSON.parse(options.kongarr)
      console.log(kongarr)
      that.setData({
        kong:kongarr,
        num: kongarr.length
      })
    } 
    var title = options.type;
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      nowtitle: title,
    })
    
  },
  onShow: function () {
    var that = this;
    var id = this.data.nowid;
    var imgtext = this.data.imgtext;
    var imgurl = this.data.imgurl;
    if (imgurl) {
      if(id==that.data.num){
        that.data.kong.push({ id: id, imgtext: imgtext, imgurl: imgurl, txtStyle:''})
      }else{
        that.data.kong.map(function (item, index,input) {
          if (index == id) {
            input[index] = { id: id, imgtext: imgtext, imgurl: imgurl, txtStyle: ''};
          }
        })
      }
      that.setData({
        kong: that.data.kong
      })
      
      var idnum = this.data.kong.length;
      that.setData({
        num: idnum
      })

      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        nowtitle: that.data.nowtitle,
        kong: that.data.kong
      })
    }

  },

  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = 50;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        
          txtStyle= "transform: translateX(0px)";
        
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
         
            txtStyle= "transform: translateX(-50px)";
          
        } else {
          
            txtStyle= "transform: translateX(-" + disX + "px)";
          
        }
      }

      var index = e.target.dataset.index;
      console.log(txtStyle)

      var list = this.data.kong;

      list[index].txtStyle = txtStyle;

      this.setData({
        kong: list
      })
      // //更新列表的状态
      // this.setData({
      //   list:list
      // });
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = 50;
      var txtStyle = "";
      
        txtStyle= disX > delBtnWidth / 2 ? "transform: translateX(-50px)" : "transform: translateX(0px)";
      

      //获取手指触摸的是哪一项

        var index = e.target.dataset.index;
        console.log(txtStyle)

        var list = this.data.kong;

        list[index].txtStyle = txtStyle;

        this.setData({
          kong: list
        })

      //更新列表的状态

      // this.setData({

      //   list:list

      // });

    }

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