(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.dataService
   * @description
   * # dataService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('dataService', dataService);

  function dataService($http) {
    // Public API here
    var exports = {
      getBonusSumData: getBonusSumData,
      getBonusDetailData: getBonusDetailData,

      // v2.0 api
      getManager: getManager,
      getNextDistricts: getNextDistricts,
      getNextTwoDistricts: getNextTwoDistricts,
      getNextMiniSuppliers: getNextMiniSuppliers,
      smsCode: smsCode,
      
      getActiveStoreOverallForMiniSupplierByLastWeek : getActiveStoreOverallForMiniSupplierByLastWeek,
      getActiveStoreOverallForMiniSupplierByLastTwoWeek : getActiveStoreOverallForMiniSupplierByLastTwoWeek,
      getActiveStoreOverallForMiniSupplierByLastFourWeek : getActiveStoreOverallForMiniSupplierByLastFourWeek,

      getActiveStoreInfoFromMiniSupplierByLastWeek : getActiveStoreInfoFromMiniSupplierByLastWeek,
      getActiveStoreInfoFromMiniSupplierByLastTwoWeek : getActiveStoreInfoFromMiniSupplierByLastTwoWeek,
      getActiveStoreInfoFromMiniSupplierByLastFourWeek : getActiveStoreInfoFromMiniSupplierByLastFourWeek,
      getActiveStoreDetailsFromMiniSupplierByLastWeek : getActiveStoreDetailsFromMiniSupplierByLastWeek,
      getActiveStoreDetailsFromMiniSupplierByLastTwoWeek : getActiveStoreDetailsFromMiniSupplierByLastTwoWeek,
      getActiveStoreDetailsFromMiniSupplierByLastFourWeek : getActiveStoreDetailsFromMiniSupplierByLastFourWeek,

      getActiveStoreLineFromMiniSupplierByLastWeek : getActiveStoreLineFromMiniSupplierByLastWeek,

      getActiveStoreInfoFromRegion : getActiveStoreInfoFromRegion,
      getActiveStoreDetailsFromRegion : getActiveStoreDetailsFromRegion,

      getKpi: getKpi,
      getKpiCompare: getKpiCompare,
      
      getMiniSupplierLineChartData : getMiniSupplierLineChartData,
      getMiniSupplierTableData : getMiniSupplierTableData,
      getMiniSupplierCoverageTableData: getMiniSupplierCoverageTableData,
      getMiniSupplierCoverageLineData: getMiniSupplierCoverageLineData,
      getMiniSupplierPurchaseOverallData : getMiniSupplierPurchaseOverallData,
      getMiniSupplierPurchaseLineData : getMiniSupplierPurchaseLineData,
      getMiniSupplierPurchaseTableData : getMiniSupplierPurchaseTableData,
      getMiniSupplierSaleOverallData : getMiniSupplierSaleOverallData,
      getMiniSupplierSaleTableData : getMiniSupplierSaleTableData,
      getMiniSupplierSalePieData : getMiniSupplierSalePieData,

      
      getSupplierData: getSupplierData,
      getWholeSalersData: getWholeSalersData,
      getBrandsData: getBrandsData,
      
      getStoreData: getStoreData,
      getSchoolsDataByPage: getSchoolsDataByPage,
      getStoresDataByPage: getStoresDataByPage,

      getStoreBusinessData: getStoreBusinessData,
      getStoreBusinessDataByPage: getStoreBusinessDataByPage,
      getStoreDataByPage: getStoreDataByPage,
      
      getStoreInfoDate: getStoreInfoDate,
      getStoreInfoTable: getStoreInfoTable,
      getStoreInfoSection: getStoreInfoSection,
      getStoreInfoStores: getStoreInfoStores,
      
      getCustomerTransactions: getCustomerTransactions,
      getPhoneDailSupervisitionData: getPhoneDailSupervisitionData,
      getExportPhoneSupervisitionData: getExportPhoneSupervisitionData,
      
      getSubsidy: getSubsidy,
      getSubsidyDetail: getSubsidyDetail,
      getCustomerBonus: getCustomerBonus,
      
      getCityOrder: getCityOrder,
      getCityOrderRate: getCityOrderRate,
      getCityPhoneRate: getCityPhoneRate,
      getSmsNotify: getSmsNotify,
      getSmsNotifyAll: getSmsNotifyAll,
      getSupervisionUv: getSupervisionUv,
      getSupervisionUvRate: getSupervisionUvRate,
      
      getPhoneRetention: getPhoneRetention,
      getPermeationRate: getPermeationRate,
      getPermeationData: getPermeationData,
      getStoreRetention: getStoreRetention,
      
      getRealTimeProvData: getRealTimeProvData,
      getRealTimeAllUntilNow: getRealTimeAllUntilNow,
      getRealTimePerSecond: getRealTimePerSecond,
      getRealTimeStore: getRealTimeStore,
      getReatimeStoreByMiniSupplier: getReatimeStoreByMiniSupplier,
      getReatimeStoreByMiniSection: getReatimeStoreByMiniSection,
      getReatimeStoreByStore: getReatimeStoreByStore,
      
      getPvuv: getPvuv,
      getExportDailyTrack: getExportDailyTrack,
      
      getCompetitionData: getCompetitionData,
      
      getMarketingBasicData: getMarketingBasicData,
      getOrderPerUvRate: getOrderPerUvRate,
      getOrderPerUvExportRate: getOrderPerUvExportRate,
      
      getActivityList: getActivityList,
      getActivityChannel: getActivityChannel,
      getActivityPageEvent: getActivityPageEvent,
      getActivityPageEventByPage: getActivityPageEventByPage,
      getActivityButtonEvent: getActivityButtonEvent,
      getActivityWeekPvUv: getActivityWeekPvUv,
      getRetentionDay: getRetentionDay,
      // getRetentionWeek: getRetentionWeek,
      getRetentionDayOnline: getRetentionDayOnline,
      // getRetentionWeekOnline: getRetentionWeekOnline,
      getNewStorerIncrement: getNewStorerIncrement,
      
      getRegionStoreOverall: getRegionStoreOverall,
      getRegionStoreLine: getRegionStoreLine,
      getRegionStoreTable: getRegionStoreTable,
      getRegionStoreSection: getRegionStoreSection,
      getRegionStoreStores: getRegionStoreStores,

      getRegionRealTimeStore: getRegionRealTimeStore,
      getRegionRealTimeStoreBySection: getRegionRealTimeStoreBySection,
      getRegionRealTimeStoreByCampus: getRegionRealTimeStoreByCampus,
      getManagerAndCampusIsBinding: getManagerAndCampusIsBinding,
      deleteOneForBind: deleteOneForBind,
      getCampusByCity: getCampusByCity,
      addOrUpdateManager: addOrUpdateManager,
      sendSmsCodeToManager: sendSmsCodeToManager,
      getBindCampusByManger:getBindCampusByManger,
      tipNoBindingCampus:tipNoBindingCampus,
      getStorehouseData:getStorehouseData,
      createManager: createManager,
    },

    defaultBaseUrl = '/chopper/api/v3',
    baseUrlKey = 'zhaimeApiBaseUrl',
    baseUrl = localStorage[baseUrlKey] || defaultBaseUrl;

    // Function for using local API server for all requests.
    // Usage: Type javascript:dapi() in address bar to enable.
    // Or: javascript:dapi('/custom/path') to use custom path.
    // Use javascript:dapi(false) to disable debugging.
    // This works great by default with `npm install -g corsproxy`.
    window.dapi = function (url, options) {
      if (arguments.length === 0) {
        url = 'http://127.0.0.1:1337/127.0.0.1:8080' + defaultBaseUrl;
      }
      if (!url || url === 'off') {
        baseUrl = defaultBaseUrl;
        delete localStorage[baseUrlKey];
      } else {
        localStorage[baseUrlKey] = exports.baseUrl = baseUrl = url;
      }
      if (!options || options.reload !== false) location.reload();
    };
    exports.baseUrl = baseUrl;
    return exports;

    // Service logic
    /* trank data begin */
     
    // function getStoreTrackData() {
    //   return $http.get(baseUrl + '/dailyStoreTrackReport/getAllData');
    // }
    
    // function getWebTrackData() {
    //   return $http.get(baseUrl + '/dailyWebTrackReport/getAllData');
    // }
    
    // function getMeituanTrackData() {
    //   return $http.get(baseUrl + '/dailyMeituanTrackReport/getAllData');
    // }
    
    /* trank data end */
    
    /* event data begin */
    
    function getBonusSumData() {
      return $http.get(baseUrl + '/bonus/getSumData/');
    }
    
    function getBonusDetailData() {
      return $http.get(baseUrl + '/bonus/getDetailData/');
    }
    
    /* event data end */
    
    
    // v2.0 api
    function getManager() {
      return $http.get(baseUrl + '/manager');
    }
    
    function getNextDistricts(ids) {
      return $http.get(baseUrl + '/districts/next', {params: {ids:ids}});
    }
    
    function getNextTwoDistricts(ids) {
      return $http.get(baseUrl + '/districts/next_two', {params: {ids:ids}});
    }
    
    function getNextMiniSuppliers(ids) {
      return $http.get(baseUrl + '/districts/store', {params: {ids:ids, type:3}});
    }
    
    // 获取短信验证码
    function smsCode(params) {
      return $http.post(baseUrl + '/auth/token/code', params);
    }

    //活跃数据--按选定纬度统计总数据
    function getActiveStoreOverallForMiniSupplierByLastWeek(params) {
      return $http.get(baseUrl + '/active/from_mini_supplier/overall/last_week', {params: params})
    }

    function getActiveStoreOverallForMiniSupplierByLastTwoWeek(params) {
      return $http.get(baseUrl + '/active/from_mini_supplier/overall/last_two_week', {params: params})
    }

    function getActiveStoreOverallForMiniSupplierByLastFourWeek(params) {
      return $http.get(baseUrl + '/active/from_mini_supplier/overall/last_four_week', {params: params})
    }
    
    //活跃数据--按微仓纬度统计活跃店铺数据
    function getActiveStoreInfoFromMiniSupplierByLastWeek(params) {
      return $http.get(baseUrl + '/active/from_mini_supplier/info/last_week', {params: params})
    }

    function getActiveStoreInfoFromMiniSupplierByLastTwoWeek(params) {
      return $http.get(baseUrl + '/active/from_mini_supplier/info/last_two_week', {params: params})
    }

    function getActiveStoreInfoFromMiniSupplierByLastFourWeek(params) {
      return $http.get(baseUrl + '/active/from_mini_supplier/info/last_four_week', {params: params})
    }

    //活跃数据--按微仓纬度查询活跃店铺的详情
    function getActiveStoreDetailsFromMiniSupplierByLastWeek(params) {
      return $http.get(baseUrl + '/active/from_mini_supplier/details/last_week', {params: params})
    }

    function getActiveStoreDetailsFromMiniSupplierByLastTwoWeek(params) {
      return $http.get(baseUrl + '/active/from_mini_supplier/details/last_two_week', {params: params})
    }

    function getActiveStoreDetailsFromMiniSupplierByLastFourWeek(params) {
      return $http.get(baseUrl + '/active/from_mini_supplier/details/last_four_week', {params: params})
    }

    function getActiveStoreLineFromMiniSupplierByLastWeek(params) {
      return $http.get(baseUrl + '/active/from_mini_supplier/line/last_week', {params: params})
    }

    //活跃数据--按学校纬度统计活跃店铺数据
    function getActiveStoreInfoFromRegion(params) {
      return $http.get(baseUrl + '/active/from_region/info', {params: params})
    }

    //活跃数据--按学校纬度查询活跃店铺详情
    function getActiveStoreDetailsFromRegion(params) {
      return $http.get(baseUrl + '/active/from_region/details', {params: params})
    }

    // 获取kpi详细数据
    function getKpi(params) {
      return $http.get(baseUrl + '/kpi', {params: params});
    }
    
    // 获取kpi总数据和同比环比
    function getKpiCompare(params) {
      return $http.get(baseUrl + '/kpi/compare', {params: params});
    }
    
    function getMiniSupplierLineChartData(params) {
      return $http.get(baseUrl + '/mini_suppliers', {params: params});
    }
    
    function getMiniSupplierTableData(params) {
      return $http.get(baseUrl + '/mini_suppliers/data', {params: params});
    }

    function getMiniSupplierCoverageTableData(params) {
      return $http.get(baseUrl + '/mini_suppliers/coverage/table', {params: params});
    }

    function getMiniSupplierCoverageLineData(params) {
      return $http.get(baseUrl + '/mini_suppliers/coverage/line', {params: params});
    }

    function getMiniSupplierPurchaseOverallData(params) {
      return $http.get(baseUrl + '/mini_suppliers/purchase/overall', {params: params});
    }

    function getMiniSupplierPurchaseLineData(params) {
      return $http.get(baseUrl + '/mini_suppliers/purchase/line', {params: params});
    }

    function getMiniSupplierPurchaseTableData(params) {
      return $http.get(baseUrl + '/mini_suppliers/purchase/table', {params: params});
    }
    
    function getMiniSupplierSaleOverallData(params) {
      return $http.get(baseUrl + '/mini_suppliers/sale/overall', {params: params});
    }

    function getMiniSupplierSaleTableData(params) {
      return $http.get(baseUrl + '/mini_suppliers/sale/table', {params: params});
    }

    function getMiniSupplierSalePieData(params) {
      return $http.get(baseUrl + '/mini_suppliers/sale/pie', {params: params});
    }

    function getSupplierData(params) {
      return $http.get(baseUrl + '/suppliers', {params: params});
    }
    
    function getWholeSalersData(params) {
      return $http.get(baseUrl + '/suppliers/wholesalers', {params: params});
    }
    
    function getBrandsData(params) {
      return $http.get(baseUrl + '/suppliers/brands', {params: params});
    }
    
    function getStoreData(params) {
      return $http.get(baseUrl + '/store_data', {params: params});
    }
    
    function getSchoolsDataByPage(params) {
      return $http.get(baseUrl + '/store_data/schools', {params: params});
    }
    
    function getStoresDataByPage(params) {
      return $http.get(baseUrl + '/store_data/stores', {params: params});
    }
    
    function getStoreBusinessData(params) {
      return $http.get(baseUrl + '/store_businesses', {params: params});
    }
    
    function getStoreBusinessDataByPage(params) {
      return $http.get(baseUrl + '/store_businesses/schools', {params: params});
    }
    
    function getStoreDataByPage(params) {
      return $http.get(baseUrl + '/store_businesses/buildings', {params: params});
    }
    
    // 查询店长总数据信息(以微仓角度)
    function getStoreInfoDate(params) {
      return $http.get(baseUrl + '/store_info', {params: params});
    }
    
    // 查询店长总数据信息(以微仓角度)
    function getStoreInfoTable(params) {
      return $http.get(baseUrl + '/store_info/table', {params: params});
    }
    
    // 查询店长总数据信息(以微仓角度)
    function getStoreInfoSection(params) {
      return $http.get(baseUrl + '/store_info/section', {params: params});
    }
    
    // 查询店长总数据信息(以微仓角度)
    function getStoreInfoStores(params) {
      return $http.get(baseUrl + '/store_info/stores', {params: params});
    }
      
    // 查询用户交易数据信息
    function getCustomerTransactions(params) {
      return $http.get(baseUrl + '/customer_transactions', {params: params});
    }
    
    // 监控学校每日异常手机号数量
    function getPhoneDailSupervisitionData(params) {
      return $http.get(baseUrl + '/phone_supervision', {params: params});
    }
    
    function getExportPhoneSupervisitionData(params) {
      return $http.get(baseUrl + '/phone_supervision/exportData', {params: params});
    }
    
    // 用户红包
    function getSubsidy() {
      return $http.get(baseUrl + '/subsidy');
    }
    
    function getSubsidyDetail(params) {
      return $http.get(baseUrl + '/subsidy/detail', {params: params});
    }
    
    function getCustomerBonus(params) {
      return $http.get(baseUrl + '/subsidy/bonus', {params: params});
    }
    
    // 监控城市订单数量异常
    function getCityOrder(params) {
      return $http.get(baseUrl + '/cityOrder', {params: params});
    }
    
    function getCityOrderRate(params) {
      return $http.get(baseUrl + '/cityOrder/orderRate', {params: params});
    }
    
    function getCityPhoneRate(params) {
      return $http.get(baseUrl + '/cityOrder/phoneRate', {params: params});
    }
    
    // 获取短信监控数据合计
    function getSmsNotify(params) {
      return $http.get(baseUrl + '/smsNotify', {params: params});
    }
    
    // 获取短信监控数据原始
    function getSmsNotifyAll(params) {
      return $http.get(baseUrl + '/smsNotify/original', {params: params});
    }
    
    // 获取平均每uv产生订单数的折线数据
    function getSupervisionUvRate(params) {
      return $http.get(baseUrl + '/supervision_uv/rate', {params: params});
    }
    
    // 获取平均每uv产生订单数
    function getSupervisionUv(params) {
      return $http.get(baseUrl + '/supervision_uv', {params: params});
    }
    
    // 获取用户手机号留存率
    function getPhoneRetention(params) {
      return $http.get(baseUrl + '/phoneRetention', {params: params});
    }

    // 获取用户渗透率比率
    function getPermeationRate(params) {
      return $http.get(baseUrl + '/sectionNumberInfo/rate', {params: params});
    }
    
    // 获取用户渗透率原数据
    function getPermeationData(params) {
      return $http.get(baseUrl + '/sectionNumberInfo/original', {params: params});
    }
    
    // 获取店铺渗透率
    function getStoreRetention(params) {
      return $http.get(baseUrl + '/storeRetention', {params: params});
    }
    
    // 获取当天用户实时省份数据
    function getRealTimeProvData() {
      return $http.get(baseUrl + '/intime/store');
    }
    
    // 获取当天用户每分钟全国数据
    function getRealTimeAllUntilNow(params) {
      return $http.get(baseUrl + '/intime/date', {params: params});
    }
    
    // 获取当天用户当前分钟全国数据
    function getRealTimePerSecond() {
      return $http.get(baseUrl + '/intime/second');
    }
    
    // 获取实时夜猫店数据new
    function getRealTimeStore(params) {
      return $http.get(baseUrl + '/realTimeStore', {params: params});
    }
    
    // 获取实时夜猫店微仓数据new
    function getReatimeStoreByMiniSupplier(params) {
      return $http.get(baseUrl + '/realTimeStore/mini_supplier', {params: params});
    }
    
    // 获取实时夜猫店学校数据new
    function getReatimeStoreByMiniSection(params) {
      return $http.get(baseUrl + '/realTimeStore/section', {params: params});
    }
    
    // 获取实时夜猫店店铺数据new
    function getReatimeStoreByStore(params) {
      return $http.get(baseUrl + '/realTimeStore/stores', {params: params});
    }
    
    // 获取页面的pvuv
    function getPvuv(params) {
      return $http.get(baseUrl + '/pvUv', {params: params});
    }
    
    // 获得每天的页面访问量数据
    function getExportDailyTrack(params) {
      return $http.get(baseUrl + '/exportDailyTrack', {params: params});
    }
    
    // 获取竞争对手数据
    function getCompetitionData(params) {
      return $http.get(baseUrl + '/spider', {params: params});
    }
    
    // 获取营销业务基础数据
    function getMarketingBasicData(params) {
      return $http.get(baseUrl + '/market', {params: params});
    }
    
    // 获取订单UV比
    function getOrderPerUvRate(params) {
      return $http.get(baseUrl + '/market/rate', {params: params});
    }
    
    // 获取订单UV比的导出数据
    function getOrderPerUvExportRate(params) {
      return $http.get(baseUrl + '/market/expRate', {params: params});
    }
    
    // 获取营销活动列表
    function getActivityList() {
      return $http.get(baseUrl + '/activity');
    }
    
    // 获取营销活动涉及的平台列表
    function getActivityChannel(params) {
      return $http.get(baseUrl + '/activity/channel', {params: params});
    }
    
    // 获取营销活动的页面pv,uv  按时间聚合数据
    function getActivityPageEvent(params) {
      return $http.get(baseUrl + '/activity/pageEvent', {params: params});
    }
    
    // 获取营销活动的页面pv,uv  按页面聚合数据
    function getActivityPageEventByPage(params) {
      return $http.get(baseUrl + '/activity/pageEventGroupByPageId', {params: params});
    }
    
    // 获取营销活动的组件点击量数据
    function getActivityButtonEvent(params) {
      return $http.get(baseUrl + '/activity/buttonEvent', {params: params});
    }
    
    // 获取营销活动页面的周访问量
    function getActivityWeekPvUv(params) {
      return $http.get(baseUrl + '/activity/buttonEventWeek', {params: params});
    }
    
    
    // 宅米活动期间的新用户的日留存率
    function getRetentionDay(params) {
      return $http.get(baseUrl + '/activity/retentionDay', {params: params});
    }
    
    // 宅米活动期间的新用户的周留存率
    // function getRetentionWeek(params) {
    //   return $http.get(baseUrl + '/activity/retentionWeek', {params: params});
    // }
    
    // 活动带来的的新用户的日留存率
    function getRetentionDayOnline(params) {
      return $http.get(baseUrl + '/activity/retentionDayOnline', {params: params});
    }
    
    // 活动带来的的新用户的周留存率
    // function getRetentionWeekOnline(params) {
    //   return $http.get(baseUrl + '/activity/retentionWeekOnline', {params: params});
    // }
    
    // 获取活动期间新楼主增量
    function getNewStorerIncrement(params) {
      return $http.get(baseUrl + '/activity/newIncrementStorer', {params: params});
    }
    
    
    // 获取区域数据
    function getRegionStoreOverall(params) {
      return $http.get(baseUrl + '/region_store/overall', {params: params});
    }
    
    // 获取区域数据
    function getRegionStoreLine(params) {
      return $http.get(baseUrl + '/region_store/line', {params: params});
    }
    
    // 获取区域数据
    function getRegionStoreTable(params) {
      return $http.get(baseUrl + '/region_store/table', {params: params});
    }
    
    // 获取区域数据
    function getRegionStoreSection(params) {
      return $http.get(baseUrl + '/region_store/section', {params: params});
    }
    
    // 获取区域数据
    function getRegionStoreStores(params) {
      return $http.get(baseUrl + '/region_store/stores', {params: params});
    }

    //获取区域实时店铺数据
    function getRegionRealTimeStore(params) {
      return $http.get(baseUrl + '/realTimeStore_region', {params: params});
    }

    //根据区域获取学校店铺
     function getRegionRealTimeStoreBySection(params) {
      return $http.get(baseUrl + '/realTimeStore_region/section', {params: params});
    }

    //根据学校获取店铺
     function getRegionRealTimeStoreByCampus(params) {
      return $http.get(baseUrl + '/realTimeStore_region/stores', {params: params});
    }

    //获取已绑定和未绑定的学校
    function getManagerAndCampusIsBinding(params) {
      return $http.get(baseUrl + '/region_section_relation', {params: params});
    }

    //删除已绑定或未绑定的学校
    function deleteOneForBind(params) {
      return $http.get(baseUrl + '/region_section_relation/delete', {params: params});
    }

    //根据城市获取所有学校
    function getCampusByCity(params) {
      return $http.get(baseUrl + '/region_section_relation/sections', {params: params});
    }

    // //根据城市获取所有学校
    // function getCampusByCity(params) {
    //   return $http.get(baseUrl + '/region_section_relation/nobinding_sections', {params: params});
    // }

    //保存或修改区域经理记录
     function addOrUpdateManager(manager) {
      return $http.post(baseUrl + '/region_section_relation/update', manager);
    }

    //发送验证码给城市经理
    function sendSmsCodeToManager() {
      return $http.get(baseUrl + '/region_section_relation/smsCode');
    }
    
    //根据managerId查询已绑定的学校
    function getBindCampusByManger(params) {
      return $http.get(baseUrl + '/region_section_relation/manager', {params: params});
    }

    //根据managerId获取所有未绑定的学校
    function tipNoBindingCampus() {
      return $http.get(baseUrl + '/region_section_relation/nobinding/city_manger');
    }

    function createManager(manager) {
      return $http.post(baseUrl + '/region_section_relation/create', manager);
    }

    //获取微仓库存数据
    function getStorehouseData(params) {
      return $http.get(baseUrl + '/suppliers_supervision', {params: params});
    }

  }

})();
