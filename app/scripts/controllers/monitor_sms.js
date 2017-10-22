(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:MonitorSmsCtrl
   * @description
   * # MonitorSmsCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('MonitorSmsCtrl', MonitorSmsCtrl);
  function MonitorSmsCtrl(monitorService, dateService, NgTableParams, areaService, notifyService) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.selectLineGroup = selectLineGroup;
    vm.onSearch = onSearch;
    vm.selectZones = areaService.selectZones;
    vm.selectCitys = areaService.selectCitys;
    vm.selectAreas = areaService.selectAreas;
    vm.selectSmsType = selectSmsType;
    vm.exportSmsCsv = exportSmsCsv;
    activate();

    function activate() {
      vm.datepicker = {
        start: {
          open: false,
          model: dateService.getDaysFromNow(-7),
        },
        end: {
          open: false,
          model: dateService.getDaysFromNow(-1),
        },
      };

      vm.query = {
        start: dateService.toString(vm.datepicker.start.model),
        end: dateService.toString(vm.datepicker.end.model),
        smsType: 0   //短信告知用户 
      };
      vm.yesterday = dateService.getDaysFromNow(-1);
      vm.sms = {
        types: [
          { name: "短信告知用户", type: 0 },
          { name: "电话通知店长", type: 1 },
          { name: "短信通知经理", type: 2 },
          { name: "用户验证码", type: 3 },
          { name: "用户提醒", type: 4 }
        ],
        selectedType: { name: "短信告知用户", type: 0 },
        header: ["日期", "大区", "城市", "区域", "学校", "夜猫店", "通知类型", "通知次数", "通知成本"]
      };
      vm.lineGroup = {
        first: {
          index: "sumNotifyTimes",
          option: {}
        }
      };

      areaService.initAreas(vm);
      onSearch();
    }

    function openDatepicker(index) {
      vm.datepicker[index].open = true;
    }

    function selectStart() {
      // if (vm.datepicker.start.model > vm.datepicker.end.model) {
      vm.datepicker.end.model = vm.datepicker.start.model;
      // }
      updateQueryDate();
    }

    function selectEnd() {
      updateQueryDate();
    }

    function updateQueryDate() {
      vm.query.start = dateService.toString(vm.datepicker.start.model);
      vm.query.end = dateService.toString(vm.datepicker.end.model);
    }

    function selectLineGroup(group, index) {
      vm.lineGroup[group].index = index;
      vm.lineGroup[group].option = monitorService.getSmsLineOption(vm.smsNotifyData, index);
    }
    
    function selectSmsType() {
      vm.query.smsType = vm.sms.selectedType.type;
    }

    function onSearch() {
      getSmsNotify();
      getSmsNotifyAll();
    }

    function getSmsNotify() {
      return monitorService
        .getSmsNotify(vm.query)
        .then(function (res) {
          vm.smsNotifyData = res || [];
          if(vm.smsNotifyData.length === 0) {
            notifyService.success("没有数据");
            vm.lineGroup.first.option = {};
          } else {
            vm.lineGroup.first.option = monitorService.getSmsLineOption(vm.smsNotifyData, vm.lineGroup.first.index);
          }
        })
    }
    
    function getSmsNotifyAll() {
      return monitorService
        .getSmsNotifyAll(vm.query)
        .then(function(res){
          vm.smsNotifyAll = res || [];
          initTable("sms", vm.smsNotifyAll, { 'notifyTimes': "desc" });
        })
    }

    function initTable(index, dataArr, sorting) {
      vm[index].tableParams = new NgTableParams({
        page: 1, // show first page
        count: 10, // count per page
        sorting: sorting
      }, {
          dataset: dataArr
        });
    }
    
    function exportSmsCsv() {
      return vm.smsNotifyAll.map(function(item){
        return {
          dt: item.dt,
          zoneName: item.zoneName,
          cityName: item.cityName,
          regionName: item.regionName,
          sectionName: item.sectionName,
          storeName: item.storeName,
          type: vm.sms.selectedType.name,
          notifyTimes: item.notifyTimes,
          expenses: item.expenses
        }
      })
    }
    
    function getSmsTypeName(index) {
      return vm.sms.types[index].name;
    }

  }
})();