<template>
  <div>
    <!--    头部导航栏-->
    <DemoHeader/>
    <!--    主体-->
    <div style="display: flex">
      <!--      侧边栏-->
      <DemoAside/>
      <!--      内容区域-->
      <router-view />
<!--      //加了style="flex: 1"导致/person里的div宽度失效-->
<!--      //应用一个 CSS 的弹性盒子（Flexbox）布局属性到这个元素上，在弹性容器中应该占据所有可用的空间-->
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
