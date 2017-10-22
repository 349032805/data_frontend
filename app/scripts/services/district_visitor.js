(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.districtVisitor
   * @description
   * # districtVisitor
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('districtVisitor', districtVisitor);

  function districtVisitor(districtHierarchy) {
    // public api

    function districtVisitor(fetchFunc) {
      this.fetchFunction = fetchFunc;
      this.districtLevels = {};
      this.levelCurrent = '';
      this.levelNext = null;
    }

    districtVisitor.prototype.loadRoot = loadRoot;
    districtVisitor.prototype.loadNextLevel = loadNextLevel;
    districtVisitor.prototype.reloadCurrentLevel = reloadCurrentLevel;
    districtVisitor.prototype.setCurrentLevel = setCurrentLevel;
    districtVisitor.prototype.getCurrentLevel = getCurrentLevel;
    return districtVisitor;

    function loadRoot(query) {
      var dv = this;
      return dv.fetchFunction(query)
        .then(function(res) {
          if(res.length > 0) {
            dv.districtLevels.root = {
              name: districtHierarchy[res[0].districtType].name,
              districts: res,
              level: districtHierarchy[res[0].districtType].level + 1,
            };
          } else {
            dv.districtLevels.root = {
              name: districtHierarchy.none.name,
              districts: res,
              level: districtHierarchy.none.level,
            };
          }
          dv.levelCurrent = 'root';
        });
    }

    function getCurrentLevel() {
      var dv = this;
      return dv.districtLevels[dv.levelCurrent];
    }

    function loadNextLevel(query, district) {
      var dv = this;
      return dv.fetchFunction(query)
        .then(function(res) {
          if (res) {
            dv.districtLevels[district.districtType] = {
            name: district.name,
            districts: res,
            level: districtHierarchy[district.districtType].level,
            districtId: district.id,
          };
          for (var i in districtHierarchy) {
            if (districtHierarchy[i].level
                === (districtHierarchy[district.districtType].level - 1)) {
              dv.levelNext = i;
              break;
            }
          }
          dv.levelCurrent = district.districtType;
          }
        });
    }

    function reloadCurrentLevel(query) {
      var dv = this;
      var currentLevel = dv.districtLevels[dv.levelCurrent];
      dv.fetchFunction(query)
        .then(function(res) {
          currentLevel.districts = res;
        });
    }

    function setCurrentLevel(levelName) {
      var dv = this;
      if (dv.levelCurrent === levelName) {return;}
      var level = dv.districtLevels[levelName].level;
      for (var l in dv.districtLevels) {
        if (dv.districtLevels[l].level === (level - 1)) {
          dv.levelNext = l;
        }
        if (dv.districtLevels[l].level < level) {
          delete dv.districtLevels[l];
        }
      }
      dv.levelCurrent = levelName;
    }


  }
})();
