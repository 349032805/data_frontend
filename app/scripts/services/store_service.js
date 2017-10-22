(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.storeService
   * @description
   * # storeService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('storeService', storeService);
  function storeService(dataService, dateService) {
    // Public API here
    var exports = {
      // 店长总数据
      getStoreData: getStoreData,
      getSchoolsDataByPage: getSchoolsDataByPage,
      getStoresDataByPage: getStoresDataByPage,
      getAllSchoolsDataByOneDay: getAllSchoolsDataByOneDay,
      getAllStoresDataByOneDay: getAllStoresDataByOneDay,
      
      // 店长营业数据
      getStoreBusinessData: getStoreBusinessData,
      getStoreBusinessDataByPage: getStoreBusinessDataByPage,
      getStoreDataByPage: getStoreDataByPage,
      
      // 店长总数据信息(以微仓角度)
      getStoreInfoDate: getStoreInfoDate,
      getStoreInfoTable: getStoreInfoTable,
      getStoreInfoSection: getStoreInfoSection,
      getStoreInfoStores: getStoreInfoStores,

      getLineOption: getLineOption,
    };
    return exports;

    function getStoreData(params) {
      return dataService
        .getStoreData(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getSchoolsDataByPage(params) {
      return dataService
        .getSchoolsDataByPage(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getAllSchoolsDataByOneDay(date) {
      return dataService
        .getSchoolsDataByPage({start:date, end:date, page:-1, perPage:-1})
        .then(function (res) {
          return res.data.list ? res.data.list.map(function(item){
            return {
              dt: item.dt,
              zoneName: item.zoneName,
              cityName: item.cityName,
              section2Name: item.sectionName,
              paidPurchaseAmount: item.paidPurchaseAmount,
              paidPurchaseMoney: item.paidPurchaseMoney,
              salesVolume: item.salesVolume,
              sales: item.sales,
              additionalOrderMoney: item.additionalOrderMoney,
              uniqCustomerNumber: item.uniqCustomerNumber
            }
          }) : [];
        }, function (res) {
          console.log(res);
        });
    }
    
    function getStoresDataByPage(params) {
      return dataService
        .getStoresDataByPage(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getAllStoresDataByOneDay(date) {
      return dataService
        .getStoresDataByPage({start:date, end:date, page:-1, perPage:-1})
        .then(function (res) {
          return res.data.list ? res.data.list.map(function(item){
            return {
              dt: item.dt,
              zoneName: item.zoneName,
              cityName: item.cityName,
              section2Name: item.sectionName,
              storeName: item.storeName,
              paidPurchaseAmount: item.paidPurchaseAmount,
              newCustomerNumber: item.newCustomerNumber,
              paidPurchaseMoney: item.paidPurchaseMoney,
              salesVolume: item.salesVolume,
              sales: item.sales,
              additionalOrderMoney: item.additionalOrderMoney,
              uniqCustomerNumber: item.uniqCustomerNumber
            }
          }) : [];
        }, function (res) {
          console.log(res);
        });
    }

    function getStoreBusinessData(params) {
      return dataService
        .getStoreBusinessData(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getStoreBusinessDataByPage(params) {
      return dataService
        .getStoreBusinessDataByPage(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getStoreDataByPage(params) {
      return dataService
        .getStoreDataByPage(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getStoreInfoDate(params) {
      return dataService
        .getStoreInfoDate(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getStoreInfoTable(params) {
      return dataService
        .getStoreInfoTable(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getStoreInfoSection(params) {
      return dataService
        .getStoreInfoSection(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getStoreInfoStores(params) {
      return dataService
        .getStoreInfoStores(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getLineOption(lineData, index) {
      var legend = lineData.map(function (item) {
        return item.name;
      });
      var series = lineData.map(function (item) {
        item.pictureData.sort(function (a, b) {
          return a.dt > b.dt ? 1 : -1;
        });
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: item.pictureData.map(function (pItem) {
            var v = pItem[index];
            return v !== null &&  v !== undefined ? v : '-';
          })
        }
      });
      var xAxis = lineData[0].pictureData.map(function (item) {
        return dateService.toString(item.dt);
      });
      
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          x: 'left',
          data: legend
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xAxis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: series
      };
    }

  }
})();