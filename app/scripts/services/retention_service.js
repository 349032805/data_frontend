(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.retentionService
   * @description
   * # retentionService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('retentionService', retentionService);

  function retentionService(dataService, dateService) {
    var exports = {
      getPhoneRetention: getPhoneRetention,
      getPermeationRate: getPermeationRate,
      getPermeationData: getPermeationData,
      getStoreRetention: getStoreRetention,
      parseRetentionData: parseRetentionData,
      getRetLineOption: getRetLineOption,
      getRateLineOption: getRateLineOption,
      getLineOption: getLineOption,
      parseRetentionDataByMonth: parseRetentionDataByMonth,
      getRetLineOptionByMonth: getRetLineOptionByMonth,
    }
    return exports;
    
    function getPhoneRetention(params) {
      return dataService
        .getPhoneRetention(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        });
    }

    function getPermeationRate(params) {
      return dataService
        .getPermeationRate(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        })
    }
    
    function getPermeationData(params) {
      return dataService
        .getPermeationData(params)
        .then(function(res){
          return res.data;
        }, function(res){
          console.log(res);
        })
    }
    
    function getStoreRetention(params) {
      return dataService
        .getStoreRetention(params)
        .then(function(res) {
          return res.data;
        }, function(res) {
          console.log(res);
        })
    }
    
    function getRetLineOption(vm) {
      var legend, xAxis, sd = [], series;
      if (vm.rateAvgType === 'times') {
        legend = ["周平均留存率"];
        xAxis = vm.lastWeekObjs.map(function (item, index) {
          return "第" + (index + 1) + "周";
        });

        for (var i = 0, len = vm.tableArray.length; i < len; i++) {
          var arr = [];
          for (var j = len - i - 1, p = 0; j >= 0; j-- , p++) {
            var o = vm.tableArray[p][j];
            o ? arr.push(o.rate) : arr.push(0);
            // arr.push(vm.tableArray[p][j].rate || 0);
          }
          sd.push((avg(arr) * 100).toFixed(2));
        }

        series = [{
          name: "周平均留存率",
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: sd
        }];
      } else if (vm.rateAvgType === 'current') {
        legend = ["留存周平均留存率"];
        xAxis = vm.lastWeekObjs.map(function (item, index) {
          return item.week + "周";
        }).reverse();

        for (var i = 0, len = vm.tableArray.length; i < len; i++) {
          sd.push((avg(vm.tableArray[i].filter(function (d) { return !!d; }).map(function (d) { return d.rate; })) * 100).toFixed(2));
        }
        sd.reverse();
        series = [{
          name: "留存周平均留存率",
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: sd
        }];
      }
      vm.rateTable = {
        thead: xAxis,
        lastWeekObjs: angular.copy(vm.lastWeekObjs).reverse(),
        tbody: sd
      }
      return getLineOption(legend, xAxis, series, "%");
    }

     function getRetLineOptionByMonth(vm) {
      var legend, xAxis, sd = [], series;
      if (vm.rateAvgType === 'times') {
        legend = ["月平均留存率"];
        xAxis = vm.lastMonthObjs.map(function (item, index) {
          return "第" + (index + 1) + "月";
        });

        for (var i = 0, len = vm.tableArray.length; i < len; i++) {
          var arr = [];
          for (var j = len - i - 1, p = 0; j >= 0; j-- , p++) {
            var o = vm.tableArray[p][j];
            o ? arr.push(o.rate) : arr.push(0);
            // arr.push(vm.tableArray[p][j].rate || 0);
          }
          sd.push((avg(arr) * 100).toFixed(2));
        }

        series = [{
          name: "月平均留存率",
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: sd
        }];
      } else if (vm.rateAvgType === 'current') {
        legend = ["留存月平均留存率"];
        xAxis = vm.lastMonthObjs.map(function (item, index) {
          return item.month + "月";
        }).reverse();

        for (var i = 0, len = vm.tableArray.length; i < len; i++) {
          sd.push((avg(vm.tableArray[i].filter(function (d) { return !!d; }).map(function (d) { return d.rate; })) * 100).toFixed(2));
        }
        sd.reverse();
        series = [{
          name: "留存月平均留存率",
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: sd
        }];
      }
      vm.rateTable = {
        thead: xAxis,
        lastMonthObjs: angular.copy(vm.lastMonthObjs).reverse(),
        tbody: sd
      }
      return getLineOption(legend, xAxis, series, "%");
    }
    
    function avg(arr) {
      if (!arr.length) return;
      var sum = 0;
      for (var i = 0, len = arr.length; i < len; i++) {
        sum += arr[i];
      }
      return sum / len;
    }
    
    function parseRetentionData(vm, indexs) {
      var firstWeeks = [],
        firstCount = [],
        lastWeeks = [],
        tableArray = [];

      var d = vm.retData.filter(function (item) {
        return item[indexs.rate] !== undefined && item[indexs.rate] !== null;
      });

      for (var i = 0, len = d.length; i < len; i++) {
        var item = d[i],
          first = item.firstYear + "-" + item.firstWeek,
          last = item.lastYear + "-" + item.lastWeek;
        if (firstWeeks.indexOf(first) < 0) {
          firstWeeks.push(first);
          firstCount.push(item[indexs.firstCount]);
        };
        lastWeeks.indexOf(last) < 0 ? lastWeeks.push(last) : null;
      }
      lastWeeks.reverse();
      for (var p = 0, lLen = lastWeeks.length; p < lLen; p++) {
        var row = [];
        for (var q = 0, fLen = firstWeeks.length; q < fLen; q++) {
          var ret = findRetentionData(firstWeeks[q].split('-')[0], lastWeeks[p].split('-')[0],firstWeeks[q].split('-')[1], lastWeeks[p].split('-')[1], vm);
          // ret ? row.push(ret) : row.push("");
          ret ? row.push({ rate: ret[indexs.rate], firstCount: ret[indexs.firstCount], currentCount: ret[indexs.currentCount] }) : row.push("");
        }
        tableArray.push(row);
      }
      vm.firstWeekObjs = firstWeeks.map(function (first) {
        var arr = first.split("-");
        return { week: arr[1], weekStr: dateService.getWeekString(arr[0], arr[1]) };
      });
      vm.lastWeekObjs = lastWeeks.map(function (last) {
        var arr = last.split("-");
        return { week: arr[1], weekStr: dateService.getWeekString(arr[0], arr[1]) };
      });
      vm.firstCount = firstCount;
      vm.tableArray = tableArray;
    }

    function parseRetentionDataByMonth(vm, indexs) {
      var firstMonths = [],
        firstCount = [],
        lastMonths = [],
        tableArray = [];

      var d = vm.retData.filter(function (item) {
        return item[indexs.rate] !== undefined && item[indexs.rate] !== null;
      });

      for (var i = 0, len = d.length; i < len; i++) {
        var item = d[i],
          first = item.firstYear + "-" + item.firstMonth,
          last = item.lastYear + "-" + item.lastMonth;
        if (firstMonths.indexOf(first) < 0) {
          firstMonths.push(first);
          firstCount.push(item[indexs.firstCount]);
        };
        lastMonths.indexOf(last) < 0 ? lastMonths.push(last) : null;
      }
      lastMonths.reverse();
      for (var p = 0, lLen = lastMonths.length; p < lLen; p++) {
        var row = [];
        for (var q = 0, fLen = firstMonths.length; q < fLen; q++) {
          var ret = findRetentionDataByMonth(firstMonths[q].split('-')[0], lastMonths[p].split('-')[0],firstMonths[q].split('-')[1], lastMonths[p].split('-')[1], vm);
          // ret ? row.push(ret) : row.push("");
          ret ? row.push({ rate: ret[indexs.rate], firstCount: ret[indexs.firstCount], currentCount: ret[indexs.currentCount] }) : row.push("");
        }
        tableArray.push(row);
      }
      vm.firstMonthObjs = firstMonths.map(function (first) {
        var arr = first.split("-");
        return { month: arr[1]};
      });
      vm.lastMonthObjs = lastMonths.map(function (last) {
        var arr = last.split("-");
        return { month: arr[1]};
      });
      vm.firstCount = firstCount;
      vm.tableArray = tableArray;
    }

    function findRetentionData(firstYear, lastYear, first,last, vm) {
      for (var i = 0, len = vm.retData.length; i < len; i++) {
        var item = vm.retData[i];
        if (item.firstYear == firstYear && item.lastYear == lastYear && item.firstWeek == first && item.lastWeek == last) {
          return item;
        }
      }
    }

    function findRetentionDataByMonth(firstYear,lastYear,first, last, vm) {
      for (var i = 0, len = vm.retData.length; i < len; i++) {
        var item = vm.retData[i];
        if (item.firstYear == firstYear && item.lastYear == lastYear && item.firstMonth == first && item.lastMonth == last) {
          return item;
        }
      }
    }
    
    function getRateLineOption(lineData, index) {
      var legend = lineData.map(function (item) {
        return item.name;
      });
      var series = lineData.map(function (item) {
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: item.rate.map(function (pItem) {
            var value = index === "rate" || index === "storeRate" ? (pItem[index] * 100).toFixed(2)
                      : index === "phoneCount" ? pItem[index]
                      : pItem[index]
            return value || '-';
          })
        }
      });
      var unit = index === "rate" || index === "storeRate" ? "%" : "";
      var xAxis = lineData[0].rate.map(function (item) {
        return item.dt;
      });
      return getLineOption(legend, xAxis, series, unit);
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