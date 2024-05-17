<template>
  <div>
    <!--    头部导航栏-->
    <DemoHeader/>
    <!--    主体-->
    <div style="display: flex">
      <!--      侧边栏-->
      <DemoAside v-if="isAdmin"/>
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
import {onMounted,ref} from "vue";
export default {
  name: 'Manage',
  components:{
    DemoHeader,
    DemoAside,
  },
  setup(){
    const isAdmin = ref(false);
    // 获取localStorage中的用户角色信息
    const getUserRole = () => {
      const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
      return user.role || '';
    };

    // 在组件挂载时检查用户角色
    onMounted(() => {
      const role = getUserRole();
      if (role === 'admit') {
        isAdmin.value = true;
      }
    });
    return {
      isAdmin
    };
  }
};
</script>
