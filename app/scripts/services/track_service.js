(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.trackService
   * @description
   * # trackService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('trackService', trackService);

  function trackService(dataService) {
    // Public API here
    var exports = {
      getPvuv: getPvuv,
      getForceOption: getForceOption,
      getExportDailyTrack: getExportDailyTrack
    };
    var pageNameMap = {
      unknow: "起始页",
      store_details: "店铺页",
      select_store: "选择店铺页",
      select_section: "选择学校页",
      select_city: "选择城市页",
      select_building: "选择楼栋页",
      confirm_order: "确认订单页",
      cart: "购物车"
    }
    return exports;

    
    function getPvuv(params) {
      return dataService.getPvuv(params).then(function (res) {
        return res.data;
      }, function (res) {
        console.log(res);
      })
    }
    
    function getExportDailyTrack(params) {
      return dataService.getExportDailyTrack(params).then(function (res) {
        return res.data;
      }, function (res) {
        console.log(res);
      })
    }
    
    function getPageName(page) {
      // return pageNameMap[page] || page;
      return page;
    }

    function getForceOption(datas, force) {
      var forceDatas = datas.filter(function(item){
        return item.userType === force.userType && item.source === force.platform;
      }) ;
      var nodes = [], links = [];
      forceDatas.forEach(function (item) {
        var findNode = null;
        nodes.forEach(function (node) {
          if (node.name === getPageName(item.page)) {
            findNode = node;
          }
        });
        if (findNode) {
          findNode.value += item[force.index];
        } else {
          nodes.push({ category: 0, name: getPageName(item.page), value: item[force.index] });
        }
        nodes.push({ category: 0, name: getPageName('unknow'), value: 1 })
        links.push({ source: getPageName(item.originPage), target: getPageName(item.page), weight: 2, name: item[force.index] })
      });

      return {
        tooltip: {
          trigger: 'item',
          // formatter: '{a} : {b} {c}'
          formatter: function(p) {
            return p[2] instanceof Object
                 ? p[3] + "到" + p[4] + p[0] + ":" + p[1]
                 : p[1] + p[0] + ":" + p[2];
          }
        },
        toolbox: {
          show: true,
          feature: {
            restore: { show: true },
            // magicType: { show: true, type: ['force', 'chord'] },
            saveAsImage: { show: true }
          }
        },
        legend: {
          x: 'left',
          data: ['页面'],
          selectedMode: false
        },
        series: [
          {
            type: 'force',
            name: force.index,
            ribbonType: false,
            categories: [
              {
                name: '页面'
              }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: '#333'
                  }
                },
                nodeStyle: {
                  brushType: 'both',
                  borderColor: 'rgba(255,215,0,0.4)',
                  borderWidth: 1
                }
              },
              emphasis: {
                label: {
                  show: false
                  // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                nodeStyle: {
                  //r: 30
                },
                linkStyle: {}
              }
            },
            minRadius: 10,
            maxRadius: 50,
            gravity: 1,
            scaling: 2,
            steps: 10,
            coolDown: 0.9,
            linkSymbol: 'arrow',
            roam: 'move',
            nodes: nodes,
            links: links
          }
        ]
      };


    }

  }
})();