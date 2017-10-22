(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:BaseNightCatCtrl
   * @description
   * # BaseNightCatCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('BaseNightCatCtrl', BaseNightCatCtrl);

  function BaseNightCatCtrl(basicService, districtVisitor, dateService, csvDataService) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.loadRoot = loadRoot;
    vm.loadNextLevel = loadNextLevel;
    vm.setCurrentLevel = setCurrentLevel;
    vm.reloadCurrentLevel = reloadCurrentLevel;
    vm.exportCsv = exportCsv;
    activate();

    function activate() {
      vm.datepicker = {
        start: {
          open: false,
          model: new Date(),//dateService.getDaysFromNow(-1),
        },
        end: {
          open: false,
          model: new Date(),//dateService.getDaysFromNow(-1),
        },
      };
      
      vm.query = {
        start: dateService.toString(vm.datepicker.start.model),
        end: dateService.toString(vm.datepicker.end.model),
      };
      
      vm.now = new Date();
      // vm.csvHeader = ["区域","日期","夜猫店数","营业夜猫店数","平均营业时长","订单平均响应","店长数店长留存率","店长线下订单金额","店长线下订单量"];
      vm.csvHeader = ["区域","日期","夜猫店数","营业夜猫店数"];
      vm.dv = new districtVisitor(basicService.getnNightCatStore);
      loadRoot();
    }

    function openDatepicker(index) {
      vm.datepicker[index].open = true;
    }

    function selectStart() {
      if (vm.datepicker.start.model > vm.datepicker.end.model) {
        vm.datepicker.end.model = vm.datepicker.start.model;
      }
      updateQueryDate();
      reloadCurrentLevel(vm.query);
    }
    
    function selectEnd() {
      updateQueryDate();
      reloadCurrentLevel(vm.query);
    }

    function updateQueryDate() {
      vm.query.start = dateService.toString(vm.datepicker.start.model);
      vm.query.end = dateService.toString(vm.datepicker.end.model);
    }
    
    function setCurrentLevel(level,district) {
      vm.query.districtId = district.districtId;
      vm.dv.setCurrentLevel(level);
    }

    function reloadCurrentLevel(query) {
      vm.dv.reloadCurrentLevel(query);
    }

    function loadRoot() {
      vm.dv.loadRoot(vm.query);
    }
    
    function loadNextLevel(district) {
      vm.query.districtId = district.id;
      vm.dv.loadNextLevel(vm.query, district);
    }
    
    function exportCsv() {
      return csvDataService.getBaseNightCatCsvData(vm.dv.getCurrentLevel().districts);
    }
    
  }

})();