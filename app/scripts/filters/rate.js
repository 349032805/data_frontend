(function(){
'use strict';

/**
 * @ngdoc filter
 * @name chopperApp.filter:rate
 * @function
 * @description
 * # rate
 * Filter in the chopperApp.
 */
angular.module('chopperApp')
  .filter('rate', rate);
  
  function rate() {
    return function (input, reserve) {
      if (input || input == 0) {
        reserve = angular.isNumber(reserve) ? reserve : 2;
        return angular.isNumber(+input) ? (+input * 100).toFixed(reserve) + "%" : input;
      } else {
        return "N/A";
      }
    };
  }
})();