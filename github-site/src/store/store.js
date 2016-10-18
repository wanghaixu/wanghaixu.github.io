import Vue from 'vue'
import Vuex from 'vuex'
// 告诉 vue “使用” vuex
Vue.use(Vuex)
// 创建一个对象来保存应用启动时的初始状态
var state = {
    data: {
        //站长推荐
    	videoList:[],
        
        playInfo:{
            //模块type
            moduleType:"",
            //模块下的类型
            subType:"",
            //播放地址
            playUrl:"",
            //获取多集文件名
            fileName:""
        },
        
        //模块内配置信息
        moduleInfo:{
            title:"页面出错，请返回上一页！",
            type:"",
            isSet:false
        },
        //主页模块菜单
        moduleMenu:[],
        //模块视频列表
        moduleVideoList:[],
        //分集视频列表
        subGather:[]
    },
    state:{
    	ajax:{
    		succeed:true,
    		error:false
    	}
    },
    //接口列表
    ApiList: {
    },
};
// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
	setVideo(state,params){
		state.data.videoList=params;
	},
    setPlayUrl(state,params){
        state.data.playInfo=params;
    },
    setModuleInfo(state,params){
        state.data.moduleInfo=params;
    },
    setModuleMenu(state,params){
        state.data.moduleMenu=params;
    },
    moduleVideoList(state,params){
    	let newList=state.data.moduleVideoList.concat(params);
    	state.data.moduleVideoList=newList;
    },
    setAjaxState(state,params){
    	state.state.ajax=params;
    },
    pullVideoList_newType(state,params){
    	state.data.moduleVideoList=params;
    },
    setSubGather(state,params){
        state.data.subGather=params;
    }
};
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations
})
