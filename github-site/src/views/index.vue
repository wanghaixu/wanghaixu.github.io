<template>
  <div class="ub ub-ver" id="index">
    <divider>常用频道</divider>
    <divider>全部</divider>
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

  //组件
  import divider from 'vux-components/divider'

  export default {
    data:function(){
      return {
      }
    },
    components: {
      divider
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
  #index{
    padding: 0.3rem;
    box-sizing: border-box;
  }
</style>