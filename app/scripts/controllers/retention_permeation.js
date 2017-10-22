(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:RetentionPermeationCtrl
   * @description
   * # RetentionPermeationCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('RetentionPermeationCtrl', RetentionPermeationCtrl);

  function RetentionPermeationCtrl(retentionService, areaService, dateService, NgTableParams, authService, dataService, notifyService) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.onSearch = onSearch;
    vm.selectLineGroup = selectLineGroup;
    vm.selectZones = areaService.selectZones;
    vm.selectCitys = areaService.selectCitys;
    vm.selectAreas = areaService.selectAreas;
    vm.exportPermeationCsv = exportPermeationCsv;
    vm.exportSectionNumbers = exportSectionNumbers;
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
        }
      }

      vm.query = {
        start: dateService.toString(vm.datepicker.start.model),
        end: dateService.toString(vm.datepicker.end.model),
        page: 1,
        perPage: 10,
      };
      // vm.now = new Date();
      vm.yesterday = dateService.getDaysFromNow(-1);

      areaService.initAreas(vm);

      vm.lineGroup = {
        index: "rate",
        option: {}
      };
      vm.firstTable = {};
      vm.permeationCsvHeader = ['日期', '大区', '城市', '区域', '学校', '楼栋', '人数', '用户数', '渗透率', '商店数', '活跃商店数', '活跃店铺率'];
      
      onSearch();
    };

    function openDatepicker(index) {
      vm.datepicker[index].open = true;
    }

    function selectStart() {
      vm.datepicker.end.model = vm.datepicker.start.model;
      updateQueryDate();
    }

    function selectEnd() {
      updateQueryDate();
    }

    function updateQueryDate() {
      vm.query.start = dateService.toString(vm.datepicker.start.model);
      vm.query.end = dateService.toString(vm.datepicker.end.model);
    }

    function onSearch() {
      getPermeationRate();
      // getPermeationData();
      initTable();
    }

    function getPermeationRate() {
      return retentionService
        .getPermeationRate(vm.query)
        .then(function (res) {
          vm.lineData = res;
          if (vm.lineData.length === 0) {
            notifyService.success("没有数据");
            vm.lineGroup.option = {};
          } else {
            vm.lineGroup.option = retentionService.getRateLineOption(vm.lineData, vm.lineGroup.index);
          }
        })
    }

    function getPermeationData($defer, params) {
      var sorting = params.sorting();
      var count = params.count();
      var page = params.page();

      var val = "";
      for (var key in sorting) {
        val = key;
      }
      vm.query.orderColumn = getOrderColumn(val);
      vm.query.orderDesc = sorting[val] === 'desc' ? 1 : 0;
      vm.query.page = page;
      vm.query.perPage = count;

      retentionService
        .getPermeationData(vm.query)
        .then(function (res) {
          vm.tableData = res;
          params.total(vm.tableData.count);
          $defer.resolve(vm.tableData.list || []);
        });
    }

    function initTable() {
      vm.tableParams = new NgTableParams({
        page: vm.query.page, // show first page
        count: vm.query.perPage, // count per page
        sorting: { 'rate': "desc" }
      }, {
          getData: getPermeationData
        });
    }
    
    function getOrderColumn(val) {
      return val === 'studentNumber' ? 0
        : val === 'phoneCount' ? 1
          : val === 'rate' ? 2
            : val === 'storeNumbers' ? 3
              : val === 'activeStoreNumbers' ? 4
              : val === 'storeRate' ? 5
              : 0;
    }
    
    function selectLineGroup(index) {
      vm.lineGroup.index = index;
      vm.lineGroup.option = retentionService.getRateLineOption(vm.lineData, index);
    }
    
    function exportPermeationCsv() {
      return vm.permeationData.map(function (item) {
        return {
          dt: item.dt,
          zoneName: item.zoneName,
          cityName: item.cityName,
          regionName: item.regionName,
          sectionName: item.sectionName,
          buildingName: item.buildingName,
          studentNumber: item.studentNumber,
          phoneCount: item.phoneCount,
          rate: item.rate,
          storeNumbers: item.storeNumbers,
          activeStoreNumbers: item.activeStoreNumbers,
          storeRate: item.storeRate
        }
      })
    }
    
    function exportSectionNumbers() {
      var url = dataService.baseUrl + "/sectionNumberInfo/exportSectionNumbers?token=" + authService.getAccessToken() + getQueryStr(); 
      window.open(url);
    }
    
    function getQueryStr() {
      var ret = "";
      for(var key in vm.query) {
        ret += "&" + key + "=" + vm.query[key];
      }
      return ret;
    }
  }
})();