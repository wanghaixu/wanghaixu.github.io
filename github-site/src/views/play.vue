<template>
  <div class="ub ub-ver" id="play">
  	<div class="show-state">加载中...</div>
    <iframe width="100%" height="250px" allowtransparency="true" frameborder="0" scrolling="no" :src="url"></iframe>
    <ul class="ub-f1 toggle-set" v-if="getSubGather.length>0">
      <divider style="margin-top:10px; background-color:#fff">选集-[{{activeItem}}/{{getSubGather.length}}]</divider>
      <li :class="{ 'active': ($index+1)==activeItem}" v-for="i in getSubGather" @click="toggleSet($index+1)">{{$index+1}}</li>
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
    getModuleVideoList,
    getSubGather
  } from 'getter/getter.js'
  //状态转化器
  import {
    pullSubVideoList
  } from 'action/action.js'
  export default {
    data:function(){
      return {
        activeItem:1,
        playUrlpPefix:"http://www.kuaisuyy.com/play/index.php?url=",
        urlTemp:""
      }
    },
    components: {
      divider
    },
    methods:{
    	//换集
      toggleSet(index){
        this.activeItem=index;
        $(window).scrollTop(0);
        this.urlTemp=(this.playUrlpPefix+this.getSubGather[index-1].toggleSet);
      }
    },
    computed:{
    	url:function(){
    		if(this.urlTemp!=""){
    			return  this.urlTemp;
    		}else{
    			let sourceUrl=getPlayInfo().playUrl;
    			let playUrl=this.getSubGather.length>0?this.getSubGather[0].toggleSet:sourceUrl;
    			return (this.playUrlpPefix+playUrl);
    		}
    	}
    },
    vuex:{
      actions:{
      	pullSubVideoList
      },
      getters:{
        getPlayInfo,
        getModuleInfo,
        getModuleVideoList,
        getSubGather
      }
    },
    watch:{
    	
    },
    route: {
      data ({ to }) {
      	//初始化
      	this.urlTemp="";
      	this.activeItem=1;
        $(window).scrollTop(0);
        if(getPlayInfo().playUrl==""){
          window.history.back(-1);
        };
        if(getModuleInfo().isSet){
        	//获取分集信息
        	let data={
        		module:getPlayInfo().moduleType,
        		subType:getPlayInfo().subType,
        		fileName:getPlayInfo().fileName
        	}
        	pullSubVideoList(data);
        }; 
      },
      deactivate:function(transition){
        console.log(this)
        transition.next()
      }
    },
    ready:function(){

    },
    destroyed:function(){
      alert('已销毁')
    },
    store:store,
  }
</script>
<style lang="less">
  @import '~vux/dist/components/divider/style.css';
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
    iframe{
    	position:relative;
    	z-index:99;
    }
    .show-state{
    	position:absolute;
    	top:20px;
    	left:50%;
    	width:100px;
    	margin-left:-25px;
    	color:#333;
    	z-index:9;
    }
  }
</style>