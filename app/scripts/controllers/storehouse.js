(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:StorehouseCtrl
   * @description
   * # StorehouseCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('StorehouseCtrl', StorehouseCtrl);

  function StorehouseCtrl(storehouseService,dateService,dataService,NgTableParams) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.onSearch = onSearch;
    vm.view = view;
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
        "id":'',
      };
      // vm.now = new Date();
      vm.yesterday = dateService.getDaysFromNow(-1);

      vm.table = {
        query: {
          start: vm.query.start,
          end: vm.query.end,
          page: 1,
          perPage: 10,
        },
      }
      initTable(getStorehouseDataByPage);
      vm.para;
      // onSearch();
    }


     function initTable(getDataFun) {
      vm.tableParams = new NgTableParams({
        page: vm.table.query.page, // show first page
        count: vm.table.query.perPage, // count per page
        sorting: { 'vTime': "desc" }
      }, {
          getData: getDataFun
        });
    }

    function getOrderColumn(val) {
      return val === 'vTime' ? 0 :val;
    }

    function getStorehouseDataByPage($defer, params) {
      // var filter = params.filter();
      var sorting = params.sorting();
      var count = params.count();
      var page = params.page();

      var val = "";
      for (var key in sorting) {
        val = key;
      }
      vm.query.orderColumn = getOrderColumn(val);
      vm.orderDesc = sorting[val] === 'desc' ? 1 : 0;
      vm.query.page = page;
      vm.query.perPage = count;

      storehouseService
        .getStorehouseData(vm.query)
        .then(function (res) {
          vm.rowData = res;
          params.total(vm.rowData.count);
          $defer.resolve(vm.rowData.supplierSupervisionList);
        }, function (res) {
          console.log(res);
        });
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

    function onSearch() {
      vm.query.id = vm.id;
      angular.extend(vm.table.query, vm.query);
      initTable(getStorehouseDataByPage);
    }

    function view(paramValue) {
      vm.para = paramValue;
      $("#viewParamDialog").modal('show');
    }

  }
})();