(function () {
'use strict';

/**
 * @ngdoc service
 * @name chopperApp.regionService
 * @description
 * # regionService
 * Factory in the chopperApp.
 */
angular.module('chopperApp')
  .factory('regionService', regionService);
  
  function regionService(dataService) {
    var exports = {
      getRegionStoreOverall: getRegionStoreOverall,
      getRegionStoreLine: getRegionStoreLine,
      getRegionStoreTable: getRegionStoreTable,
      getRegionStoreSection: getRegionStoreSection,
      getRegionStoreStores: getRegionStoreStores,
      getLineOption: getLineOption,

      getRegionRealTimeStore: getRegionRealTimeStore,
      getRegionRealTimeStoreBySection: getRegionRealTimeStoreBySection,
      getRegionRealTimeStoreByCampus: getRegionRealTimeStoreByCampus,
    }
    
    return exports;
    
    function getRegionStoreOverall(params) {
      return dataService
        .getRegionStoreOverall(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getRegionStoreLine(params) {
      return dataService
        .getRegionStoreLine(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getRegionStoreTable(params) {
      return dataService
        .getRegionStoreTable(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getRegionStoreSection(params) {
      return dataService
        .getRegionStoreSection(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getRegionStoreStores(params) {
      return dataService
        .getRegionStoreStores(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getLineOption(lineData,index) {
      var legend = lineData.map(function (item) {
        return item.name;
      });
      var series = lineData.map(function (item) {
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: item.list.map(function (pItem) {
            var v = pItem[index];
            return v !== null &&  v !== undefined ? v : '-';
          })
        }
      });
      var xAxis = lineData[0].list.map(function (item) {
        return item.dt;
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
        // calculable: false,
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


    function getRegionRealTimeStore(params) {
      return dataService
        .getRegionRealTimeStore(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

      function getRegionRealTimeStoreBySection(params) {
      return dataService
        .getRegionRealTimeStoreBySection(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

      function getRegionRealTimeStoreByCampus(params) {
      return dataService
        .getRegionRealTimeStoreByCampus(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }


  }
})();