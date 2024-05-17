<template>
  <div>
    <el-menu
        style="min-height: calc(100vh - 60px)"
        default-active="2"
        class="el-menu-vertical-demo"
        router>
<!--        @open="handleOpen"-->
<!--        @close="handleClose"-->

      <el-menu-item index="/home">
        <el-icon><icon-menu /></el-icon>
        <span>主页</span>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Menu /></el-icon>
          <span>后台管理</span>
        </template>
        <el-menu-item-group title="人员/动物信息管理">
          <el-menu-item index="/user">用户信息</el-menu-item>
          <el-menu-item index="/pet">流浪动物信息</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="领养审理">
          <el-menu-item index="2-4">领养申请审核</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="知识专栏管理">
          <el-menu-item index="2-5">专栏文章</el-menu-item>
        </el-menu-item-group>
<!--        <el-sub-menu index="1-6">-->
<!--          <template #title>item four</template>-->
<!--          <el-menu-item index="1-6-1">item one</el-menu-item>-->
<!--        </el-sub-menu>-->
      </el-sub-menu>
      <el-menu-item index="3">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <el-icon><setting /></el-icon>
        <span>关于</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
//引入侧边栏图标
import {Setting, Menu} from '@element-plus/icons'

export default {
  name: "DemoAside",
  components:{
    // Location,
    Menu,
    // Document,
    Setting

  }
}
</script>

<style scoped>

</style>