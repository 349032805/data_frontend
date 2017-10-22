(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.activeStoreService
   * @description
   * # activeStoreService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('activeStoreService', activeStoreService);

  function activeStoreService(dataService, dateService) {
    var exports = {
      getActiveStoreOverallForMiniSupplierByLastWeek : getActiveStoreOverallForMiniSupplierByLastWeek,
      getActiveStoreOverallForMiniSupplierByLastTwoWeek : getActiveStoreOverallForMiniSupplierByLastTwoWeek,
      getActiveStoreOverallForMiniSupplierByLastFourWeek : getActiveStoreOverallForMiniSupplierByLastFourWeek,

      getActiveStoreInfoFromMiniSupplierByLastWeek : getActiveStoreInfoFromMiniSupplierByLastWeek,
      getActiveStoreInfoFromMiniSupplierByLastTwoWeek : 
      getActiveStoreInfoFromMiniSupplierByLastTwoWeek,
      getActiveStoreInfoFromMiniSupplierByLastFourWeek : 
      getActiveStoreInfoFromMiniSupplierByLastFourWeek,
      getActiveStoreDetailsFromMiniSupplierByLastWeek : getActiveStoreDetailsFromMiniSupplierByLastWeek,
      getActiveStoreDetailsFromMiniSupplierByLastTwoWeek : 
      getActiveStoreDetailsFromMiniSupplierByLastTwoWeek,
      getActiveStoreDetailsFromMiniSupplierByLastFourWeek : 
      getActiveStoreDetailsFromMiniSupplierByLastFourWeek,

      getActiveStoreLineFromMiniSupplierByLastWeek : getActiveStoreLineFromMiniSupplierByLastWeek,
      getActiveStoreFromMiniSupplierLineOption : getActiveStoreFromMiniSupplierLineOption,

      getActiveStoreInfoFromRegion : getActiveStoreInfoFromRegion,
      getActiveStoreDetailsFromRegion : getActiveStoreDetailsFromRegion,
    };
    return exports;

    function getActiveStoreOverallForMiniSupplierByLastWeek(params) {
      return dataService
        .getActiveStoreOverallForMiniSupplierByLastWeek(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        })
    }

    function getActiveStoreOverallForMiniSupplierByLastTwoWeek(params) {
      return dataService
        .getActiveStoreOverallForMiniSupplierByLastTwoWeek(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        })
    }

    function getActiveStoreOverallForMiniSupplierByLastFourWeek(params) {
      return dataService
        .getActiveStoreOverallForMiniSupplierByLastFourWeek(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        })
    }

    function getActiveStoreInfoFromMiniSupplierByLastWeek(params) {
      return dataService
        .getActiveStoreInfoFromMiniSupplierByLastWeek(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getActiveStoreInfoFromMiniSupplierByLastTwoWeek(params) {
      return dataService
        .getActiveStoreInfoFromMiniSupplierByLastTwoWeek(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getActiveStoreInfoFromMiniSupplierByLastFourWeek(params) {
      return dataService
        .getActiveStoreInfoFromMiniSupplierByLastFourWeek(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getActiveStoreDetailsFromMiniSupplierByLastWeek(params) {
      return dataService
        .getActiveStoreDetailsFromMiniSupplierByLastWeek(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        })
    }

    function getActiveStoreDetailsFromMiniSupplierByLastTwoWeek(params) {
      return dataService
        .getActiveStoreDetailsFromMiniSupplierByLastTwoWeek(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        })
    }

    function getActiveStoreDetailsFromMiniSupplierByLastFourWeek(params) {
      return dataService
        .getActiveStoreDetailsFromMiniSupplierByLastFourWeek(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        })
    }

    function getActiveStoreInfoFromRegion(params) {
      return dataService
        .getActiveStoreInfoFromRegion(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getActiveStoreDetailsFromMiniSupplier(params) {
      return dataService
        .getActiveStoreDetailsFromMiniSupplier(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        })
    }

    function getActiveStoreDetailsFromRegion(params) {
      return dataService
        .getActiveStoreDetailsFromRegion(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        })
    }

    function getActiveStoreLineFromMiniSupplierByLastWeek(params) {
      return dataService
        .getActiveStoreLineFromMiniSupplierByLastWeek(params)
        .then( function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        })
    }

    function getLineOption(legend, xAxis, series) {
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

    function getActiveStoreFromMiniSupplierLineOption(lineData, index) {
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
        return item.year + "-" + item.week;
      });
      return getLineOption(legend, xAxis, series);
    }
  }
})();
