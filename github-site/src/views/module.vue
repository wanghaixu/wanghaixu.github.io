<template>
  <div class="ub" id="module">
    
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
</style>