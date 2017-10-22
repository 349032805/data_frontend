(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.marketingService
   * @description
   * # marketingService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('marketingService', marketingService);

  function marketingService(dataService, $filter) {
    // Public API here
    var exports = {
      getMarketingBasicData: getMarketingBasicData,
      getOrderPerUvRate: getOrderPerUvRate,
      getOrderPerUvExportRate: getOrderPerUvExportRate,
      getLineOption: getLineOption,
      getBarOption: getBarOption,
      getFunnelOption: getFunnelOption,
      getPieOption: getPieOption,
      getActivityList: getActivityList,
      getActivityChannel: getActivityChannel,
      getActivityPageEvent: getActivityPageEvent,
      getActivityPageEventByPage: getActivityPageEventByPage,
      getEveryDayBarOption: getEveryDayBarOption,
      getTotalBarOption: getTotalBarOption,
      getActivityButtonEvent: getActivityButtonEvent,
      getActivityWeekPvUv: getActivityWeekPvUv,
      getRetentionDay: getRetentionDay,
      // getRetentionWeek: getRetentionWeek,
      getRetentionDayOnline: getRetentionDayOnline,
      // getRetentionWeekOnline: getRetentionWeekOnline,
      parseRetention: parseRetention,
      getNewStorerIncrement: getNewStorerIncrement,
    };

    return exports;

    function getMarketingBasicData(params) {
      return dataService
        .getMarketingBasicData(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getOrderPerUvRate(params) {
      return dataService
        .getOrderPerUvRate(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getOrderPerUvExportRate(params) {
      return dataService
        .getOrderPerUvExportRate(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getActivityList() {
      return dataService
        .getActivityList()
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getActivityChannel(params) {
      return dataService
        .getActivityChannel(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getActivityPageEvent(params) {
      return dataService
        .getActivityPageEvent(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getActivityPageEventByPage(params) {
      return dataService
        .getActivityPageEventByPage(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getActivityButtonEvent(params) {
      return dataService
        .getActivityButtonEvent(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getActivityWeekPvUv(params) {
      return dataService
        .getActivityWeekPvUv(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getRetentionDay(params) {
      return dataService
        .getRetentionDay(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    // function getRetentionWeek(params) {
    //   return dataService
    //     .getRetentionWeek(params)
    //     .then(function(res){
    //       return res.data;
    //     }, function(res){
    //       console.log(res);
    //     });
    // }
    
    function getRetentionDayOnline(params) {
      return dataService
        .getRetentionDayOnline(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }
    
    // function getRetentionWeekOnline(params) {
    //   return dataService
    //     .getRetentionWeekOnline(params)
    //     .then(function(res){
    //       return res.data;
    //     }, function(res){
    //       console.log(res);
    //     });
    // }
    
    function getNewStorerIncrement(params) {
      return dataService
        .getNewStorerIncrement(params)
        .then(function (res) {
          return res.data;
        }, function (res) {
          console.log(res);
        });
    }

    function parseRetention(datas) {
      var days = [], rows = {};
      for (var i = 0, len = datas.length; i < len; i++) {
        var item = datas[i];
        days.indexOf(item.first) < 0 ? days.push(item.first) : null;
        var rate = $filter("rate")(item.retentionRate);
        if (rows[item.first]) {
          rows[item.first].push(rate);
        } else {
          rows[item.first] = [item.first, item.currentNewCustomerNumber, rate];
        }
      }
      return days.map(function (day) { return rows[day]; });
    }

    function getLineOption(lineData, index, hasMin) {
      var legend = lineData.map(function (item) {
        return item.name;
      });
      // var minList = [], maxList = [];
      var series = lineData.map(function (item) {
        // minList.push(Math.min.apply(Math, item.list.map(function(mItem){return mItem[index] !== null &&  mItem[index] !== undefined ? mItem[index] : 0;})))
        // maxList.push(Math.max.apply(Math, item.list.map(function(mItem){return mItem[index] !== null &&  mItem[index] !== undefined ? mItem[index] : 0;})))
        return {
          name: item.name,
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          data: item.list.map(function (pItem) {
            var v = pItem[index];
            return v !== null && v !== undefined ? v : '-';
          })
        }
      });
      var xAxis = lineData[0].list.map(function (item) {
        return item.dt;
      });
      // var min = Math.min.apply(Math, minList);
      // var max = Math.max.apply(Math, maxList);
      
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
            // min: hasMin ? min : 0,
            // max: hasMin ? max : undefined,
            type: 'value'
          }
        ],
        series: series
      };
    }

    function getEveryDayBarOption(datas, index) {
      var params = { 
        title: index + "每日独立数据", 
        subtext: index === "uv" ? "每日访问活动页面的自然人数据" : "每日活动页面的浏览量" ,
        xAxis: [], 
        pages: [] 
      };
      var series = {};
      datas.forEach(function (item) {
        params.xAxis.indexOf(item.dt) < 0 ? params.xAxis.push(item.dt) : null;
        params.pages.indexOf(item.name) < 0 ? params.pages.push(item.name) : null;

        var value = index === "uv" ? item.uv : item.pv;
        series[item.name] ? series[item.name].data.push(value)
          : series[item.name] = { name: item.name, type: 'bar', stack: 'activity', data: [value] };
      });

      params.series = params.pages.map(function (page) {
        return series[page];
      });
      return getBarOption(params);
    }

    function getTotalBarOption(datas, index) {
      var params = { title: index + "每日累加数据", xAxis: [], pages: [] };
      var series = {};
      datas.forEach(function (item) {
        params.xAxis.indexOf(item.dt) < 0 ? params.xAxis.push(item.dt) : null;
        params.pages.indexOf(item.name) < 0 ? params.pages.push(item.name) : null;

        var value = index === "uv" ? item.totalUv : item.totalPv;
        series[item.name] ? series[item.name].data.push(value)
          : series[item.name] = { name: item.name, type: 'bar', stack: 'activity', data: [value] };
      });

      params.series = params.pages.map(function (page) {
        return series[page];
      });
      return getBarOption(params);
    }

    function getBarOption(params) {
      return {
        title: {
          text: params.title,
          subtext: params.subtext
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: params.pages
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: params.xAxis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: params.series
        // [
        //   {
        //     name: 'pv',
        //     type: 'bar',
        //     stack: 'activity',
        //     data: params.pvData
        //   },
        //   {
        //     name: 'uv',
        //     type: 'bar',
        //     stack: 'activity',
        //     data: params.uvData
        //   }
        // ]
      }
    }

    function getFunnelOption(datas) {
      var pages = datas.map(function (item) { return item.name; });
      // var total = datas.reduce(function (prev, cur) {
      //   var ret = prev;
      //   ret.frontToCurrentTotalUv += cur.frontToCurrentTotalUv;
      //   return ret;
      // }, { frontToCurrentTotalUv: 0 }).frontToCurrentTotalUv;
      var temp = 1;
      if(datas.length > 0) {
        temp = datas[0].frontToCurrentTotalUv;
      }
      var funnelDatas = datas.map(function (item, index) {
        var value = index === 0 ? 100 : ((item.frontToCurrentTotalUv / temp) * 100).toFixed(2);
        // temp = item.frontToCurrentTotalUv;
        return {
          name: item.name,
          value: value,  //(item.frontToCurrentTotalUv / total) * 100, 
          frontToCurrentTotalUv: item.frontToCurrentTotalUv,
          currentToBackTotalUv: item.currentToBackTotalUv,
          lostTotalUv: item.lostTotalUv
        };
      });
      return {
        title: {
          text: '活动页面漏斗图',
          // subtext: '纯属虚构'
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 'bottom',
          data: pages     //['展现', '点击', '访问', '咨询', '订单']
        },
        // calculable: true,
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              normal: {
                show: true,
                position: 'inside'
              },
              emphasis: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            labelLine: {
              normal: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1,
                label: {
                  // position: 'outer',
                  formatter: function (params) {
                    return params.name + " " + params.data.value + '%'
                  }
                },
              }
            },
            data: funnelDatas
          }
        ]
      };
    }

    function getPieOption(pageData) {
      return {
        title: {
          text: pageData.name,    //'某站点用户访问来源',
          // subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 'bottom',
          data: ['上页到当前页', '当前页到上页', '从当前页跳出']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: pageData.frontToCurrentTotalUv, name: '上页到当前页' },
              { value: pageData.currentToBackTotalUv, name: '当前页到上页' },
              { value: pageData.lostTotalUv, name: '从当前页跳出' }
            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'angle',
            itemStyle: {
              normal: {
                label: {
                  position: 'outer',
                  formatter: function (params) {
                    return params.seriesName + " " + (params.percent - 0).toFixed(2) + '%'
                  }
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    }

  }
})();