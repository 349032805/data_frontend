(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:RootCtrl
   * @description
   * # RootCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('RootCtrl', RootCtrl);

  function RootCtrl(authService, $state) {
    var vm = this;
    vm.logout = authService.logout;
    vm.$state = $state;
    vm.isAuthenticated = authService.isAuthenticated;
    vm.getManager = authService.getManager;
    vm.getDuties = getDuties;
    vm.getNavigations = authService.getUserNavigations;
    
    function getDuties() {
      var districtType = vm.getManager().districtType;
      return districtType === "country" ? "市场总监" :
        districtType === "zone" ? "大区经理" :
          districtType === "city" ? "城市经理" :
            districtType;
    }

  }
})();
