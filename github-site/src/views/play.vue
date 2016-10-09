<template>
  <div class="ub ub-ver ub-ac ub-pc" id="play">
     <a href="http://vip.sdyhy.cn/vip.php?url=http://v.youku.com//v_show//id_XMTY2MDUwNzU4MA==.html">测试</a>
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
    
  } from 'action/action.js'
  export default {
    data:function(){
      return {
      }
    },
    components: {
    },
    methods:{
    },
    computed:{
    },
    vuex:{
      actions:{
      },
      getters:{
      }
    },
    watch:{
    },
    route: {
      data ({ to }) {
        let id = +to.params.id;
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
  @import '~vux/dist/vux.css';
  #play{
    background-color: #000;
  }
</style>