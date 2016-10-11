<template>
  <div class="ub ub-ac ub-pc" id="play">
     
    <iframe width="100%" height="97.5%" allowtransparency="true" frameborder="0" scrolling="no" :src="url"></iframe>
        
  </div>
</template>
<script>
  //数据仓库
  import store from 'store/store.js'
  //取值器，获取页面需要的数据
  import {
    getPlayUrl
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
      url:function(){
        return getPlayUrl();
      }
    },
    vuex:{
      actions:{
      },
      getters:{
        getPlayUrl
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
      if(!this.url){
        alert("页面出错，请重新进入！")
      }
    },
    store:store,
  }
</script>
<style lang="less">
  @import '~vux/dist/vux.css';
  #play{
    background-color: #000;
    color:red;
  }
</style>