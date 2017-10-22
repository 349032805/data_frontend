(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:RedPaperCtrl
   * @description
   * # RedPaperCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('RedPaperCtrl', RedPaperCtrl);

  function RedPaperCtrl(dataService) {
    var vm = this;
    
    activate();
    
    function activate() {
      getBonusSumData();
      getBonusDetailData();
    }
    
    function getBonusSumData() {
      return dataService
        .getBonusSumData()
        .then(function(res){
          vm.bonusSumdata = res.data;
        }, function(res){
          console.log(res);
        });
    }
    
    function getBonusDetailData() {
      return dataService
        .getBonusDetailData()
        .then(function(res){
          vm.bonusDetaildata = res.data;
        }, function(res){
          console.log(res);
        });
    }
    
  }

})();