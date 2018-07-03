//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    showfabu: false,
    animationfabu: {},
    anli:[],
    host: getApp().globalData.host,
    tui:'active',
    xian:'',
    bei:'',
    mei:'',
    ri:'',
    zhong:''
  },
  showfabu: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 400,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(500).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationfabu: animation.export(),
      // 改变view里面的Wx：if
      showfabu: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationfabu: animation.export()
      })
    }, 200)
  },
  hidefabu: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(500).step()
    that.setData({
      animationfabu: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationfabu: animation.export(),
        showfabu: false
      })
    }, 200)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  choiceanli:function(e){
    var biaoqian = e.target.dataset.choic;
    var that = this;
    if(biaoqian=='推荐'){
      that.setData({
        tui: 'active',
        xian: '',
        bei: '',
        mei: '',
        ri: '',
        zhong: ''
      })
    } else if (biaoqian == '现代'){
      that.setData({
        tui: '',
        xian: 'active',
        bei: '',
        mei: '',
        ri: '',
        zhong: ''
      })
    } else if (biaoqian == '北欧') {
      that.setData({
        tui: '',
        xian: '',
        bei: 'active',
        mei: '',
        ri: '',
        zhong: ''
      })
    } else if (biaoqian == '美式') {
      that.setData({
        tui: '',
        xian: '',
        bei: '',
        mei: 'active',
        ri: '',
        zhong: ''
      })
    } else if (biaoqian == '日式') {
      that.setData({
        tui: '',
        xian: '',
        bei: '',
        mei: '',
        ri: 'active',
        zhong: ''
      })
    } else{
      that.setData({
        tui: '',
        xian: '',
        bei: '',
        mei: '',
        ri: '',
        zhong: 'active'
      })
    }
    wx.request({
      url: getApp().globalData.host + 'publish/index/cover_index', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        biaoqian: biaoqian
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          anli: res.data
        })
      }
    })
  },
  toFilter:function(){
    wx.navigateTo({
      url: '../filter/filter'
    })
  },
  tohu: function () {
    wx.navigateTo({
      url: '../fabu/huxing/huxing'
    })
  },
  totest: function () {
    wx.navigateTo({
      url: '../tellus/pickerTest/pickerTest'
    })
  },
  toSearch:function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  toUsercenter:function(){
    wx.redirectTo({
      url:'../user/usercenter/usercenter'
    })
  },
  topicker:function(){
    wx.redirectTo({
      url:'../tellus/telusindex/telusindex'
    })
  },
  tocasein: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../case/casein/casein?id=' + id
    })
  },
  toexperience: function () {
    wx.navigateTo({
      url: '../experience/experienceindex/experienceindex'
    })
  },
  tocaselist: function () {
    wx.navigateTo({
      url: '../case/caselist/caselist'
    })
  },
  todecoratelist: function () {
    wx.navigateTo({
      url: '../decorate/decoratelist/decoratelist'
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.host+'publish/index/cover_index', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          anli: res.data
        })
      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})





