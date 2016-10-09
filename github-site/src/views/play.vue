<template>
  <div class="ub ub-ver ub-ac ub-pc" id="play">
    <!-- <iframe width="100%" allowtransparency="true" frameborder="0" scrolling="no" src="http://vip.sdyhy.cn/vip.php?url=http:\/\/v.youku.com\/v_show\/id_XMTY2MDUwNzU4MA==.html"></iframe>
     -->
     <video src="http://k.youku.com/player/getFlvPath/sid/5475996214211206d6eab_00/st/mp4/fileid/030020010057EF690A32981468DEFE4082116E-5E8D-C052-F3A1-E13C28FE47FD?k=ec53eaa20fe77c1b282bcae5&amp;hd=1&amp;myp=0&amp;ts=1450&amp;ymovie=1&amp;r=s0KfeG/MpJGxT8zBRdWN/PR5MDecwxp/gSVk/o8apWJ34NpCYu5AxCY8jiid+3aLU5za8s2cgGmAh6W3Swd/jjCqvLiqHp2FW8yjP6v3TLSs5fdg9A2ejRlc/ie3EFe4SsRrSk4T4XkcZHS+agzxYUBJL12GrgPrxWshFwt8M584J7r/Rnw6/1o05uZxG8BS&amp;oip=1948214312&amp;sid=5475996214211206d6eab&amp;token=4170&amp;did=e7c333b8e8095183ad0fd269d254593b&amp;ev=1&amp;ctype=20&amp;ep=NSknX3RSKadMFvQMdxaJpPJd9ADaLoJdOL7%2F6uRoorMzoY%2BooP3s03MSsZch2e%2BvJFVOqpNE8lQ3tbHcxe9JQbjVrSCPxSyO7JrnJK%2Fyd7sRPTq4azKdJEugp%2BtdYn%2F%2B" controls="controls" autoplay="autoplay" width="100%" height="100%"></video>
  </div>
</template>https://www.baidu.com/?tn=98012088_5_dg&ch=7
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
        console.log(id)
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