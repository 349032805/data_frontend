(function(){
'use strict';

/**
 * @ngdoc function
 * @name chopperApp.controller:RealtimeTrendCtrl
 * @description
 * # RealtimeTrendCtrl
 * Controller of the chopperApp
 */
angular.module('chopperApp')
  .controller('RealtimeTrendCtrl', RealtimeTrendCtrl);
  
  function RealtimeTrendCtrl(realtimeService, dateService, $interval, $scope) {
    var vm = this;
    vm.selectLineGroup = selectLineGroup;
    vm.stopLineAutoRefrash = stopLineAutoRefrash;
    activate();
    
    function activate() {
      vm.lineGroup = {
        index: "salesVolume",
        option: {}
      }
      vm.today = dateService.toString(new Date());
      vm.lineAutoRefrash = true;
      getRealTimeAllUntilNow();
      autoRefrash();
    }
    
    function selectLineGroup(index) {
      vm.lineGroup.index = index;
      vm.lineGroup.option = realtimeService.getRealTimeLineOption(vm.untilNowDatas, index);
    }
    
    function getRealTimeAllUntilNow() {
      var today = dateService.toString(new Date());
      return realtimeService
        .getRealTimeAllUntilNow({date:today})
        .then(function (res) {
          vm.untilNowDatas = res;
          vm.lineGroup.option = realtimeService.getRealTimeLineOption(vm.untilNowDatas, vm.lineGroup.index);
          parseRectData(vm.untilNowDatas[vm.untilNowDatas.length - 1]);
        });
    }
    
    function getRealTimePerSecond() {
      return realtimeService
        .getRealTimePerSecond()
        .then(function (res) {
          vm.perMinuteDatas = res || [];
          if (vm.perMinuteDatas.length > 0) {
            vm.untilNowDatas.push(vm.perMinuteDatas[0]);
            vm.lineGroup.option = realtimeService.getRealTimeLineOption(vm.untilNowDatas, vm.lineGroup.index);
            parseRectData(vm.perMinuteDatas[0]);
          }
        });
    }
    
    function autoRefrash() {
      newLineTimer();
    }
    
    function newLineTimer() {
      vm.lineTimer = $interval(function () {
        getRealTimePerSecond();
      }, 5000);    // 5秒刷新
    }
    
    function stopLineAutoRefrash() {
      vm.lineAutoRefrash = !vm.lineAutoRefrash;
      if (vm.lineAutoRefrash) {
        getRealTimeAllUntilNow();
        newLineTimer();
      } else {
        stopLineTimer();
      }
    }
    
    function stopLineTimer() {
      $interval.cancel(vm.lineTimer);
      vm.lineTimer = undefined;
    }
    
    $scope.$on('$destroy', function () {
      stopLineTimer();
    });
    
    function parseRectData(item) {
      vm.rectData = [
        //标题、数额
        { thead: '用户订单数', num: item.sumSalesVulume, tbHide: true, hbHide: true },
        { thead: '用户订单金额', num: item.sumSales.toFixed(2), tbHide: true, hbHide: true }
      ];
    }
  }
})();