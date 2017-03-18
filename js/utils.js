
'use strict';
$.extend({
	utils : {
		DEFAULTS : {
			timeout : 30000,
			type : 'POST',
			async : true,
			cache : false,
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType : 'JSON',
			defaultErrorMsg : 'Server exception, please try again later'
		},
		/**
		 * Call Ajax before the destruction of the request, please add the following statement
		 * if (this._xhr && this._xhr.readyState !== 4) {
         *   this._xhr.abort();
         * }
		 */
		ajax : function(request){
			var ajax = $.extend({},this.DEFAULTS,request);
			var _xhr = $.ajax({
				type: ajax.type,
				url: ajax.url ,
				timeout : ajax.timeout,
				async : ajax.async,
				cache : ajax.cache,
				contentType : ajax.contentType, 
				data: ajax.data ,
				dataType: ajax.dataType,
				success: function(data){
					if(ajax.dataType === "JSON"){
						if(data.successFul){
							if(ajax.success && typeof ajax.success === 'function'){
								ajax.success(data.data);
							}
						}else{
							alert(data.errorMessage);
						}
					}else{
						if(ajax.success && typeof ajax.success === 'function'){
							ajax.success(data);
						}
					}
				} ,
				error : function(jqXHR, textStatus, errorThrown){
					if(textStatus === "timeout"){
						_xhr.abort();
						alert("请求超时，清检查您的网络");
					}else{
						if(jqXHR.status == "401"){
							window.location.reload();
						}else if(jqXHR.status == "404"){
							alert('页面不存在，请稍后再试！');
						}else{
							if(ajax.error && typeof ajax.error === 'function'){
								ajax.error(jqXHR, textStatus, errorThrown);
							}else{
								alert(ajax.defaultErrorMsg);
							}
						}
					}
				},
				complete : function(){
					if(ajax.done && typeof ajax.done === 'function'){
						ajax.done();
					}
				}
			});
			return _xhr;
		}
	}
});