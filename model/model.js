// model.js
var area = require('../utils/area.js')

var areaInfo = [];//所有省市区县数据

var provinces = [];//省

var citys = [];//城市

var countys = [];//区县

var value = [0,0,0];//数据位置下标

var info = {};

// 户型选择
var shi = ['1室', '2室', '3室','4室'];
var ting = ['1厅', '2厅', '3厅','4厅'];
var chu = ['1厨', '2厨', '3厨','4厨'];
var wei = ['1卫', '2卫', '3卫','4卫'];

// 房屋现状
var fang = ['毛坯房','精装房','二手房']

// 常住人口
var cheng = ['0成人', '1成人', '2成人', '3成人'];
var lao = ['0老人', '1老人', '2老人', '3老人'];
var er = ['0儿童', '1儿童', '2儿童', '3儿童'];

function updateAreaData( that, status, e){
    //获取省份数据
    var getProvinceData = function (){
      var s;
      provinces = [];
      var num = 0;
      for (var i = 0; i < areaInfo.length; i++) {
        s = areaInfo[i];
        if (s.di == "00" && s.xian == "00") {
          provinces[num] = s;
          num++;
        }
      }

      //初始化调一次
      //获取地级市数据
      getCityArr();
      //获取区县数据
      getCountyInfo();

      //模型赋值
      info = {
        item: {
          shi: shi,
          ting: ting,
          chu: chu,
          wei: wei,
          provinces: provinces,
          citys: citys,
          countys: countys,
          value: value
        }
      }

      animationEvents(that, 200, false, 0);
    }

    // 获取地级市数据
    var getCityArr = function (count = 0) {
      var c;
      citys = [];
      var num = 0;
      for (var i = 0; i < areaInfo.length; i++) {
        c = areaInfo[i];
        if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
          citys[num] = c;
          num++;
        }
      }
      if (citys.length == 0) {
        citys[0] = { name: '' };
      }
    }

    // 获取区县数据
    var getCountyInfo = function (column0 = 0, column1 = 0) {
      var c;
      countys = [];
      var num = 0;
      for (var i = 0; i < areaInfo.length; i++) {
        c = areaInfo[i];
        if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
          countys[num] = c;
          num++;
        }
      }
      if (countys.length == 0) {
        countys[0] = { name: '' };
      }
      value = [column0, column1, 0];
    }
    
    //滑动事件
    var valueChange = function(e,that){
      var val = e.detail.value
       console.log(e)
      //判断滑动的是第几个column
      //若省份column做了滑动则定位到地级市和区县第一位
      if (value[0] != val[0]) {
        val[1] = 0;
        val[2] = 0;
        getCityArr(val[0]);//获取地级市数据
        getCountyInfo(val[0], val[1]);//获取区县数据
      } else {    //若省份column未做滑动，地级市做了滑动则定位区县第一位
        if (value[1] != val[1]) {
          val[2] = 0;
          getCountyInfo(val[0], val[1]);//获取区县数据
        }
      }
      value = val;

      assignmentData(that, that.data.item.show)

      console.log(val);
      
      //回调
      //callBack(val);

    }
   
    if (status == 0){
      area.getAreaInfo(function (arr) {
        areaInfo = arr;
        //获取省份数据
        getProvinceData();

      });  
    }
    //滑动事件
    else{
      valueChange(e,that);
    }
    
}

function updatehomeData( that, status, e){ 
  var gethomeData = function () {
    //模型赋值
    info = {
      item: {
        shi: shi,
        ting: ting,
        chu: chu,
        wei: wei,
        provinces: provinces,
        citys: citys,
        countys: countys,
        value: value
      }
    }
    animationEvents01(that, 200, false, 0);
  }
    //滑动事件
    var valueChange01 = function(e,that){
      var val = e.detail.value
       console.log(val,e)
       value = val;

      assignmentData01(that, that.data.item.show01)

    }
    if (status == 0){
      area.getAreaInfo(function (arr) {
        areaInfo = arr;
        gethomeData();

      });  
    }
    else{
      valueChange01(e,that);
    }
}

function updatenowData(that, status, e) {
  var getnowData = function () {
    //模型赋值
    info = {
      item: {
        fang: fang,
        value: value
      }
    }
    animationEvents02(that, 200, false, 0);
  }
  //滑动事件
  var valueChange02 = function (e, that) {
    var val = e.detail.value
    console.log(val, e)
    value = val;
    console.log(value)

    assignmentData02(that, that.data.item.show01)

  }
  if (status == 0) {
    area.getAreaInfo(function (arr) {
      areaInfo = arr;
      getnowData();

    });
  }
  else {
    valueChange02(e, that);
  }
}

function updatepeopleData(that, status, e) {
  var getpeopleData = function () {
    //模型赋值
    info = {
      item: {
        cheng: cheng,
        lao:lao,
        er:er,
        value: value
      }
    }
    animationEvents03(that, 200, false, 0);
  }
  //滑动事件
  var valueChange03 = function (e, that) {
    var val = e.detail.value
    console.log(val, e)
    value = val;

    assignmentData03(that, that.data.item.show)

  }
  if (status == 0) {
    area.getAreaInfo(function (arr) {
      areaInfo = arr;
      getpeopleData();

    });
  }
  else {
    valueChange03(e, that);
  }
}

//动画事件
function animationEvents(that, moveY, show, duration) {
  console.log("moveY:" + moveY + "\nshow:" + show);
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: duration,
    timingFunction: "ease",
    delay: 0
  })
  that.animation.translateY(moveY + 'vh').step()
  //赋值
  assignmentData(that,show)

}

//动画事件
function animationEvents01(that, moveY, show01, duration) {
  console.log("moveY:" + moveY + "\nshow:" + show01);
  that.animation01 = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: duration,
    timingFunction: "ease",
    delay: 0
  })
  that.animation01.translateY(moveY + 'vh').step()
  //赋值
  assignmentData01(that, show01)
}

//动画事件
function animationEvents02(that, moveY, show, duration) {
  console.log("moveY:" + moveY + "\nshow:" + show);
  that.animation02 = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: duration,
    timingFunction: "ease",
    delay: 0
  })
  that.animation02.translateY(moveY + 'vh').step()
  //赋值
  assignmentData02(that, show)
}

function animationEvents03(that, moveY, show, duration) {
  console.log("moveY:" + moveY + "\nshow:" + show);
  that.animation03 = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: duration,
    timingFunction: "ease",
    delay: 0
  })
  that.animation03.translateY(moveY + 'vh').step()
  //赋值
  assignmentData03(that, show)
}

//赋值
function assignmentData(that, show) {
  that.setData({
    item: {
      animation: that.animation.export(),
      show: show,
      shi: shi,
      ting: ting,
      chu: chu,
      wei: wei,
      provinces: provinces,
      citys: citys,
      countys: countys,
      value: value
    }
  })
}

function assignmentData01(that, show01) {
  that.setData({
    item: {
      animation01: that.animation01.export(),
      show01: show01,
      shi: shi,
      ting: ting,
      chu: chu,
      wei: wei,
      provinces: provinces,
      citys: citys,
      countys: countys,
      value: value
    }
  })
}
function assignmentData02(that, show) {
  that.setData({
    item: {
      animation02: that.animation02.export(),
      show: show,
      fang:fang,
      value: value
    }
  })
}
function assignmentData03(that, show) {
  that.setData({
    item: {
      animation03: that.animation03.export(),
      show: show,
      cheng: cheng,
      lao: lao,
      er: er,
      value: value
    }
  })
}

module.exports = {
  updateAreaData: updateAreaData,
  animationEvents: animationEvents,
  updatehomeData: updatehomeData,
  animationEvents01: animationEvents01,
  updatenowData: updatenowData,
  animationEvents02: animationEvents02,
  updatepeopleData: updatepeopleData,
  animationEvents03: animationEvents03
}
