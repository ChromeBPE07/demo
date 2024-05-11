<template>
  <div class="wrapper">
    <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding : 20px; border-radius: 10px">
    <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登录</b></div>

      <el-form :model="data.user" :rules="rules" ref="userForm">
        <el-form-item prop="username" >
          <el-input size="large" style="margin: 10px 0" v-model="data.user.username">
            <template #prefix><el-icon class="el-input__icon"><user /></el-icon></template>
          </el-input>
        </el-form-item>

        <el-form-item  prop="password" >
          <el-input size="large" style="margin: 10px 0" show-password v-model="data.user.password">
            <template #prefix><el-icon class="el-input__icon"><lock /></el-icon></template>
          </el-input>
        </el-form-item>
      <el-form-item style="margin: 10px 0; text-align: right">
        <el-button type="primary" size="small" autocomplete="off" @click="login">登录</el-button>
        <el-button type="warning" size="small" autocomplete="off">注册</el-button>
      </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>

import {User, Lock} from '@element-plus/icons';
import {ref, getCurrentInstance} from "vue";
import request from "@/utils/request";
import { useRouter } from 'vue-router';

const {FormInstance} = require("element-plus");

export default {
  name: "Login.vue",
  components:{
    User,
    Lock,
  },
  setup(){
    const data = ref({
      user: {
        username:"admit",
        password:"123456",
      }, //分页总数
    });



    const rules ={
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 5, message: '长度请控制在2到5个字符', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 1, max: 12, message: '长度请控制在1到12个字符', trigger: 'blur' },
      ]
    }

    const router = useRouter();
    const instance = getCurrentInstance();
    const userForm = ref(null); // 创建一个响应式引用用于存储表单实例

    const login = () => {
      userForm.value.validate((valid, fields) => {
        if (valid) { //表单校验合法
          request.post("/user/login", data.value.user).then(res =>{
                if(res.code === '200'){
                  localStorage.setItem("user", JSON.stringify(res.data))  //存储用户信息到浏览器
                  router.push("/");
                  instance.proxy.$message.success("登陆成功");
                }else {
                  instance.proxy.$message.error(res.msg);
                }
              })
        }
      })
    };

    return{
      data,
      login,
      rules,
      userForm
    }
  }
}
</script>

<style>

  .wrapper{
    height: 100vh;
    background-image: linear-gradient(to bottom right, #FC466B , #3F5EFB);
    overflow: hidden;
  }

</style>