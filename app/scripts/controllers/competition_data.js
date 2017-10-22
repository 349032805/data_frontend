(function(){
'use strict';

/**
 * @ngdoc function
 * @name chopperApp.controller:CompetitionDataCtrl
 * @description
 * # CompetitionDataCtrl
 * Controller of the chopperApp
 */
angular.module('chopperApp')
  .controller('CompetitionDataCtrl', CompetitionDataCtrl);
  
  function CompetitionDataCtrl(competitionService, dateService) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.selectLineGroup = selectLineGroup;
    vm.onSearch = onSearch;
    
    activate();
    
    function activate() {
      vm.datepicker = {
        start: {
          open: false,
          model: dateService.getDaysFromNow(-8),
        },
        end: {
          open: false,
          model: dateService.getDaysFromNow(-2),
        },
      }
      
      vm.query = {
        start: dateService.toString(vm.datepicker.start.model),
        end: dateService.toString(vm.datepicker.end.model),
      };
      vm.yesterday = dateService.getDaysFromNow(-1);
      
      vm.lineGroup = {
        index: "saleRoom",             //店长销售额s
        option: {}
      }
      
      onSearch();
    }
    
    function openDatepicker(index) {
      vm.datepicker[index].open = true;
    }

    function selectStart() {
      vm.datepicker.end.model = vm.datepicker.start.model;
      updateQueryDate();
    }

    function selectEnd() {
      updateQueryDate();
    }

    function updateQueryDate() {
      vm.query.start = dateService.toString(vm.datepicker.start.model);
      vm.query.end = dateService.toString(vm.datepicker.end.model);
    }
    
    function selectLineGroup(index) {
      vm.lineGroup.index = index;
      vm.lineGroup.option = competitionService.getCompLineOption(vm.lineData, vm.lineGroup.index);
    }
    
    function onSearch() {
      getCompetitionData();
    }
    
    function getCompetitionData() {
      return competitionService
        .getCompetitionData(vm.query)
        .then(function(res){
          vm.compData = res || [];
          parseData(vm.compData);
        });
    }
    
    function parseData(arr) {
      var lineData = [];
      arr.map(function(item){
        var findItem = null;
        lineData.map(function(d) {
          if (d.siteId === item.siteId) {
            findItem = d;
          } 
        });
        
        if (findItem) {
          findItem.list.push(item);
        } else {
          lineData.push({
            siteId: item.siteId,
            name: item.dicName,
            list: [item]
          });
        }
        
      });
      vm.lineData = lineData;
      vm.lineGroup.option = competitionService.getCompLineOption(vm.lineData, vm.lineGroup.index);
    }
    
  }
})();