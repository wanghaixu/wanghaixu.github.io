import store from 'store/store.js'
const ajax = function({
    url,
    method = 'GET',
    data = "",
    dataType = "JSON",
    timeout = 10000,
    success,
    error = "",
    beforeSend = "",
    contentType = undefined,
    complete = ""
}) {
    $.ajax({
        url: url,
        method: method,
        data: data,
        contentType: contentType,
        dataType: dataType,
        beforeSend: beforeSend,
        complete: complete,
        timeout: timeout,
        success: function(data, xhr) {
            success && success.call(this, data, xhr);
        },
        error: error,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    })
};
//请求我的信息
export const pullMyInfo = function({ dispatch, state }, paramObject) {
    let postData = {
        url: "",
        method: 'post',
        data: paramObject
    }
    postData.success = function(info) {
    }
    postData.error = function(xhr, err) {
    }
    ajax(postData);
};
//js改变路由
export const jsSkipPath =function({dispatch,state,routeName,routePath,params}){
    if(!!routeName){
        store.router.go({
            name: routeName,
            params: params
        });

    }else if(!!routePath){
        store.router.go({
            path: routePath,
            params: params
        });
    }
}
