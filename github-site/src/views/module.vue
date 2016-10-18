<template>
  <div class="ub-ver" id="module">
    <x-header style="background-color:rgba(49, 107, 169, 0.62)">{{moduleInfo.title}}</x-header>
    <div class="module-title">
      <divider>{{menu.current}}</divider>
    </div>
    <div class="menu">
      <label>菜单</label>
      <popup-picker :data="menu.list" @on-show="menuShow" @on-hide="menuHide" :value.sync="menu.current"></popup-picker>
    </div>
    <main>
      <ul id="dataList">
        <li v-for="item in getModuleVideoList" @click="itemClicked(item)">
          <img :src="item.show_vthumburl" alt="" />
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
  //数据仓库
  import store from 'store/store.js'
  //取值器，获取页面需要的数据
  import {
    getModuleInfo,
    getModuleVideoList,
    getAjaxState
  } from 'getter/getter.js'
  //状态转化器
  import {
    jsSkipPath,
    pullVideoList,
    setPlayUrl,
    pullVideoList_newType
  } from 'action/action.js'

  //组件
  import XHeader from 'vux-components/x-header'
  import PopupPicker from 'vux-components/popup-picker'
  import divider from 'vux-components/divider'
  export default {
    data:function(){
      return {
        menuPostionX:0,
        type:1,
        pageNum:1,
        moduleInfo:{},
        menu:{
          current:["错误"],
          list:[]
        }
      }
    },
    components: {
      XHeader,
      PopupPicker,
      divider
    },
    methods:{
      menuShow:function(){
        let x=$('#module .menu').css("left");
        this.menuPostionX=x;
        $('#module .menu').css("left","-100px");
      },
      menuHide:function(){
        $('#module .menu').css("left",this.menuPostionX);
      },
      //前往播放
      itemClicked(item){

      	let data;
      	if(getModuleInfo().isSet){
      		//多集
      		data={
      			moduleType:getModuleInfo().type,
      			subType:this.type,
	      		playUrl:item.playUrl,
	      		fileName:item.id
      		}
      	}else{
      		//单集
      		data={
      			moduleType:getModuleInfo().type,
      			subType:this.type,
      			playUrl:item.firstepisode_videourl,
      			fileName:""
      		}
      	}
        setPlayUrl(data);
        jsSkipPath({routeName:"play"});
      },
    },
    computed:{
    },
    vuex:{
      actions:{
        jsSkipPath,
        pullVideoList,
        setPlayUrl,
        pullVideoList_newType
      },
      getters:{
        getModuleInfo,
        getModuleVideoList,
        getAjaxState
      }
    },
    watch:{
      "moduleInfo":{
        deep:true,
        handler:function(newValue){
          if(newValue.type!=""){
            this.menu.list=newValue.subclasses;
            
          }else{
            jsSkipPath({routeName:"index"})
          }
        }
      },
      "menu":{
        deep:true,
        handler:function(newValue){
          //切换分类
          if(newValue.current!="错误"){
            let subIndex=1;
            for(let i=0;i<newValue.list[0].length;i++){
              if(newValue.current==newValue.list[0][i]){
                subIndex=i+1
                break;
              }
            }
            this.type=subIndex;
            this.pageNum=1;
            pullVideoList_newType({
              module:this.moduleInfo.type,
              type:subIndex,
              pageNum:1
            });
          }
        }
      }
    },
    route: {
      data ({ to }) {
        this.moduleInfo=getModuleInfo();
        //容灾
        if(this.moduleInfo.type==""){
          window.location.href="/";
        }
      },
      deactivate:function(transition){
        transition.next()
      }
    },
    ready:function(){
      this.menu.current=[this.menu.list[0][0]];
      //菜单初始化
      let menuInit=function(){
        let winH=$("body").height();
        let winW=$("body").width();
        const menuSize=60;
        let show=false;
        var time;
        const isShow=function(){
          clearTimeout(time);
          if(!show){
            $(".menu label").css("opacity",1);
            show=true;
          }
          time=setTimeout(function(){
            if(show){
              $(".menu label").css("opacity",0.6);
              show=false;
            }
          },2000)
        }
        window.onscroll = isShow;
        isShow();
        $('#module .menu .weui_cell').on("touchstart",isShow).on("touchmove",function(e){
          isShow();
          let x=e.changedTouches[0].pageX-(menuSize/2);
          let y=winH-e.changedTouches[0].pageY-(menuSize/2);
          if(y<0){
            y=0;
          }else if(y>winH-menuSize){
            y=winH-menuSize
          }
          if(x<0){
            x=0;
          }else if(x>winW-menuSize){
            x=winW-menuSize;
          }
          $('#module .menu').css({
            bottom:y+"px",
            left:x+"px"
          });
          e.stopPropagation();
          return false;
        });
      };
      menuInit();
      //滚动到底部时自动加载
      let tag=this;
      $(window).on("scroll",function(e){
      	if($("#dataList li").length>0){
      		if($("#dataList li").last().offset().top-$(window).scrollTop()-$("#dataList li").last().height()*2<500){
      		  if(tag.getAjaxState.succeed){
      		    pullVideoList({
      		      module:tag.moduleInfo.type,
      		      type:tag.type,
      		      pageNum:tag.pageNum++
      		    });
      		  }
      		}
      	}
      })
    },
    store:store,
  }
</script>
<style lang="less">
  @import '~vux/dist/components/x-header/style.css';
  @import '~vux/dist/components/popup-picker/style.css';
  @import '~vux/dist/components/divider/style.css';

  #module{
    user-select:none;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 30px #555 inset;
    .vux-header h1{
      margin-left: 88px;
    }
    .menu{
      @menu-size:60px;
      position: fixed;
      bottom: 25px;
      left: 25px;
      width: @menu-size;
      height: @menu-size;
      border-radius: 50%;
      z-index: 101;
      >label{
        position: absolute;
        display: block;
        width: @menu-size;
        height: @menu-size;
        line-height: @menu-size;
        text-align: center;
        border-radius: 50%;
        color: #333;
        font-size: .7rem;
        background-color: #fff;
        box-shadow: 0 0 20px rgb(30, 102, 165) inset;
        z-index: -1;
        opacity: 1;
        &:active{
          box-shadow: 0 0 30px rgb(30, 102, 165) inset;
        }
      }
      .weui_cell{
        padding: 0;
        height: @menu-size;
        border-radius: 50%;
        z-index: 99;
        .with_arrow{
          &:after{
            display: none;
          }
        }
        &:before{
          border:0;
        }
        &:active{
          background-color: transparent;
          box-shadow: 0 0 30px rgb(30, 102, 165) inset;
        }
      }
      span{
        visibility: hidden;
      }
    }
    main{
      padding: 0 1rem;
      ul{
        position: relative;
      }
      li{
        display: inline-block;
        width: 46%;
        height: 200px;
        margin:1rem 2%;
        float: left;
        text-align: center;
        box-sizing: border-box;
        img{
          max-width: 100%;
          max-height:200px;
        }
      }
    }
  }
</style>