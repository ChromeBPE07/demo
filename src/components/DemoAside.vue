<template>
  <div>
    <el-menu
        style="min-height: calc(100vh - 60px)"
        default-active="2"
        class="el-menu-vertical-demo">
<!--        @open="handleOpen"-->
<!--        @close="handleClose"-->

      <el-sub-menu index="1">
        <template #title>
          <el-icon><Menu /></el-icon>
          <span>后台管理</span>
        </template>
        <el-menu-item-group title="人员/动物信息管理">
          <el-menu-item index="1-1">用户信息</el-menu-item>
          <el-menu-item index="1-2">管理员信息</el-menu-item>
          <el-menu-item index="1-3">流浪动物信息</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="领养审理">
          <el-menu-item index="1-4">领养申请审核</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="知识专栏管理">
          <el-menu-item index="1-5">专栏文章</el-menu-item>
        </el-menu-item-group>
<!--        <el-sub-menu index="1-6">-->
<!--          <template #title>item four</template>-->
<!--          <el-menu-item index="1-6-1">item one</el-menu-item>-->
<!--        </el-sub-menu>-->
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
//引入侧边栏图标
import Setting from "@element-plus/icons/lib/Setting";
import Menu from "@element-plus/icons/lib/Menu";


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