//数据仓库
import store from 'store/store.js'
//获取视频数据
export function getVideoList () {
  return store.state.data.videoList;
}
//获取播放地址
export function getPlayInfo () {
  return store.state.data.playInfo;
}
//获取模块内信息
export function getModuleInfo(){
	return store.state.data.moduleInfo;
}
//获取主页模块菜单
export function getModuleMenu(){
	return store.state.data.moduleMenu;
}
//获取模块视频列表
export function getModuleVideoList(){
	return store.state.data.moduleVideoList;
}
//获取ajax请求状态
export function getAjaxState(){
	return store.state.state.ajax;
}
//获取分集视频列表
export function getSubGather(){
	return store.state.data.subGather;
}