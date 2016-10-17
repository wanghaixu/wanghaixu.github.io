<template>
  <div class="ub ub-ver" id="play">
    <iframe width="100%" height="250px" allowtransparency="true" frameborder="0" scrolling="no" :src="url"></iframe>
    <ul class="ub-f1 toggle-set" v-if="getModuleInfo.isSet">
      <divider style="margin-top:10px; background-color:#fff">选集-[{{activeItem}}/{{getModuleVideoList.length}}]</divider>
      <li :class="{ 'active': ($index+1)==activeItem}" v-for="i in getModuleVideoList" @click="toggleSet(i)">{{$index+1}}</li>
    </ul>
  </div>
</template>
<script>
  //组件
  import divider from 'vux-components/divider'
  //数据仓库
  import store from 'store/store.js'
  //取值器，获取页面需要的数据
  import {
    getPlayInfo,
    getModuleInfo,
    getModuleVideoList
  } from 'getter/getter.js'
  //状态转化器
  import {
    
  } from 'action/action.js'
  export default {
    data:function(){
      return {
        activeItem:1,
        url:""
      }
    },
    components: {
      divider
    },
    methods:{
      toggleSet(item){
        this.activeItem=item;
        setTimeout(function(){
          $(window).scrollTop(0);
        },280);
      }
    },
    computed:{
      
    },
    vuex:{
      actions:{
      },
      getters:{
        getPlayInfo,
        getModuleInfo,
        getModuleVideoList
      }
    },
    watch:{
    },
    route: {
      data ({ to }) {
        $(window).scrollTop(0);
        if(getPlayInfo().playUrl==""){
          alert("页面出错，请重新进入！");
          window.history.back(-1);
        };
        if(getModuleInfo().isSet){
        	//获取分集信息
        	console.log(getPlayInfo().playUrl);
        }else{
        	//单集，直接播放
        	let sourceUrl=getPlayInfo().playUrl;
        	this.url="http://www.kuaisuyy.com/play/index.php?url="+sourceUrl;
        }; 
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
    background-color: #fff;
    user-select:none;
    -webkit-touch-callout:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    .toggle-set{
      position: relative;
      padding: 15px;
      overflow: hidden;
      overflow-y: scroll;
      background-color: #fff;
      color:#333;
      font-size: 14px;
      li{
        display: inline-block;
        width: 18%;
        height: 60px;
        margin: 5px 1%;
        border: 1px solid #d7d7d7;
        text-align: center;
        line-height: 60px;
        border-radius: 4px;
        box-sizing: border-box;
        &:active,&.active{
          box-shadow: 0 0 20px rgba(53, 52, 51, 0.5) inset;
          color: #999;
        }
      }
    }
  }
</style>