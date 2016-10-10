//数据仓库
import store from 'store/store.js'
//获取视频数据
export function getVideoList () {
  return store.state.data.videoList;
}
//获取播放地址
export function getPlayUrl () {
  return store.state.data.playUrl;
}