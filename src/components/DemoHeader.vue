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
      <el-breadcrumb-item  v-for="(item, index) in $route.matched" :key="index" :to="{ path: item.path  }">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    </div>

    <div class="flex-grow" />
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-menu-item index="2">
      <el-dropdown>
<!--        下拉栏文字较其他选项向上偏移了3px-->
    <span class="el-dropdown-link" style="margin-top: 3px">
      用户
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <router-link to="/login" style="text-decoration: none">
                <el-dropdown-item divided>退出</el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
</template>

<script >

import ArrowDown from "@element-plus/icons/lib/ArrowDown";
import {computed, onMounted, watch} from "vue";
import { useStore } from 'vuex';
//引入下拉栏向下的图标

export default {
  name: "DemoHeader",
  components:{
    ArrowDown//注册向下图标
  },
    setup() {

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