import store from 'store/store.js'
const ajax = function({
    url,
    method = 'GET',
    data = "",
    dataType = "json",
    timeout = 10000,
    success,
    error = "",
}) {
    $.ajax({
        url: url,
        method: method,
        data: data,
        dataType: dataType,
        timeout: timeout,
        success: success,
        error: error,
    })
};
//请求站长推荐视频数据
export const pullVideo = function({param}) {
    let postData = {
        url: param
    }
    postData.success = function(data) {
        let result=data.result.result;
        store.dispatch("setVideo",result);
    }
    postData.error = function(xhr, err) {
        alert("请求失败，请重试！")
    }
    ajax(postData);
};
//js改变路由
export const jsSkipPath =function({routeName,routePath,params}){
    if(!!routeName){
        store.router.go({
            name: routeName
        });

    }else if(!!routePath){
        store.router.go({
            path: routePath
        });
    }
}
//设置播放路径
export const setPlayUrl=function(params){
    store.dispatch("setPlayUrl",params);
}
//设置模块信息
export const setModuleInfo=function(params){
    store.dispatch("setModuleInfo",params);
}
//获取主页模块菜单
export const pullModuleMenu=function(){
    let postData = {
        url: "./static/store/moduleMenu.json"
    }
    postData.success = function(data) {
        let result=data;
        store.dispatch("setModuleMenu",result);
    }
    postData.error = function(xhr, err) {
        console.log(err)
    }
    ajax(postData);
}
//获取视频列表
export const pullVideoList = function(param) {
	//禁止多次请求
	store.dispatch("setAjaxState",{
		succeed:false,
		error:false
	});
    let postData = {
        url: "./static/store/module_"+param.module+"/type_"+param.type+"/"+param.pageNum+".txt"
    }
    postData.success = function(data) {
        let result=data.result.result;
        store.dispatch("moduleVideoList",result);
        store.dispatch("setAjaxState",{
        	succeed:true,
        	error:false
        });
    }
    postData.error = function(xhr, err) {
        store.dispatch("setAjaxState",{
        	succeed:true,
        	error:true
        });
    }
    ajax(postData);
};

//切换新的分类
export const pullVideoList_newType = function(param) {
	//禁止多次请求
    let postData = {
        url: "./static/store/module_"+param.module+"/type_"+param.type+"/"+param.pageNum+".txt"
    }
    postData.success = function(data) {
        let result=data.result.result;
        store.dispatch("pullVideoList_newType",result);
    }
    postData.error = function(xhr, err) {
    	alert("请求失败，请重试！");
    }
    ajax(postData);
};