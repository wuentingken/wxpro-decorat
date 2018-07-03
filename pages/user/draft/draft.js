// pages/user/draft/draft.js
Page({
  data:{
    txtStyle:'',
    caogaolist:'',
    host: getApp().globalData.host,
    show:true,
    },
  todraftin:function(e){
    var id = e.target.id;
    wx.navigateTo({
      url: '../draftin/photo/photo?id='+id,
    })
  },
  delthis:function(){
    this.setData({
      show:false
    })
  },
  touchS:function(e){

    if(e.touches.length==1){

      this.setData({

        //设置触摸起始点水平方向位置

        startX:e.touches[0].clientX

      });

    }

  },

  touchM:function(e){

    if(e.touches.length==1){

      //手指移动时水平方向位置

      var moveX = e.touches[0].clientX;

      //手指起始点位置与移动期间的差值

      var disX = this.data.startX - moveX;

      var delBtnWidth = 100;

      var txtStyle = "";

      if(disX == 0 || disX < 0){//如果移动距离小于等于0，文本层位置不变


      

        txtStyle = "transform: translateX(0px)";

      

      }else if(disX > 0 ){//移动距离大于0，文本层left值等于手指移动距离

        if(disX>=delBtnWidth){

          //控制手指移动距离最大值为删除按钮的宽度

          

            txtStyle = "transform: translateX(-100px)";

          

        }else{
          

              txtStyle = "transform: translateX(-"+disX+"px)";

            
        }
        

        

      }

      //获取手指触摸的是哪一项

      var index = e.currentTarget.dataset.index;
       console.log(e)

       var list = this.data.caogaolist;

       list[index].txtstyle = txtStyle;
      this.setData({
        caogaolist: list
      })


      // //更新列表的状态

      // this.setData({

      //   list:list

      // });

    }

  },

 

  touchE:function(e){

    if(e.changedTouches.length==1){

      //手指移动结束后水平位置

      var endX = e.changedTouches[0].clientX;

      //触摸开始与结束，手指移动的距离

      var disX = this.data.startX - endX;

      var delBtnWidth = 100;
      var txtStyle = "";

      //如果距离小于删除按钮的1/2，不显示删除按钮

      

          txtStyle = disX > delBtnWidth/2 ? "transform: translateX(-100px)":"transform: translateX(0px)";

          var index = e.currentTarget.dataset.index;


          var list = this.data.caogaolist;

          list[index].txtstyle = txtStyle;
          this.setData({
            caogaolist: list
          })

      //获取手指触摸的是哪一项

      // var index = e.target.dataset.index;

      // var list = this.data.list;

      // list[index].txtStyle = txtStyle;

      // //更新列表的状态

      // this.setData({

      //   list:list

      // });

    }

  },
  delcao:function(e){
    var index = e.target.dataset.index;

    var list = this.data.caogaolist;

    list.splice(index, 1)

    this.setData({
      caogaolist: list
    })
  },
  onLoad:function(options){
    var that=this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: getApp().globalData.host + 'publish/index/caogao_list', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openid: getApp().globalData.openid
      },
      success: function (res) {
        console.log(res)
        that.setData({
          caogaolist:res.data
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})