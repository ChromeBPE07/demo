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

<script>
import DemoHeader from "@/components/DemoHeader";
import HomeView from "@/views/HomeView";
import DemoAside from "@/components/DemoAside";
export default {
  name:"Layout",
  components:{
    DemoHeader,
    HomeView,
    DemoAside,
  }
}
</script>

<style>

</style>
