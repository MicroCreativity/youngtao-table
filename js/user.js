$(function() {
	$('#addUserValidator').bootstrapValidator({
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        	loginName: {
                validators: {
                    notEmpty: {
                        message: '登录名不能为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名只能由字母、数字、点和下划线组成'
                    },
                    stringLength: {
                        min: 6,
                        max: 32,
                        message: '用户名长度必须在6到32之间'
                    }
                }
            },
            name: {
                validators: {
                    notEmpty: {
                        message: '登录名不能为空'
                    },
                    stringLength: {
                        min: 1,
                        max: 32,
                        message: '用户名长度必须在6到32之间'
                    }
                }
            },
            email: {
            	validators: {
                    notEmpty: {
                        message: '邮箱不能为空'
                    },
                    emailAddress: {
                        message: '请输入正确的邮箱地址'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    different: {
                        field: 'loginName',
                        message: '密码不能和用户名相同'
                    }
                }
            },
            confirmPassword: {
                validators: {
                    notEmpty: {
                        message: '确认密码不能为空'
                    },
                    identical: {
                        field: 'password',
                        message: '两次密码不一致'
                    }
                }
            }
        }
    });
});
$.extend({
	botton : {
		openAddUserDialog : function(){
			$("#addUserDialog").modal('show');
		},
		addUser : function(even){
			
			$("#addUserValidator").data('bootstrapValidator').validate();
			if($("#addUserValidator").data('bootstrapValidator').isValid()){
				$("#userTable").youngTao('refreshOptions',{queryParams : function(params){
                        return{
                            pageSize : params.pageSize,
                            currentPage : 1
                        };
                    }
                });
			}
		},
		reset : function(){
			$("#addUserValidator").data('bootstrapValidator').resetForm();
		},
		update : function(){
			var getSelectedList = $("#userTable").youngTao("getSelectedList");
			console.log(getSelectedList);
		}
	},
	formatter : {
		forMatter : function(value,row,i){
			return value;
		}
	}
});

var data = {'totalPage':2,'totalRecord':17,'datas':[{'name':'林延涛','grade':'大3','class':'1','hobby':'瞎搞','specialty':'编程','looks':'帅气'},{'name':'马云','grade':'大2','class':'2','hobby':'吹牛','specialty':'忽悠妇女','looks':'外星人'},{'name':'乔布斯','grade':'大1','class':'10','hobby':'吃苹果','specialty':'编程','looks':'你懂得'},{'name':'比尔盖茨','grade':'大4','class':'9','hobby':'玩','specialty':'操作系统','looks':'过得去'},{'name':'李彦宏','grade':'大1','class':'5','hobby':'忽悠','specialty':'特能忽悠','looks':'帅气'},{'name':'马化腾','grade':'大1','class':'3','hobby':'游戏','specialty':'打游戏','looks':'帅气'},{'name':'林延涛','grade':'大3','class':'1','hobby':'瞎搞','specialty':'编程','looks':'帅气'},{'name':'林延涛','grade':'大3','class':'1','hobby':'瞎搞','specialty':'编程','looks':'帅气'},{'name':'林延涛','grade':'大3','class':'1','hobby':'瞎搞','specialty':'编程','looks':'帅气'},{'name':'林延涛','grade':'大3','class':'1','hobby':'瞎搞','specialty':'编程','looks':'帅气'},{'name':'林延涛','grade':'大3','class':'1','hobby':'瞎搞','specialty':'编程','looks':'帅气'},{'name':'林延涛','grade':'大3','class':'1','hobby':'瞎搞','specialty':'编程','looks':'帅气'},{'name':'林延涛','grade':'大3','class':'1','hobby':'瞎搞','specialty':'编程','looks':'帅气'},{'name':'林延涛','grade':'大3','class':'1','hobby':'瞎搞','specialty':'编程','looks':'帅气'},{'name':'林延涛','grade':'大3','class':'1','hobby':'瞎搞','specialty':'编程','looks':'帅气'},{'name':'林延涛','grade':'大3','class':'1','hobby':'瞎搞','specialty':'编程','looks':'帅气'},{'name':'林延涛','grade':'大3','class':'1','hobby':'瞎搞','specialty':'编程','looks':'帅气'}]};

$("#userTable").youngTao({
	url : './data/data.json',
	locale : 'zh_CN',
	responseHandler: function (res) {
        return data;
    },
    loadCompleteExe : function(){
    	$('input[type="checkbox"]').iCheck({
    		checkboxClass: 'icheckbox_flat-blue'
        });
    }
});
