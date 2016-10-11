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
//请求视频数据
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