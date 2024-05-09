<template>
  <div>
    <!--    头部导航栏-->
    <DemoHeader/>
    <!--    主体-->
    <div style="display: flex">
      <!--      侧边栏-->
      <DemoAside/>
      <!--      内容区域-->
      <router-view style="flex: 1"/>
    </div>
  </div>
</template>

<script >
// @ is an alias to /src

//引入下拉栏向下的图标

import {defineComponent} from "vue";
import DemoHeader from "@/components/DemoHeader";
import DemoAside from "@/components/DemoAside";

export default defineComponent({
  name: 'Manage',
  components:{
    DemoHeader,
    DemoAside,
  },
  setup(){

  }
});
</script>
