//app.js
App({
  globalData: {
    host: 'http://cdbbox.com/',
    nickName:'',
    avatarUrl:'',
    openid:'',
  },
  
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    wx.showShareMenu();
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
       
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.nickName=res.userInfo.nickName;
              that.globalData.avatarUrl = res.userInfo.avatarUrl;
            },
          })
          if (res.code) {
          //       //发起网络请求
                 wx.request({
                  url: getApp().globalData.host + "index/login/index",
                  data: {
                    code: res.code
                  },
                  success: function (e) {
                    that.globalData.openid = e.data.openid;
                    wx.request({
                      url: getApp().globalData.host + "index/login/openid",
                      data: {
                        openid: e.data.openid,
                        nickName: getApp().globalData.nickName,
                        avatarUrl: getApp().globalData.avatarUrl
                      },
                      success: function (op) {
                        if(op == 0){
                          alert('登录失败！');
                        }
                      }
                    })
                  }
                })
          } else {
            alert('登录失败！' + res.errMsg)
          }
          // wx.getUserInfo({
          //   success: function (res) {
          //     console.log(res);
          //     that.globalData.userInfo = res.userInfo
          //     typeof cb == "function" && cb(that.globalData.userInfo)
          //   }
          // })
        }
      })
    }
  },
})