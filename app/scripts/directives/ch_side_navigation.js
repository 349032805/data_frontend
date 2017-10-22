(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name chopperApp.directive:chSideNavigation
   * @description
   * # chSideNavigation
   */
  angular.module('chopperApp')
    .directive('chSideNavigation', chSideNavigation);
  function chSideNavigation($timeout) {
    var directive = {
      restrict: 'AE',
      link: postLink,
    };

    return directive;
    function postLink(scope, element, attrs) {
      // Call the metsiMenu plugin and plug it to sidebar navigation
      $timeout(function() {
        element.metisMenu();
      });
    }
  }
})();
