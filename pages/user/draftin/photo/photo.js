// pages/fabu/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    cao:{},
    photo:'../../../img/choice.png',
    tfeng:'true',
    host: getApp().globalData.host,
    huxing: '',
    mianji: '',
    yusuan: '',
    city:'',
    filename:'',
    title:'',
    openid: getApp().globalData.openid,
    kongj:{'开帖':[],'选择':[],'水电':[],'防水':[],'吊顶':[],'贴砖':[],'墙面':[],'硬装毕业照':[],'总结':[]},
    kongjian: [{ id: '01', title: '开帖', txtStyle: '' }, { id: '02', title: '选择', txtStyle: '' }, { id: '03', title: '水电', txtStyle: '' }, { id: '04', title: '防水', txtStyle: '' }, { id: '05',title: '吊顶', txtStyle: '' }, { id: '06',title: '贴砖', txtStyle: '' }, { id: '07', title: '墙面', txtStyle: '' }, { id: '08',title: '硬装毕业照', txtStyle: '' }, { id: '09', title: '总结', txtStyle: '' }]
  },
  tohuxing:function(e){
    var that = this;
    wx.navigateTo({
      url: '../huxing/huxing?id=' + that.data.id
    })
  },
  tominaji: function (e) {
    var that = this;
    var mianji = e.currentTarget.dataset.num
    wx.navigateTo({
      url: '../mianji/mianji?mianji=' + mianji + '&id=' +that.data.id
    })
  },
  toyusuan:function(e) {
    var that = this;
    var yusuan = e.currentTarget.dataset.num
    wx.navigateTo({
      url: '../yusuan/yusuan?yusuan=' + yusuan + '&id=' + that.data.id,
    })
  },
  fabu:function(){
    var that= this;
    wx.request({
      url: getApp().globalData.host + 'publish/diary/edit_ok_fabu',
      header: {
        'content-type': 'application/json'
      },
      data: {
        huxing: that.data.huxing,
        mianji: that.data.mianji,
        yusuan: that.data.yusuan,
        chengshi: that.data.city,
        fileimg: that.data.filename,
        title: that.data.title,
        openid: getApp().globalData.openid,
        kongj: that.data.kongj
      },
      success: function (res) {
        wx.showToast({
          title: '发布成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '../../../user/daybooklist/daybooklist',
          })
        },2000)
      }
    })
  },
  liulan:function(){
    var that = this;
    wx.navigateTo({
      url: '../liulan/liulan?huxing=' + that.data.huxing + '&mianji=' + that.data.mianji + '&yusuan=' + that.data.yusuan + '&chengshi=' + that.data.city + '&fileimg=' + that.data.filename + '&title=' + that.data.title + '&kongj=' + JSON.stringify(that.data.kongj)
    })
  },
  guanbi:function(){
    
    var that = this;
    console.log(that.data.filename)
    wx.showModal({
      content: '已将你编辑的内容自动保存到草稿箱，确定要离开编辑页面吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: getApp().globalData.host + 'publish/diary/edit_ok',
            header: {
              'content-type': 'application/json'
            },
            data: {
              id: that.data.id,
              huxing: that.data.huxing,
              mianji: that.data.mianji,
              yusuan: that.data.yusuan,
              chengshi: that.data.city,
              fileimg: that.data.filename,
              title: that.data.title,
              openid: getApp().globalData.openid,
              kongj: that.data.kongj
            },
            success: function (res) {
              console.log(res)
            }
          })

          wx.reLaunch({
            url: '../../../index/index',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  savecaogao:function(){
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'publish/diary/edit_ok',
      header: {
        'content-type': 'application/json'
      },
      data: {
        id:that.data.id,
        huxing: that.data.huxing,
        mianji: that.data.mianji,
        yusuan: that.data.yusuan,
        chengshi: that.data.city,
        fileimg: that.data.filename,
        title: that.data.title,
        openid: getApp().globalData.openid,
        kongj: that.data.kongj
      },
      success: function (res) {
        if(res=1){
          wx.showToast({
            title: '保存到草稿箱',
            icon: 'none',
            duration: 1000
          })
        }
        
      }
    })
  },
  tokong:function(e){
    var that = this;
    var type = e.target.dataset.type;
    var kongarr;
    if(that.data.kongj[type]){
      kongarr = JSON.stringify(that.data.kongj[type])
      wx.navigateTo({
        url: '../kong/kong?type=' + type + '&kongarr=' + kongarr,
      })
    }else{
      wx.navigateTo({
        url: '../kong/kong?type=' + type
      })
    }
    
  },
  tabfeng:function(e){
    var eid = e.currentTarget.id;
    if(eid==1){
      this.setData({
        tfeng: true
      });
    }else{
      this.setData({
        tfeng:false
      });
    }
  },
  onShow: function () {
    var that = this;
    if (this.data.nowtitle) {
      var kong = this.data.kong;
      var nowktit = this.data.nowtitle;
      that.data.kongj[nowktit] = kong;
      that.setData({
        kongj: that.data.kongj
      })
    }
    console.log(that.data.kongj)
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      id:options.id
    })
    wx.request({
      url: getApp().globalData.host + 'publish/diary/caoedit',
      header: {
        'content-type': 'application/json'
      },
      data: {
        id:options.id
      },
      success: function (res) {
        console.log(res)
        that.setData({
          cao:res.data
        })
        if(res.data.cover_img){
          that.setData({
            photo: that.data.host+res.data.cover_img,
            filename: res.data.cover_img,
          })
        }
        if (res.data.title) {
          that.setData({
            title: res.data.title
          })
        }
        if (options.huxing) {
          that.setData({
            huxing: options.huxing
          })
        }else{
          if (res.data.house_type) {
            that.setData({
              huxing: res.data.house_type
            })
          }
        }
        
        if (options.mianji) {
          that.setData({
            mianji: options.mianji
          })
        }else{
          if (res.data.area) {
            that.setData({
              mianji: res.data.area
            })
          }
        }
        if (options.yusuan) {
          that.setData({
            yusuan: options.yusuan
          })
        }else{
          if (res.data.spend) {
            that.setData({
              yusuan: res.data.spend
            })
          }
        }
        
        if (res.data.site) {
          that.setData({
            city: res.data.site
          })
        }
        if (res.data.content) {
          that.setData({
            kongj: res.data.content
          })
        }
      }
    })
    

    
    
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

      //获取手指触摸的是哪一项

       var index = e.target.dataset.index;
       console.log(txtStyle)

       var list = this.data.kongjian;

       list[index].txtStyle = txtStyle;

       this.setData({
         kongjian: list
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
      var txtStyle='';

      //如果距离小于删除按钮的1/2，不显示删除按钮

      

        txtStyle= disX > delBtnWidth / 2 ? "transform: translateX(-50px)" : "transform: translateX(0px)";
        

      

      //获取手指触摸的是哪一项

       var index = e.target.dataset.index;
       console.log(txtStyle)

       var list = this.data.kongjian;

       list[index].txtStyle = txtStyle;

       this.setData({
         kongjian: list
       })

      // //更新列表的状态

      // this.setData({

      //   list:list

      // });

    }

  },
  delkongj:function(e) {
    var index = e.target.dataset.index;

    var list = this.data.kongjian;

    list.splice(index, 1)

    this.setData({
      kongjian: list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  choiceimage:function(){
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
          photo: tempFilePaths,
        })
        wx.uploadFile({
          url: that.data.host+'publish/diary/img_up', //仅为示例，非真实的接口地址
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
            console.log(that.data.filename)
          }
        })
      }
    })
  },
  tosavetitle:function(){
    wx.navigateTo({
      url: '../settitle/settitle',
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