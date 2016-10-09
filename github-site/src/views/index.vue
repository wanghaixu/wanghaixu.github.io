<template>
  <div class="ub ub-ver" id="index">
    <divider>热门</divider>
    <swiper :list="swiperImgList" @on-click-list-item="itemClicked" auto height='200px' :show-desc-mask="false" dots-position="center"></swiper>
    <divider>分类</divider>
    <divider>传送门</divider>
  </div>
</template>
<script>
  //数据仓库
  import store from 'store/store.js'

  //取值器，获取页面需要的数据
  import {
    
  } from 'getter/getter.js'

  //状态转化器
  import {
    jsSkipPath
  } from 'action/action.js'

  //组件
  import divider from 'vux-components/divider'
  import swiper from 'vux-components/swiper'

  export default {
    data:function(){
      return {
        swiperImgList: [{
                url: '',
                img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/1.jpg',
                title: '如何手制一份秋意的茶？'
              }, {
                url: '',
                img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/2.jpg',
                title: '茶包VS原叶茶'
              }, {
                url: '',
                img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/3.jpg',
                title: '播下茶籽，明春可发芽？'
              }]
      }
    },
    components: {
      divider,
      swiper
    },
    methods:{
      itemClicked(item){
        jsSkipPath({routeName:"play",params:{id:"123"}})
      }
    },
    computed:{
    },
    vuex:{
      actions:{
        jsSkipPath
      },
      getters:{
      }
    },
    watch:{
    },
    route: {
      data ({ to }) {
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