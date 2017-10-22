(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:MiniNightCatCtrl
   * @description
   * # MiniNightCatCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('MiniNightCatCtrl', MiniNightCatCtrl);

  function MiniNightCatCtrl(miniSupplierService, dateService, areaService, NgTableParams, $scope) {
    var vm = this;
    vm.isMiniSupplier = true;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.selectLineGroup = selectLineGroup;
    vm.onSearch = onSearch;
    vm.selectZones = areaService.selectZones;
    vm.selectCitys = areaService.selectCitys;
    vm.selectAreas = areaService.selectAreas;
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
        page: 1,
        perPage: 10,
      };
      // vm.now = new Date();
      vm.yesterday = dateService.getDaysFromNow(-1);

      vm.firstTable = {
        query: {
          start: vm.query.start,
          end: vm.query.end,
          page: 1,
          perPage: 10,
        }
      }
      vm.secondTable = {
        query: {
          start: vm.query.start,
          end: vm.query.end,
          page: 1,
          perPage: 10,
        }
      }

      areaService.initAreas(vm);

      vm.lineGroup = {
        index: "wholesalerSkuNumber",             // 微仓出货额
        option: {}
      }

      getSupplierData();
      initTable("firstTable", getWholeSalersData);
      initTable("secondTable", getBrandsData);
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

    function initTable(index, getDataFun) {
      var sorting = index === "firstTable" ? { 'wholesalerSkuNumber': "desc" } : { 'brandSkuNumber': "desc" }
      vm[index].tableParams = new NgTableParams({
        page: vm[index].query.page, // show first page
        count: vm[index].query.perPage, // count per page
        sorting: sorting
      }, {
          getData: getDataFun
        });
    }

    function getOrderColumn(val) {
      return val === 'wholesalerSales' ? 0
        : val === 'wholesalerSalesVolume' ? 1
          : val === 'wholesalerSkuNumber' ? 2
            : 0;
    }

    function getSupplierData() {
      return miniSupplierService
        .getSupplierData(vm.query)
        .then(function (res) {
          vm.lineData = res;
          vm.lineGroup.option = miniSupplierService.getSalersLineOption(res.wholesalerPictureData, vm.lineGroup.index);
          parseRectData(res);
        }, function (res) {
          console.log(res);
        });
    }

    function getWholeSalersData($defer, params) {
      // var filter = params.filter();
      var sorting = params.sorting();
      var count = params.count();
      var page = params.page();

      var val = "";
      for (var key in sorting) {
        val = key;
      }
      vm.firstTable.query.orderColumn = getOrderColumn(val);
      vm.firstTable.query.orderDesc = sorting[val] === 'desc' ? 1 : 0;
      vm.firstTable.query.page = page;
      vm.firstTable.query.perPage = count;

      miniSupplierService
        .getWholeSalersData(vm.firstTable.query)
        .then(function (res) {
          vm.firstTable.data = res;
          params.total(vm.firstTable.data.count);
          $defer.resolve(vm.firstTable.data.wholesalerDataList);
        }, function (res) {
          console.log(res);
        });
    }

    function getBrandsData($defer, params) {
      // var filter = params.filter();
      var sorting = params.sorting();
      var count = params.count();
      var page = params.page();

      var val = "";
      for (var key in sorting) {
        val = key;
      }
      vm.secondTable.query.orderColumn = getOrderColumn(val);
      vm.secondTable.query.orderDesc = sorting[val] === 'desc' ? 1 : 0;
      vm.secondTable.query.page = page;
      vm.secondTable.query.perPage = count;

      miniSupplierService
        .getBrandsData(vm.secondTable.query)
        .then(function (res) {
          vm.secondTable.data = res;
          params.total(vm.secondTable.data.count);
          $defer.resolve(vm.secondTable.data.brandDataList);
        }, function (res) {
          console.log(res);
        });
    }

    function parseRectData(d) {
      vm.rectData = d ? [
        //标题、数额、同比、环比
        { thead: '批发商数', num: d.wholesalerData.wholesalerNumber, tb: null, hb: null },
        { thead: '批发商销售额', num: d.wholesalerData.wholesalerSales, tb: null, hb: null },
        { thead: '品牌商数', num: d.brandData.brandNumber, tb: null, hb: null },
        { thead: '品牌商销售额', num: d.brandData.brandSales, tb: null, hb: null },
      ] : [];
    }

    function selectLineGroup(index) {
      vm.lineGroup.index = index;
      if (index === 'wholesalerSkuNumber') {
        vm.lineGroup.option = miniSupplierService.getSalersLineOption(vm.wholesalerPictureData, index);
      } else if (index === 'brandSkuNumber') {
        vm.lineGroup.option = miniSupplierService.getSalersLineOption(vm.brandPictureData, index);
      }
    }

    function onSearch() {
      angular.extend(vm.firstTable.query, vm.query);
      angular.extend(vm.secondTable.query, vm.query);

      getSupplierData();
      initTable("firstTable", getWholeSalersData);
      initTable("secondTable", getBrandsData);
    }
  }
})();
