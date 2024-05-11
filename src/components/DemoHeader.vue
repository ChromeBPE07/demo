<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">
      <img
          style="width: 200px"
          src="/logo.png"
          alt="Element logo"
      />
    </el-menu-item>

    <div>
    <el-breadcrumb separator="/" style="font-size: 18px;margin-top: 25px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path !== '/home'" v-for="(item, index) in $route.matched" :key="index" :to="{ path: item.path  }">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    </div>

    <div class="flex-grow" />
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-menu-item index="2">
      <el-dropdown>
<!--        下拉栏文字较其他选项向上偏移了3px-->
          <span class="el-dropdown-link" style="margin-bottom: 1px">
            <img :src="data.user.avatarurl" alt="" referrerpolicy="no-referrer" style="width: 30px; border-radius: 50%; position: relative;  right: 6px; margin-bottom: -5px">
          {{ data.user.nickname }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <span style="text-decoration: none" @click="logout">
                <el-dropdown-item divided>退出</el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
</template>

<script >

import ArrowDown from "@element-plus/icons/lib/ArrowDown";
//引入下拉栏向下的图标
import {ref, getCurrentInstance} from "vue";
import {useRouter} from "vue-router";


export default {
  name: "DemoHeader",
  components:{
    ArrowDown//注册向下图标
  },
    setup() {
      const data = ref({
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      });

      const instance = getCurrentInstance();
      const router = useRouter();
      const logout = () =>{
        router.push("/login")
        localStorage.removeItem("user")
        instance.proxy.$message.success("退出成功");
      }
      return{
        data,
        logout,
      }

}
}


</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
/*去除下拉栏点击后的黑框*/
.el-dropdown-link:focus{
  outline: none;
}

</style>