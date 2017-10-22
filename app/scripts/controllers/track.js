(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:TrackCtrl
   * @description
   * # TrackCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('TrackCtrl', TrackCtrl);

  function TrackCtrl(trackService, notifyService, NgTableParams, dateService, dataService, authService) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectForce = selectForce;
    vm.selectUserType = selectUserType;
    vm.selectPlatform = selectPlatform;
    vm.exportStore = exportStore;
    vm.exportTrackCsvData = exportTrackCsvData;
    activate();

    function activate() {
      vm.datepicker = {
        start: {
          open: false,
          model: dateService.getDaysFromNow(-1),
        }
      };
      vm.yesterday = dateService.getDaysFromNow(-1);
      vm.query = {
        date: dateService.toString(vm.datepicker.start.model)
      };
      vm.force = {
        index: "pv",
        userType: "new_user",
        platform: "",
        option: {}
      }
      onSearch();
      
      vm.csvHeader = ["日期", "渠道", "用户类型", "订单量", "购买人数", "总浏览页面数", "总浏览人数", "平均访问页面数", "转化率", "新用户数",
                      "选择城市pv", "选择城市uv", "选择学校pv", "选择学校uv", "选择楼栋pv", "选择楼栋uv", "选择商店pv", "选择商店uv",
                      "商品列表pv", "商品列表uv", "加入购物车pv", "加入购物车uv", "确认订单页pv", "确认订单页uv"];
    }

    function openDatepicker(index) {
      vm.datepicker[index].open = true;
    }

    function selectStart() {
      vm.query.date = dateService.toString(vm.datepicker.start.model);
      onSearch();
    }
    
    function onSearch() {
      getPvuv();
      getExportDailyTrack();
    }
    
    function selectForce(index) {
      if (vm.force.index !== index) {
        vm.force.index = index;
        vm.force.option = trackService.getForceOption(vm.pvuvDatas, vm.force);
      }
    }
    
    function selectUserType(userType) {
      if (vm.force.userType !== userType) {
        vm.force.userType = userType;
        vm.force.option = trackService.getForceOption(vm.pvuvDatas, vm.force);
      }
    }
    
    function selectPlatform() {
      // if (vm.force.platform !== platform) {
      //   vm.force.platform = platform;
        vm.force.option = trackService.getForceOption(vm.pvuvDatas, vm.force);
      // }
    }

    function exportStore() {
      var url = dataService.baseUrl + "/export/dailyStoreAnalysis?token=" + authService.getAccessToken() + "&date=" + dateService.toString(vm.datepicker.start.model);
      // var url = dataService.baseUrl + "/dailyStoreTrackReport/getAllData?token=" + authService.getAccessToken() + "&date=" + dateService.toString(vm.datepicker.start.model);
      window.open(url);
    }
    
    function getPvuv() {
      return trackService.getPvuv(vm.query).then(function (res) {
        vm.pvuvDatas = res || [];
        filterPlatform(vm.pvuvDatas);
        vm.force.option = trackService.getForceOption(vm.pvuvDatas, vm.force);
      })
    }
    
    function filterPlatform(pvuvDatas) {
      var platforms = [];
      for(var i = 0, len = pvuvDatas.length; i < len; i++) {
        var item = pvuvDatas[i];
        platforms.indexOf(item.source) < 0 ? platforms.push(item.source) : null;
      }
      vm.platforms = platforms;
      vm.force.platform = platforms[0];
    }
    
    function getExportDailyTrack() {
      return trackService.getExportDailyTrack(vm.query).then(function (res) {
        vm.dailyTrackDatas = res || [];
      });
    }
    
    function exportTrackCsvData() {
      return vm.dailyTrackDatas.map(function (item) {
        return {
          day: item.day,
          source: item.source,
          userType: item.userType,
          orderNums: item.orderNums,
          buyerNums: item.buyerNums,
          totalPages: item.totalPages,
          totalViewers: item.totalViewers,
          averageUserView: item.averageUserView,
          
          convRate: item.convRate,
          newUser: item.newUser,
          selectCityPv: item.selectCityPv,
          selectCityUv: item.selectCityUv,
          selectSectionPv: item.selectSectionPv,
          selectSectionUv: item.selectSectionUv,
          selectBuildingPv: item.selectBuildingPv,
          selectBuildingUv: item.selectBuildingUv,
          
          selectStorePv: item.selectStorePv,
          selectStoreUv: item.selectStoreUv,
          storeDetailsPv: item.storeDetailsPv,
          storeDetailsUv: item.storeDetailsUv,
          cartPv: item.cartPv,
          cartUv: item.cartUv,
          orderPv: item.orderPv,
          orderUv: item.orderUv
        }
      });
    }
    
  }
})();