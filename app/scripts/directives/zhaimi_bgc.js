(function(){
'use strict';

/**
 * @ngdoc directive
 * @name chopperApp.directive:zhaimiBgc
 * @description
 * # zhaimiBgc
 */
angular.module('chopperApp')
  .directive('zhaimiBgc', zhaimiBgc);
  
  function zhaimiBgc() {
    var directive = {
      restrict: 'EA',
      scope: {
        bgcRate: "=bgcRate",        // 过渡色百分百
        startColor: "=startColor",  // 过渡色起始色值
        endColor: "=endColor",      // 过渡色终止色值
        bgColor: "=bgColor"         // 独立设置的颜色值
      },
      link: postLink
    };
    
    return directive;
    
    function postLink(scope, element, attrs) {
      var startColor = scope.startColor || "#ffffff",
          endColor = scope.endColor || "#000000",
          color = "#ffffff";
      if (scope.bgcRate) {
        color = getPercentageColor(startColor, endColor, scope.bgcRate);
      } else if (scope.bgColor) {
        color = scope.bgColor;
      } else {
        return;
      }
      element.css("background-color", color);
    }
    
    function getPercentageColor(startColor, endColor, percentage) {
      var startRGB = colorRgb(startColor), //转换为rgb数组模式
          startR = startRGB[0],
          startG = startRGB[1],
          startB = startRGB[2];

      var endRGB = colorRgb(endColor),
          endR = endRGB[0],
          endG = endRGB[1],
          endB = endRGB[2];
      var sR = startR + (endR - startR) * percentage,
          sG = startG + (endG - startG) * percentage,
          sB = startB + (endB - startB) * percentage;
          
      return 'rgb('+parseInt(sR)+','+parseInt(sG)+','+parseInt(sB)+')';
      // console.log(sR + "  " + sG + "  " + sB);
    }
    
    function colorRgb(sColor){
       var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
       var sColor = sColor.toLowerCase();
       if(sColor && reg.test(sColor)){
           if(sColor.length === 4){
               var sColorNew = "#";
               for(var i=1; i<4; i+=1){
                   sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
               }
               sColor = sColorNew;
           }
           //处理六位的颜色值
           var sColorChange = [];
           for(var i=1; i<7; i+=2){
               sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
           }
           return sColorChange;
       }else{
           return sColor;
       }
   };
    
  }
})();