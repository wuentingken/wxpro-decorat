var model = require('../../../model/model.js')

var show = false;
var show01 = false;
var item = {};

Page({
  data: {
    item: {
      show: show,
      show01:show01
    },
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
    model.updatehomeData(that, 0, e);
    model.updatenowData(that, 0, e);
    model.updatepeopleData(that, 0, e);
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  translate01: function (e) {
    model.animationEvents01(this, 0, true, 400);
  },
  translate02: function (e) {
    model.animationEvents02(this, 0, true, 400);
  },
  translate03: function (e) {
    model.animationEvents03(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },
  hiddenFloatView01: function (e) {
    model.animationEvents01(this, 200, false, 400);
  },
  hiddenFloatView02: function (e) {
    model.animationEvents02(this, 200, false, 400);
  },
  hiddenFloatView03: function (e) {
    model.animationEvents03(this, 200, false, 400);
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
  bindChange01: function (e) {
    model.updatehomeData(this, 1, e);
    item = this.data.item;
    this.setData({
      shi: item.shi[item.value[0]],
      ting: item.ting[item.value[1]],
      chu: item.chu[item.value[2]],
      wei: item.wei[item.value[3]],
    });
  },
  bindChange02: function (e) {
    model.updatenowData(this, 1, e);
    item = this.data.item;
    this.setData({
      fang: item.fang[item.value[0]],
    });
  },
  bindChange03: function (e) {
    model.updatepeopleData(this, 1, e);
    item = this.data.item;
    this.setData({
      cheng: item.cheng[item.value[0]],
      lao: item.lao[item.value[0]],
      re: item.er[item.value[0]],
    });
  },
  bindDateChange:function(e){
    this.setData({
      date: e.detail.value
    });
  },
  bindDateChangend: function (e) {
    this.setData({
      datend: e.detail.value
    });
  },
  tobeizhu:function(){
    wx.navigateTo({
      url: '../beizhu/beizhu',
    })
  },
  onReachBottom: function () {
  },
  nono: function () { }
})