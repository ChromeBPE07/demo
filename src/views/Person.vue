<template>
    <el-card style="width: 500px;height: 600px; margin: 20px">
      <el-form label-width="100px" size="large">
        <el-form-item label="用户名" >
          <el-input v-model="data.form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称" >
          <el-input v-model="data.form.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="data.form.sex">
            <el-radio value="男">男</el-radio>
            <el-radio value="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="data.form.age" autocomplete="off" />
        </el-form-item>
        <el-form-item label="住址" >
          <el-input v-model="data.form.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" >
          <el-input v-model="data.form.telephone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="data.form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="领养经验">
          <el-radio-group v-model="data.form.state">
            <el-radio value=1>有</el-radio>
            <el-radio value=0>无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">应用</el-button>
        </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
import request from "@/utils/request";
import {ref,defineComponent,onMounted} from "vue";
import {ElMessage} from 'element-plus'


export default defineComponent({
  name: "Person",
  setup() {
    const data = ref({
      form: {
        state:0
      },
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    });
    // request.get(`/user/username/${data.value.user.username}`).then(res =>{
    //   if(res.code === '200'){
    //     data.value.form = res.data;
    //   }
    // })
    onMounted(async () => {
      try {
        // 发起请求，这里使用 axios 作为示例
        const res = await request.get(`/user/username/${data.value.user.username}`);

        // 检查响应码，并更新表单数据
        if (res.code === '200') {
          console.log(res.data)
          data.value.form = res.data;
          console.log(data.value.form)
        }
      } catch (error) {
        // 处理错误
        console.error('Error fetching user data:', error);
      }
    });
    const save = () => {
      request.post(`/user`, data.value.form).then(res => {
        if (res) {
          ElMessage.success("保存成功")
        } else {
          ElMessage.error("保存失败")
        }
      })
    };

    return{
      data,
      save
    }
  }
})
</script>

<style scoped>

</style>