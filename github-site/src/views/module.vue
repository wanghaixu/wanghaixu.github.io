<template>
  <div class="ub-ver" id="module">
    <x-header style="background-color:rgba(49, 107, 169, 0.62)">{{moduleInfo.title}}</x-header>
    <divider>{{menu.current}}</divider>
    {{getModuleMenu|json}}
    <div class="menu">
      <label>菜单</label>
      <popup-picker :data="getModuleMenu" @on-show="menuShow" @on-hide="menuHide" :value.sync="menu.current"></popup-picker>
    </div>
    <main>
      <ul>
        <li v-for="0 in 10">
          <img data-src="http://r3.ykimg.com/0516000056B01AAE67BC3C2A660716C7" class="lazyload" alt="" />
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
    getModuleMenu
  } from 'getter/getter.js'
  //状态转化器
  import {
    
  } from 'action/action.js'

  //组件
  import XHeader from 'vux-components/x-header'
  import PopupPicker from 'vux-components/popup-picker'
  import divider from 'vux-components/divider'
  export default {
    data:function(){
      return {
        _menuPostionX:0,
        moduleInfo:{
          title:"",
          type:""
        },
        menu:{
          current:[this.getModuleMenu.subclass[0][0]],
          list:this.getModuleMenu.subclass
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
        this._menuPostionX=x;
        $('#module .menu').css("left","-100px");
      },
      menuHide:function(){
        $('#module .menu').css("left",this._menuPostionX);
      }
    },
    computed:{
    },
    vuex:{
      actions:{
      },
      getters:{
        getModuleInfo,
        getModuleMenu
      }
    },
    watch:{
    },
    route: {
      data ({ to }) {
        this.moduleInfo=getModuleInfo();
      },
      deactivate:function(transition){
        transition.next()
      }
    },
    ready:function(){
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
            $(".menu label").css("opacity",0.3);
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
    },
    store:store,
  }
</script>
<style lang="less">
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
        width: 42%;
        height: 200px;
        margin:0 2%;
        margin-bottom: 2rem;
        float: left;
        text-align: center;
        border:1px solid #d7d7d7;
        box-sizing: border-box;
        img{
          max-width: 100%;
        }
      }
    }
  }
</style>