(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.districtHierarchy
   * @description
   * # districtHierarchy
   * Constant in the chopperApp.
   */
  angular.module('chopperApp')
    .constant('districtHierarchy', {
      country:  {name: '国家', level: 7},
      zone:     {name: '大区', level: 6},
      province: {name: '省份', level: 5},
      city:     {name: '城市', level: 4},
      region:   {name: '城市区域', level: 3},
      section:  {name: '学校', level: 2},
      area:     {name: '学校区域', level: 1},
      building: {name: '楼栋', level: 0},
      none:     {name: '无'  , level:-1},
    });
})();
