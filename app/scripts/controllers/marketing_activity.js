(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:MarketingActivityCtrl
   * @description
   * # MarketingActivityCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('MarketingActivityCtrl', MarketingActivityCtrl);

  function MarketingActivityCtrl(marketingService, dateService, $scope) {
    var vm = this;
    vm.openDatepicker = openDatepicker;
    vm.selectStart = selectStart;
    vm.selectEnd = selectEnd;
    vm.hasChanel = hasChanel;
    vm.selectActivity = selectActivity;
    vm.onFunnelOver = onFunnelOver;
    vm.selectDataType = selectDataType;
    vm.selectPlatform = selectPlatform;
    vm.onSearch = onSearch;
    activate();

    function activate() {
      vm.datepicker = {
        start: {
          open: false,
          model: dateService.getDaysFromNow(-7),
        },
        end: {
          open: false,
          model: dateService.getDaysFromNow(-1),
        },
      };
      vm.yesterday = dateService.getDaysFromNow(-1);

      vm.activity = {
        index: "uv",            // 默认展示uv数据
        activityOriList: [],    // 原始活动列表
        activityList: [],       // 时间过滤后的活动列表
        selectedActivity: "",   // 当前选中的活动
        platform: "",           // 当前选中的平台
        channelList: [],        // 活动的线上平台
        everyDayOption: {},     // marketingService.getBarOption(),
        totalOption: {},        // marketingService.getBarOption(),
        funnelOption: {},       // marketingService.getFunnelOption(),
        pieOption: {},          // marketingService.getPieOption(),
        eventDatas: [{ name: "按钮1", times: 234 }, { name: "按钮2", times: 435 }],
        weekDatas: [{ week: 1, pv: 325, uv: 231 }, { week: 2, pv: 34536, uv: 23343 }]
      };

      getActivityList();

    }

    function openDatepicker(index) {
      // vm.datepicker[index].open = true;
    }

    function selectStart() {
      // vm.datepicker.end.model = vm.datepicker.start.model;
      filterActivityList();
    }

    function selectEnd() {
      filterActivityList();
    }

    function updateQueryDate() {
      vm.query.start = dateService.toString(vm.datepicker.start.model);
      vm.query.end = dateService.toString(vm.datepicker.end.model);
    }

    function selectActivity() {
      vm.datepicker.start.model = vm.activity.selectedActivity.startTime;
      vm.datepicker.end.model = vm.activity.selectedActivity.endTime;
      // onSearch();
    }

    function selectDataType(index) {
      if (vm.activity.index !== index) {
        vm.activity.index = index;
        vm.activity.everyDayOption = marketingService.getEveryDayBarOption(vm.activity.filteredDatas, index);
        vm.activity.totalOption = marketingService.getTotalBarOption(vm.activity.filteredDatas, index);
      }
    }
    
    function selectPlatform() {
      vm.activity.filteredDatas = filterByPlatform(vm.activity.pageEventDatas);
      vm.activity.everyDayOption = marketingService.getEveryDayBarOption(vm.activity.filteredDatas, vm.activity.index);
      vm.activity.totalOption = marketingService.getTotalBarOption(vm.activity.filteredDatas, vm.activity.index);
    }

    function onSearch() {
      getActivityChannel().then(function () {
        getActivityPageEvent();
        getActivityButtonEvent();
        getActivityPageEventByPage();
        // getActivityWeekPvUv();
        getRetentionDay();
        // getRetentionWeek();
        getRetentionDayOnline();
        // getRetentionWeekOnline();
        getNewStorerIncrement();
      });
    }

    function getActivityList() {
      return marketingService
        .getActivityList()
        .then(function (res) {
          vm.activity.activityOriList = res || [];
          vm.activity.activityList = vm.activity.activityOriList;
          if (vm.activity.activityList.length > 0) {
            vm.activity.selectedActivity = vm.activity.activityList[0];
            vm.datepicker.start.model = vm.activity.selectedActivity.startTime;
            vm.datepicker.end.model = vm.activity.selectedActivity.endTime;
            onSearch();
          }
        });
    }

    function filterActivityList() {
      vm.activity.activityList = vm.activity.activityOriList.filter(function (item) {
        return item.startTime >= dateService.toString(vm.datepicker.start.model);
        // && item.endTime <= dateService.toString(vm.datepicker.end.model);
      });
      if (vm.activity.activityList.length > 0) {
        vm.activity.selectedActivity = vm.activity.activityList[0];
        // onSearch();
      }
    }

    function getActivityChannel() {
      return marketingService
        .getActivityChannel({ activityId: vm.activity.selectedActivity.id })
        .then(function (res) {
          vm.activity.channelList = res || [];
          if (vm.activity.channelList.length > 0) {
            vm.activity.platform = vm.activity.channelList[0];
          }
        });
    }

    function hasChanel(channel) {
      for (var i = 0, len = vm.activity.channelList.length; i < len; i++) {
        var item = vm.activity.channelList[i];
        if (item.name === channel) {
          return true;
        }
      }
      return false;
    }

    function getActivityPageEvent() {
      return marketingService
        .getActivityPageEvent({ activityId: vm.activity.selectedActivity.id })
        .then(function (res) {
          vm.activity.pageEventDatas = res || [];
          vm.activity.filteredDatas = filterByPlatform(vm.activity.pageEventDatas);
          vm.activity.everyDayOption = marketingService.getEveryDayBarOption(vm.activity.filteredDatas, vm.activity.index);
          vm.activity.totalOption = marketingService.getTotalBarOption(vm.activity.filteredDatas, vm.activity.index);
          // vm.activity.funnelOption = marketingService.getFunnelOption(vm.activity.pageEventDatas);
        });
    }

    function filterByPlatform(pageDatas) {
      return pageDatas.filter(function (item) {
        return item.channelId === vm.activity.platform.channelId;
      });
    }

    function getActivityPageEventByPage() {
      return marketingService
        .getActivityPageEventByPage({ activityId: vm.activity.selectedActivity.id })
        .then(function (res) {
          vm.activity.pageEventByPageDatas = res || [];
          vm.activity.funnelOption = marketingService.getFunnelOption(vm.activity.pageEventByPageDatas);
          if (vm.activity.pageEventByPageDatas.length > 0) {
            vm.activity.pieOption = marketingService.getPieOption(vm.activity.pageEventByPageDatas[0]);
          }
        });
    }

    function getActivityButtonEvent() {
      return marketingService
        .getActivityButtonEvent({ activityId: vm.activity.selectedActivity.id })
        .then(function (res) {
          vm.activity.eventDatas = res || [];
        });
    }

    function getActivityWeekPvUv() {
      return marketingService
        .getActivityWeekPvUv({ activityId: vm.activity.selectedActivity.id })
        .then(function (res) {
          vm.activity.weekDatas = res || [];
        });
    }

    function onFunnelOver(item) {
      var pageData = {
        name: item.name,
        frontToCurrentTotalUv: item.data.frontToCurrentTotalUv,
        currentToBackTotalUv: item.data.currentToBackTotalUv,
        lostTotalUv: item.data.lostTotalUv
      }
      vm.activity.pieOption = marketingService.getPieOption(pageData);
      $scope.$apply();
    }

    function getRetentionDay() {
      return marketingService
        .getRetentionDay({ activityId: vm.activity.selectedActivity.id })
        .then(function (res) {
          vm.activity.retentionDayDatas = res || [];
          vm.activity.retentionDatas = marketingService.parseRetention(vm.activity.retentionDayDatas);
        });
    }
    
    // function getRetentionWeek() {
    //   return marketingService
    //     .getRetentionWeek({ activityId: vm.activity.selectedActivity.id })
    //     .then(function(res){
    //       vm.activity.retentionWeekDatas = res || [];
    //       debugger;
    //     });
    // }
    
    function getRetentionDayOnline() {
      return marketingService
        .getRetentionDayOnline({ activityId: vm.activity.selectedActivity.id })
        .then(function (res) {
          vm.activity.retentionDayOnlineDatas = res || [];
          vm.activity.onlineDatas = marketingService.parseRetention(vm.activity.retentionDayOnlineDatas);
        });
    }
    
    // function getRetentionWeekOnline() {
    //   return marketingService
    //     .getRetentionWeekOnline({ activityId: vm.activity.selectedActivity.id })
    //     .then(function(res){
    //       vm.activity.retentionWeekOnlineDatas = res || [];
    //       debugger;
    //     });
    // }
    
    function getNewStorerIncrement() {
      return marketingService
        .getNewStorerIncrement({ activityId: vm.activity.selectedActivity.id })
        .then(function (res) {
          vm.activity.newStores = res || [];
        });
    }
  }
})();