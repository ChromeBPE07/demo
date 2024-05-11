<template>
  <div class="wrapper">
    <div style="margin: 100px auto; background-color: rgba(255,255,255,0.9); width: 350px; height: 350px; padding : 20px; border-radius: 10px; box-shadow: 7px 12px 5px rgba(0, 0, 0, 0.4);">
    <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>注册</b></div>

      <el-form :model="data.user" :rules="rules" ref="userForm">
        <el-form-item prop="username" >
          <el-input placeholder="请输入用户名" size="large" style="margin: 5px 0" v-model="data.user.username">
            <template #prefix><el-icon class="el-input__icon"><user /></el-icon></template>
          </el-input>
        </el-form-item>

        <el-form-item  prop="password" >
          <el-input placeholder="请输入密码" size="large" style="margin: 5px 0" show-password v-model="data.user.password">
            <template #prefix><el-icon class="el-input__icon"><lock /></el-icon></template>
          </el-input>
        </el-form-item>

        <el-form-item  prop="confirmPassword" >
          <el-input placeholder="请确认密码" size="large" style="margin: 5px 0" show-password v-model="data.user.confirmPassword">
            <template #prefix><el-icon class="el-input__icon"><lock /></el-icon></template>
          </el-input>
        </el-form-item>
      <el-form-item style="margin: 10px 0 0 0; text-align: right">
        <div style="width: 100%;padding: 0 10px;display: flex;justify-content: space-between; /* 按钮之间平均分配空间 */align-items: center; /* 垂直居中，如果按钮的高度与div的高度不同 */">
          <el-button type="success" autocomplete="off" @click="$router.push('/login')" plain>返回登陆</el-button>
          <el-button type="primary"  autocomplete="off" @click="register" plain>注册</el-button>
        </div>
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
        confirmPassword:"123456"
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
      ],
      confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { min: 1, max: 12, message: '长度请控制在1到12个字符', trigger: 'blur' },
        {
          validator: (rules, value, callback) => {
            if (value !== data.value.user.password) callback(new Error('两次输入密码不一致')) //踩坑了，写了data.value.password漏了里面的user，导致无论输入什么都会显示密码不一致
            callback()
          }, trigger: 'blur'
        }
      ]
    }

    const router = useRouter();
    const instance = getCurrentInstance();
    const userForm = ref(null); // 创建一个响应式引用用于存储表单实例

    const register = () => {
      userForm.value.validate((valid, fields) => {
        if (valid) { //表单校验合法
          request.post("/user/register", data.value.user).then(res =>{
                if(res.code === '200'){
                  router.push("/login");
                  instance.proxy.$message.success("注册成功");
                }else {
                  instance.proxy.$message.error(res.msg);
                }
              })
        }
      })
    };

    return{
      data,
      rules,
      userForm,
      register
    }
  }
}
</script>

<style>

  .wrapper{
    height: 100vh;
    /*background-image: linear-gradient(to bottom right, #FC466B , #3F5EFB);*/
    background-image: url('D:\bishe\pet adoption\demo\public\loginback.jpeg');
    /* 设置背景图片大小：宽度自动，高度100% */
    background-size: 100% auto;
    /* 设置背景图片不重复 */
    background-repeat: no-repeat;

    overflow: hidden;
  }

</style>