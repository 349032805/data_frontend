(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name chopperApp.directive:minimalizaSidebar
   * @description
   * # minimalizaSidebar
   */
  angular.module('chopperApp')
    .directive('minimalizaSidebar', minimalizaSidebar);

  function minimalizaSidebar() {

    var directive = {
      restrict: 'A',
      template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="vm.minimalize()"><i class="fa fa-bars"></i></a>',
      controller: minimalizaSidebarCtrl,
      controllerAs: 'vm',
    };

    return directive;
  }

  function minimalizaSidebarCtrl() {
    var vm = this;
    vm.minimalize = minimalize;
    activate();

    function activate() {
    }
    
    function minimalize() {
      $("body").toggleClass("mini-navbar");
      if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
          function () {
            $('#side-menu').fadeIn(500);
          }, 100);
      } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
          function () {
            $('#side-menu').fadeIn(500);
          }, 300);
      } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
      }
    }
  }
})();