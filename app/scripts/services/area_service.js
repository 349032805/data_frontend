(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.areaService
   * @description
   * # areaService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('areaService', areaService);

  function areaService(authService, dataService) {
    // Interface
    var areaService = {
      initAreas: initAreas,
      getNextDistricts: getNextDistricts,
      getNextMiniSuppliers: getNextMiniSuppliers,
      selectZones: selectZones,
      selectCitys: selectCitys,
      selectAreas: selectAreas,
    };

    return areaService;
    // Service logic
    
    function initAreas(vm) {
      var manager = authService.getManager();
      var names = manager.districts.map(function (item) {
        return { id: item.id, name: item.name };
      })
      vm.zones = [], vm.areas = [], vm.citys = [];
      if (manager.districtType === 'country') {
        getNextDistricts(manager.districts[0].id)
          .then(function (res) {
            vm.zones = res.map(function (item) {
              return { id: item.id, name: item.name };
            })
          }, function (res) {
            console.log(res);
          });
      } else if (manager.districtType === 'zone') {
        getNextTwoDistricts(manager.districts[0].id)
          .then(function (res) {
            vm.citys = res.map(function (item) {
              return { id: item.id, name: item.name };
            })
          }, function (res) {
            console.log(res);
          });
        // vm.zones = names;
      } else if (manager.districtType === 'city') {
        vm.citys = names;
      } else if (manager.districtType === 'region') {
        vm.areas = names;
      }
    }

    function getNextDistricts(ids) {
      return dataService
        .getNextDistricts(ids)
        .then(function (res) {
          return res.data.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getNextTwoDistricts(ids) {
      return dataService
        .getNextTwoDistricts(ids)
        .then(function (res) {
          return res.data.data;
        }, function (res) {
          console.log(res);
        });
    }

    function getNextMiniSuppliers(ids) {
      return dataService
        .getNextMiniSuppliers(ids)
        .then(function (res) {
          return res.data.data;
        }, function (res) {
          console.log(res);
        });
    }

    function selectZones(vm) {
      if (vm.selectedZones.length === 0) {
        delete vm.query.type;
        delete vm.query.ids;
        vm.citys = [];
        vm.selectedCitys = [];
        vm.areas = [];
        vm.selectedAreas = [];
      } else {
        var ids = vm.selectedZones.map(function (item) {
          return item.id;
        }).join(",");
        vm.query.type = 1;
        vm.query.ids = ids;

        getNextTwoDistricts(ids)
          .then(function (res) {
            vm.citys = res;
          }, function (res) {
            console.log(res);
          });
      }
    }

    function selectCitys(vm) {
      if (vm.selectedCitys.length === 0) {
        if (vm.selectedZones && vm.selectedZones.length > 0) {
          vm.query.type = 1;
          vm.query.ids = vm.selectedZones.map(function (item) {
            return item.id;
          }).join(",");
        } else {
          delete vm.query.type;
          delete vm.query.ids;
        }

        vm.areas = [];
        vm.selectedAreas = [];
      } else {
        var ids = vm.selectedCitys.map(function (item) {
          return item.id;
        }).join(",");
        vm.query.type = 2;
        vm.query.ids = ids;

        if (vm.isMiniSupplier) {
          getNextMiniSuppliers(ids)
            .then(function (res) {
              vm.areas = res;
            }, function (res) {
              console.log(res);
            });
        } else {
          getNextDistricts(ids)
            .then(function (res) {
              vm.areas = res;
            }, function (res) {
              console.log(res);
            });
        }

      }
    }

    function selectAreas(vm) {
      if (vm.selectedAreas.length === 0) {
        vm.query.type = 2;
        vm.query.ids = vm.selectedCitys.map(function (item) {
          return item.id;
        }).join(",");
      } else {
        var ids = vm.selectedAreas.map(function (item) {
          return item.id;
        }).join(",");
        vm.query.type = 3;
        vm.query.ids = ids;
      }
    }
  }
})();