(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name chopperApp.dateService
   * @description
   * # dateService
   * Factory in the chopperApp.
   */
  angular.module('chopperApp')
    .factory('dateService', dateService);

  function dateService() {
    // Public API here
    var service = {
      parseDate: parseDate,
      toString: toString,
      getNowStr: getNowStr,
      getDaysFromNow: getDaysFromNow,
      getWeekString: getWeekString,
      getLastMonthFirstDay: getLastMonthFirstDay,
      getLastMonthLastDay: getLastMonthLastDay
    };
    return service;
    // Service logic
    function parseDate(string) {
      return moment(string, 'YYYY-MM-DD').toDate();
    }

    function toString(date) {
      return moment(date).format('YYYY-MM-DD');
    }
    
    function getNowStr() {
      return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    }

    function getDaysFromNow(n) {
      return new Date(new Date().getTime() + n * 24 * 60 * 60 * 1000);
      // return moment(new Date()).add(n, 'day');
    }

    function getDaysFromDate(date, n) {
      // return new Date(date.getTime() + n * 24 * 60 *60 * 1000);
      return moment(date).add(n, 'day').toDate();
    }

    function getWeekString(year, week) {
      var thisWeek = getDate(year, week, 1),
          nextWeek = getDaysFromDate(thisWeek, 6);
      return toString(thisWeek) + "~" + toString(nextWeek);
    }

    /**
     * 获取某年year的第weekNumber个星期的星期weekday的日期
     */
    function getDate(year, weekNumber, weekday) {
      var result = null;
      var jan4 = new Date(year, 0, 4);
      var weekdayofjan4 = jan4.getDay() == 0 ? 7 : jan4.getDay();
      var days = weekNumber * 7 + weekday - (weekdayofjan4 + 3);

      if (days <= 0) {
        result = new Date(year - 1, 0, 1);
        result.setDate(days + getDayNumber(year - 1));
      } else if (days > getDayNumber(year)) {
        result = new Date(year + 1, 0, 1);
        result.setDate(days - getDayNumber(year));
      } else {
        result = new Date(year, 0, 1);
        result.setDate(days);
      }
      return result;
    }

    function getDayNumber(year) {
      return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
      return (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0));
    }
    
    /**
     * 获取上个月的第一天日期对象
     */ 
    function getLastMonthFirstDay() {
      var now = new Date();
      return getMonthFirstDay(now.getFullYear(), now.getMonth());
    }
    
    /**
     * 获取上个月的最后一天日期对象
     */ 
    function getLastMonthLastDay() {
      var now = new Date();
      var thisMonthFirstDay = getMonthFirstDay(now.getFullYear(), now.getMonth()+1);
      return getDaysFromDate(thisMonthFirstDay, -1);
    }
    
    /**
     * 获取某年某月的第一天日期对象
     */
    function getMonthFirstDay(year, month) {
      var dayStr = year + "-" + month + "-01";
      return parseDate(dayStr);
    }
  }
})();
