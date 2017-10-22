(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.monitorService
   * @description
   * # monitorService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('monitorService', monitorService);


  function monitorService(dataService) {
    // Public API here
    var exports = {
      getPhoneDailSupervisitionData: getPhoneDailSupervisitionData,
      getExportPhoneSupervisitionData: getExportPhoneSupervisitionData,
      getCityOrder: getCityOrder,
      getCityOrderRate: getCityOrderRate,
      getCityPhoneRate: getCityPhoneRate,
      getOrderLineOption: getOrderLineOption,
      getSmsLineOption: getSmsLineOption,
      getSmsNotify: getSmsNotify,
      getSmsNotifyAll: getSmsNotifyAll,
      getSupervisionUv: getSupervisionUv,
      getSupervisionUvRate: getSupervisionUvRate,
      getPerUvOption: getPerUvOption
    };
    return exports;
    
    // Service logic
    
    function getPhoneDailSupervisitionData(params) {
      return dataService
        .getPhoneDailSupervisitionData(params)
        .then(function (res) {
          return res;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getExportPhoneSupervisitionData(params) {
      return dataService
        .getExportPhoneSupervisitionData(params)
        .then(function (res) {
          return res;
        }, function (res) {
          console.log(res);
        });
    }

    function getCityOrder(params) {
      return dataService
        .getCityOrder(params)
        .then(function (res) {
          return res;
        }, function (res) {
          console.log(res);
        });
    }

    function getCityOrderRate(params) {
      return dataService
        .getCityOrderRate(params)
        .then(function (res) {
          return res;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getCityPhoneRate(params) {
      return dataService
        .getCityPhoneRate(params)
        .then(function (res) {
          return res;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getSmsNotify(params) {
      return dataService
        .getSmsNotify(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getSmsNotifyAll(params) {
      return dataService
        .getSmsNotifyAll(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    function getSupervisionUv(params) {
      return dataService
        .getSupervisionUv(params)
        .then(function (res) {
          return res.data;
        }, function(res) {
          console.log(res);
        });
    }
    
    function getSupervisionUvRate(params) {
      return dataService
        .getSupervisionUvRate(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        });
    }

    function getOrderLineOption(lineData, index) {
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
            return (pItem[index]*100).toFixed(2) || '-';
          })
        }
      });
      var xAxis = lineData[0].list.map(function (item) {
        return item.dt;
      });
      return getLineOption(legend, xAxis, series, "%");
    }
    
    function getSmsLineOption(lineData, index) {
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
      return getLineOption(legend, xAxis, series, "");
    }
    
    function getPerUvOption(lineData, platform) {
      var legend = lineData.map(function (item) {
        return item.name;
      });
      var series = lineData.map(function (item) {
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: item.list.filter(function(fItem){ return fItem.source === platform }).map(function (pItem) {
            var v = pItem.rate;
            return v !== null &&  v !== undefined ? v : '-';
          })
        }
      });
      var xAxis = lineData[0].list.filter(function(fItem){ return fItem.source === platform }).map(function (item) {
        return item.dt;
      });
      return getLineOption(legend, xAxis, series, "");
    }

    function getLineOption(legend, xAxis, series, unit) {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{a}：{c}' + unit
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
  }
})();