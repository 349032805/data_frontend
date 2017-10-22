(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name chopperApp.controller:ConfigManagerCtrl
   * @description
   * # ConfigManagerCtrl
   * Controller of the chopperApp
   */
  angular.module('chopperApp')
    .controller('ConfigManagerCtrl', ConfigManagerCtrl);

  function ConfigManagerCtrl(configService,areaService,notifyService,$interval) {
    var vm = this;
    
    // vm.onSearch = onSearch;

    vm.selectOpt = selectOpt;
    vm.selectIsBinding = selectIsBinding;
    vm.deleteOne = deleteOne;
    vm.deleteYes = deleteYes;
    // vm.submitting = submitting;
    vm.submitForm = submitForm;
    vm.onSearchForBind = onSearchForBind;
    vm.checkCampus = checkCampus;
    vm.modify = modify;
    vm.getSmsCode = getSmsCode;
    vm.smsCodeCountDown = 0;
    vm.selectCity = selectCity;
    vm.configCampus = configCampus;
    vm.cancelBind = cancelBind;
    vm.resetPasswd = resetPasswd;
    vm.useAccount = useAccount;
    vm.useYes = useYes;
    activate();

    function activate() {
      vm.query = { "cityId":'',"selectedBind": 'binding',"keyword":'',"ids":'',"managerId":''};
      // vm.queryTemp = [{ "selectedBind": 'binding',"keyword":'',"ids":''}];
      vm.manager = {"id":'',"name":'',"realName": '',"phone":'',"idNo":'',"managerNo":'',"managerId":'',"encryptedPassword":''};

      vm.selectedOpt = 'add';
      vm.optId;
      vm.optRealName;
      vm.searchTextForBind;
      vm.searchTextByCampus;
      vm.tablebTrType;
      vm.region = 'city';
      vm.smsCode;
      vm.cityId;
      vm.passwordStatus = "use";
      areaService.initAreas(vm);
    }

    function activateCountDown() {
      vm.smsCodeCountDown = 60;
      var countDown = $interval(function() {
        vm.smsCodeCountDown--;
        if (vm.smsCodeCountDown <= 0) {
          $interval.cancel(countDown);
        }
      }, 1000);
    }

    function getSmsCode() {
      if (vm.smsCodeCountDown) {
        return;
      }
     return configService.sendSmsCodeToManager()
        .then(function(res){
          //开始60秒计时
           activateCountDown();
        }, function(res){
          
        });
    }



    function selectOpt(opt){
      if (vm.selectedOpt === opt) {
        return;
      }
      vm.selectedOpt = opt;
      if(opt ==='add'){
          vm.manager.id = '';
          vm.manager.name = '';
          vm.manager.realName = '';
          vm.manager.phone = '';
          vm.manager.encryptedPassword = '';
          vm.passwordStatus = "use";

          vm.bindCampus = null;
          vm.campusList = null;
          vm.cityName ='';
          // vm.query.cityId ='';
          vm.query.id ='';
          vm.query.managerId ='';

      }
      if(opt ==='check'){
        tipNoBindingCampus();
        selectIsBinding('binding');
      }
      if(opt ==='modify'){

      }
    }

    function tipNoBindingCampus(){
      return configService
        .tipNoBindingCampus()
        .then(function(res) {
          vm.noBindingCampusList = res;
        }, function(res) {
            console.log(res);
        });
    }

    function selectIsBinding(isbinding){
      // if (vm.selectedIsBinding === isbinding) {
      //   return;
      // }
      vm.selectedIsBinding = isbinding;
      vm.query.selectedBind = isbinding;
      vm.query.keyword = '';
      queryDataForBind();
    }

    function deleteOne(managerId,name){
       vm.optId = managerId;
       vm.optRealName = name;
      $("#deleteConfirmDialog").modal('show');
    }

    function deleteYes(){
      vm.query.managerId = vm.optId;
     return configService
        .deleteOneForBind(vm.query)
        .then(function() {
          $("#deleteConfirmDialog").modal('hide');
          $("#useConfirmDialog").modal('hide');
          queryDataForBind();
          selectIsBinding('binding');

        }, function(res) {
            console.log(res);
        });
    }

    // function submitting(phone){
    //   var pattern = /^0?(13[0-9]|17[0-9]|15[0-9]|18[0-9]|14[57])[0-9]{8}$/;
    //   if(!pattern.test(phone)){
    //     return;
    //   }
    // }

    function submitForm(manager){
      if(manager.name.length == 0){
        notifyService.danger('账户名称不能为空');
        return;
      }

      if(manager.name.length<6){
        notifyService.danger('账户名称不能少于6位字符');
        return;
      }

      if(manager.realName.length == 0){
        notifyService.danger('姓名不能为空');
        return;
      }

      if(manager.phone.length == 0){
        notifyService.danger('手机号不能为空');
        return;
      }

      var pattern = /^0?(13[0-9]|17[0-9]|15[0-9]|18[0-9]|14[57])[0-9]{8}$/;
      // var telephoneReg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
      if(!pattern.test(manager.phone)){
        notifyService.danger('请正确输入手机号');
        return;
      }

      if(vm.selectedOpt == 'add'){
        if(!vm.manager.encryptedPassword){
          notifyService.danger('请填写密码');
          return;
        }

        if(manager.encryptedPassword.toString().length<8){
          notifyService.danger('密码不能少于8位字符');
          return;
        }

      }

      var idArr = [];
      if(vm.bindCampus){
        for(var i=0;i<vm.bindCampus.length;i++){
          idArr.push(vm.bindCampus[i].sectionId);
        }
      }
    

      // if(idArr.length ==0){
      //   notifyService.danger('请选择学校');
      //   return;
      // }

      if(vm.selectedOpt == 'add'){
        if(!vm.smsCode){
          notifyService.danger('请输入验证码');
          return;
        }
      }

      vm.manager.idNo = idArr.toString();
      vm.manager.id = vm.manager.managerId;
      vm.manager.managerNo = vm.smsCode;
      vm.manager.parentId = vm.query.cityId;

      if (vm.selectedOpt == 'add') {
        return configService
        .createManager(manager)
        .then(function(res) {
           if(res.code ==200){
            notifyService.success('创建成功');
            location.reload();
           }else{
             notifyService.danger(res.error);
           }
        }, function(res) {
           
        });
      } else {
        return configService
        .addOrUpdateManager(manager)
        .then(function(res) {
           if(res.code ==200){
            notifyService.success('修改成功');
            // location.reload();
            vm.selectedOpt = 'check';
            selectIsBinding('binding');

           }else{
             notifyService.danger(res.error);
           }
        }, function(res) {
           
        });
      }
      
    }

    function queryDataForCampus() {
       return configService
      .getCampusByCity(vm.query)
      .then(function(res) {
        vm.campusList = res;
        vm.campusList.sort(function(a) {
          if (a.managerId == null) {
            return -1
          } else {
            return 1
          };
        })


        //   var campusArr = [];

        //  for(var i=0;i<res.length;i++){
        //     var flag = false;
        //   for(var j=0;j<vm.bindCampus.length;j++){
        //     if(res[i].id == vm.bindCampus[j].id){
        //       // campusArr.push(res[i]);
        //       flag = true;
        //       res.splice(i,1);
        //     }

        //   }

        //  }

        // vm.campusList = campusArr;

      });
    }

    // function filterCampusData(datas) {
    //   vm.campusList = datas.map(function(item) {
    //     if (item.sectionName) {
    //       item.name = item.sectionName;
    //     } 
    //     return item;
    //   });
    // }

     function queryDataForBind() {
       return configService
      .getManagerAndCampusIsBinding(vm.query)
      .then(function(res) {
        vm.rowData = res;
      });
    }

    function queryBindCampusByManger() {
       return configService
      .getBindCampusByManger(vm.query)
      .then(function(res) {
        vm.bindCampus = res;

      });
    }

    function onSearchForBind(){
      vm.query.keyword = vm.searchTextForBind;
      queryDataForBind();
    }

    function checkCampus(){
      vm.query.selectedBind ='';
      vm.query.keyword = vm.searchTextByCampus;
      vm.region = 'campus';
      queryDataForCampus();
    }

    function modify(id,name,realName,phone,managerId,cityId,cityName){
      vm.selectedOpt = 'modify';
      // vm.selectedOpt = 'add';
       vm.manager.id = id;
      vm.manager.name = name;
      vm.manager.realName = realName;
      vm.manager.phone = phone;
      vm.manager.managerId = managerId;
      vm.manager.cityName = cityName;
      vm.query.managerId =  managerId;
      vm.query.cityId = cityId;
      vm.passwordStatus = "forbid";
      queryBindCampusByManger();


      queryDataForCampus();
    }

    function selectCity(cityName){
      vm.bindCampus = null;
      // vm.query.cityId ='';
      vm.campusList ='';
      vm.query.keyword ='';
      for(var i=0;i<vm.citys.length;i++){
        var city  = vm.citys[i];
        if(city.name == cityName){
            vm.query.cityId = city.id
        }
      }
      queryDataForCampus();
    }

    function configCampus(campus){
      //判断是否已选
       if(vm.bindCampus){
         for(var i=0;i<vm.bindCampus.length;i++){
          if(campus.sectionId == vm.bindCampus[i].sectionId){
            notifyService.danger('该学校已经添加,不可重复添加!');
            return;
          }
         }
      }

       var bindCampusArr = [];
       if(vm.bindCampus){
         for(var i=0;i<vm.bindCampus.length;i++){
          var bind = vm.bindCampus[i];
          bindCampusArr.push(bind);
         }
      }
      bindCampusArr.push(campus);
      vm.bindCampus = bindCampusArr;

      // 移除已经选择的学校
      var campusArr = [];
      for(var j=0;j<vm.campusList.length;j++){
        if(vm.campusList[j].sectionId != campus.sectionId){
          campusArr.push(vm.campusList[j]);
        }
      }
      vm.campusList = campusArr;
    }

     function cancelBind(campus){
       var bindCampusArr = [];
      bindCampusArr.push(campus);
      if(vm.campusList){
       for(var i=0;i<vm.campusList.length;i++){
        var bind = vm.campusList[i];
        if(bind.sectionId != campus.sectionId){
           bindCampusArr.push(bind);
        }
      }
     }
     
      vm.campusList = bindCampusArr;

      // 移除已经选择的学校
      var campusArr = [];
      for(var j=0;j<vm.bindCampus.length;j++){
        var campusObj = vm.bindCampus[j];
        if(campusObj.sectionId != campus.sectionId){
          campusArr.push(campusObj);
        }
      }
      vm.bindCampus = campusArr;
    }

    function resetPasswd(){
      vm.passwordStatus = "use";
    }

    function useAccount(managerId,name){
       vm.optId = managerId;
       vm.optRealName = name;
      $("#useConfirmDialog").modal('show');
    }

    function useYes(){
      deleteYes();
    }


  }
})();