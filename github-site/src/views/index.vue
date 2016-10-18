<template>
  <div class="ub ub-ver" id="index">
    <divider>站长推荐</divider>
    <swiper :list="swiperImgList" @on-click-list-item="itemClicked" auto height='300px' :show-desc-mask="false" dots-position="center"></swiper>
    <divider>分类</divider>
    <section class="classify">
      <ul>
        <li v-for="item in getModuleMenu" @click="goModule(item)">{{item.title}}</li>
      </ul>
    </section>
    <divider>传送门</divider>
  </div>
</template>
<script>
  //数据仓库
  import store from 'store/store.js'

  //取值器，获取页面需要的数据
  import {
    getVideoList,
    getModuleMenu
  } from 'getter/getter.js'

  //状态转化器
  import {
    jsSkipPath,
    pullVideo,
    setPlayUrl,
    setModuleInfo,
    pullModuleMenu
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
      //轮播图点击
      itemClicked(item){
        let data={
          moduleType:"",
          subType:"",
          playUrl:item.playUrl,
          fileName:""
        }
        setPlayUrl(data);
        jsSkipPath({routeName:"play"});
      },
      //分类菜单点击
      goModule(item){
        setModuleInfo(item);
        jsSkipPath({routeName:'module'})
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
        setPlayUrl,
        setModuleInfo,
        pullModuleMenu
      },
      getters:{
        getVideoList,
        getModuleMenu
      }
    },
    watch:{
      "list":function(newValue,oldValue){
        if(typeof(newValue)=="object"&&newValue.length>0){
          var info=[];
          for(let i=0;i<newValue.length;i++){
              var sub={};
              sub.playUrl=newValue[i].firstepisode_videourl;
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
          param:"/static/store/master_recommend/list.txt"
        });
      },
      deactivate:function(transition){
        transition.next()
      }
    },
    ready:function(){
      pullModuleMenu();
    },
    store:store,
  }
</script>
<style lang="less">
  @import '~vux/dist/components/divider/style.css';
  @import '~vux/dist/components/swiper/style.css';
  #index{
    padding: 0.3rem;
    box-sizing: border-box;
    background-color: #ccc;
    box-shadow: 0 0 30px #555 inset;
  }
  .classify{
    padding: 0.3rem;
    ul{
      text-align: center;
      li{
        @li-size:4rem;
        display: inline-block;
        width: @li-size;
        height: @li-size;
        margin:.4rem;
        margin-bottom: 1rem;
        font-size: .9rem;
        line-height: @li-size;
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(84, 80, 148, 0.55) inset;
        color: #333;
        &:active{
          box-shadow: 0 0 25px rgba(84, 80, 148, 0.55) inset;
        }
      }
    }
  }
  .vux-slider>.vux-swiper>.vux-swiper-item>a>.vux-img{
    background-size: 70% !important;
  }
</style>