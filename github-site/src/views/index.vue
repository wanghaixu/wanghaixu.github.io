<template>
  <div class="ub ub-ver" id="index">
    <divider>热门</divider>
    <swiper :list="swiperImgList" @on-click-list-item="itemClicked" auto height='400px' :show-desc-mask="false" dots-position="center"></swiper>
    <divider>分类</divider>
    <divider>传送门</divider>
  </div>
</template>
<script>
  //数据仓库
  import store from 'store/store.js'

  //取值器，获取页面需要的数据
  import {
    getVideoList
  } from 'getter/getter.js'

  //状态转化器
  import {
    jsSkipPath,
    pullVideo,
    setPlayUrl
  } from 'action/action.js'

  //组件
  import divider from 'vux-components/divider'
  import swiper from 'vux-components/swiper'

  export default {
    data:function(){
      return {
        swiperImgList: [],
      }
    },
    components: {
      divider,
      swiper
    },
    methods:{
      itemClicked(item){
        setPlayUrl(item.playUrl);
        jsSkipPath({routeName:"play"});
      }
    },
    computed:{
      list:function(){
        return getVideoList();
      }
    },
    vuex:{
      actions:{
        jsSkipPath,
        pullVideo,
        setPlayUrl
      },
      getters:{
        getVideoList
      }
    },
    watch:{
      "list":function(newValue,oldValue){
        if(typeof(newValue)=="object"&&newValue.length>0){
          var info=[];
          for(let i=0;i<newValue.length;i++){
              var sub={};
              sub.playUrl="http://vip.sdyhy.cn/vip.php?url="+newValue[i].firstepisode_videourl;
              sub.img=newValue[i].show_vthumburl;
              sub.title=newValue[i].showname;
              info.push(sub);
          };
          this.swiperImgList=info;
        }
      }
    },
    route: {
      data ({ to }) {
        pullVideo({
          param:"/static/store/video/youku/youku_1.txt"
        });
      },
      deactivate:function(transition){
        transition.next()
      }
    },
    ready:function(){
      
    },
    store:store,
  }
</script>
<style lang="less">
  @import '~vux/dist/components/divider/style.css';
  #index{
    padding: 0.3rem;
    box-sizing: border-box;
  }
</style>