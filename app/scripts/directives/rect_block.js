(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name chopperApp.directive:rectBlock
   * @description
   * # rectBlock
   */
  angular.module('chopperApp')
    .directive('rectBlock', function () {
      return {
        // template: '<div></div>',
        templateUrl: 'views/templates/rect_data_block.html',
        restrict: 'EA',
        scope: {
          rectData: '='
        },
      };
    });
    
})();