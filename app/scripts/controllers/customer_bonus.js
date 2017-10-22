(function(){
'use strict';

/**
 * @ngdoc function
 * @name chopperApp.controller:CustomerBonusCtrl
 * @description
 * # CustomerBonusCtrl
 * Controller of the chopperApp
 */
angular.module('chopperApp')
  .controller('CustomerBonusCtrl', CustomerBonusCtrl);
  
  function CustomerBonusCtrl(bonusService) {
    var vm = this;
    vm.selectLineGroup = selectLineGroup;
    vm.selectBonusNum = selectBonusNum;
    vm.selectBonusRule = selectBonusRule;
    activate();
    
    function activate() {
      vm.lineGroup = {
        first: {
          index: "bonusNum",             
          option: {}
        }
      };
      vm.query = {};
      getSubsidy();
    }
    
    function selectLineGroup(group, index) {
      vm.lineGroup[group].index = index;
      vm.lineGroup[group].option = bonusService.getBonusLineOption(vm.bonusDetailData, index);
    }
    
    function getSubsidy() {
      return bonusService
        .getSubsidy()
        .then(function(res){
          vm.bonusNums = res.data || [];
          if (vm.bonusNums.length > 0) {
            vm.selectedBonusNum = vm.bonusNums[0];
            vm.query.subsidyId = vm.selectedBonusNum.id;
            getSubsidyDetail();
          }
        }, function(res){
          console.log(res);
        });
    }
    
    function getSubsidyDetail() {
      return bonusService
        .getSubsidyDetail(vm.query)
        .then(function(res){
          vm.bonusRules = res.data || [];
          if (vm.bonusRules.length > 0) {
            vm.selectedBonusRule = vm.bonusRules[0];
            vm.query.bonusName = vm.selectedBonusRule.description;
            getCustomerBonus();
          }
        }, function(res){
          console.log(res);
        });
    }
    
    function getCustomerBonus() {
      return bonusService
        .getCustomerBonus(vm.query)
        .then(function(res){
          vm.bonusDetailData = res.data || [];
          // if (vm.bonusDetailData.length > 0) {
            parseTotal(vm.bonusDetailData);
            vm.lineGroup.first.option = bonusService.getBonusLineOption(vm.bonusDetailData, vm.lineGroup.first.index);
          // }
        }, function(res){
          console.log(res);
        });
    }
    
    function selectBonusNum() {
      vm.query.subsidyId = vm.selectedBonusNum.id;
      getSubsidyDetail();
    }
    
    function selectBonusRule() {
      vm.query.bonusName = vm.selectedBonusRule.description;
      getCustomerBonus();
    }
    
    function parseTotal(d) {
      var ret = {
        bonusRecivedNumbers: 0,
        bonusRecivedAmount: 0,
        bonusUsedNumbers: 0,
        bonusUsedAmount: 0,
        newCustomerReceviedNumbers: 0,
        newCustomerUsedNumbers: 0,
        bonusQualifiedSharedTimes: 0,
        bonusSharedTimes: 0,
        customerReceviedNumbers: 0,
        customerUsedNumbers: 0,
      };
      for (var i = 0, len = d.length; i < len; i++) {
        var item = d[i];
        ret.bonusRecivedNumbers += item.bonusRecivedNumbers;
        ret.bonusRecivedAmount += item.bonusRecivedAmount;
        ret.bonusUsedNumbers += item.bonusUsedNumbers;
        ret.bonusUsedAmount += item.bonusUsedAmount;
        ret.newCustomerReceviedNumbers += item.newCustomerReceviedNumbers;
        ret.newCustomerUsedNumbers += item.newCustomerUsedNumbers;
        ret.bonusQualifiedSharedTimes += item.bonusQualifiedSharedTimes;
        ret.bonusSharedTimes += item.bonusSharedTimes;
        ret.customerReceviedNumbers += item.customerReceviedNumbers;
        ret.customerUsedNumbers += item.customerUsedNumbers;
      }
      // vm.totalData = ret;
      vm.rectData = [
        //标题、数额、同比隐藏、环比隐藏
        { thead: '已发放红包数', num: ret.bonusRecivedNumbers, tbHide: true, hbHide: true },
        { thead: '已发放红包金额', num: ret.bonusRecivedAmount.toFixed(2), tbHide: true, hbHide: true },
        { thead: '已使用红包数', num: ret.bonusUsedNumbers, tbHide: true, hbHide: true },
        { thead: '已使用红包金额', num: ret.bonusUsedAmount.toFixed(2), tbHide: true, hbHide: true },
        { thead: '新用户领取数', num: ret.newCustomerReceviedNumbers, tbHide: true, hbHide: true },
        { thead: '新用户使用数', num: ret.newCustomerUsedNumbers, tbHide: true, hbHide: true },
        { thead: '可分享次数', num: ret.bonusQualifiedSharedTimes, tbHide: true, hbHide: true },
        { thead: '已分享次数', num: ret.bonusSharedTimes, tbHide: true, hbHide: true },
        { thead: '领取人数', num: ret.customerReceviedNumbers, tbHide: true, hbHide: true },
        { thead: '使用人数', num: ret.customerUsedNumbers, tbHide: true, hbHide: true },
      ];
    }
    
  }
  
})();