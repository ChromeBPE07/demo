<template>
  <div style="padding: 13px">

    <!--    搜索区域-->
    <div style="margin: 0 0 10px 0">
      <el-input
          v-model="data.searchKW"
          clearable
          style="max-width: 30%; margin-right: 15px"
          placeholder="请输入用户名"
      >
          <template #suffix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
      </el-input>
      <el-button type="primary" @click="load">
        搜索<el-icon class="el-input__icon"><search /></el-icon>
      </el-button>

      <el-button type="warning" @click="reset">
        重置<el-icon><Refresh /></el-icon>
      </el-button>
    </div>

    <!--    功能区域-->
    <div style="margin: 0 10px 10px 0" >
      <el-button @click="handleAdd" round>新增</el-button>
      <el-popconfirm
          title="确定要删除吗？"
          @confirm="delBath"
      >
        <template #reference>
          <el-button round>批量删除</el-button>
        </template>
      </el-popconfirm>
    </div>

    <!--    表单展示区域-->
    <el-table :data="data.tableData"
              border
              stripe
              sortable
              style="width: 100%;"
              max-height="550px"
              @selection-change="handleSelectionChange"
              size="small"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" sortable width="80"/>
      <el-table-column prop="username" label="用户名" sortable width="120" />
      <el-table-column prop="nickname" label="昵称"  />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="address" label="住址" width="150"/>
      <el-table-column prop="telephone" label="电话号码" width="120"/>
      <el-table-column prop="email" label="邮箱" width="150"/>
      <el-table-column prop="state" label="领养经验" />
      <el-table-column label="头像" width="120"> <template #default="scope">
        <el-image style="width: 100px; height: 100px; padding: 5px;" :src="scope.row.avatarurl" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="[scope.row.avatarurl]" :initial-index="4" fit="cover" />
      </template> </el-table-column>
      <el-table-column label="操作" width="125">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-popconfirm
              title="确定要删除吗？"
              @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button
                  size="small"
                  type="danger"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--    分页区域-->
    <div style="margin: 10px 0">
      <el-pagination
          :current-page="data.pageNum"
          :total="data.total"
          :page-size="data.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="margin:0 auto; width: 500px"
      />
    </div>

    //对话框，用于弹出编辑内容
    <el-dialog v-model="data.dialogFormVisible" title="用户信息" width="30%">
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
            <el-radio value="true">有</el-radio>
            <el-radio value="false">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户头像">
          <el-input
              v-model="data.form.avatarurl"
              style="max-width: 600px"
              placeholder="请输入图片url"
          >
            <template #append>
              <el-upload
                  class="upload-demo"
                  action="http://localhost:9090/file/upload"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
              >
              <el-button type="primary">
                <el-icon><Upload /></el-icon>
              </el-button>
              </el-upload>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {defineComponent,ref,getCurrentInstance} from "vue";
import {Refresh, Search, Upload} from '@element-plus/icons'
import {ElMessage } from 'element-plus'
import request from "@/utils/request";

export default defineComponent({
  name: 'User.vue',
  components: {
    Search,
    Refresh,
    Upload
  },
  setup(){
    const data = ref({
      total:0, //分页总数
      tableData:[],
      pageNum:1,
      pageSize:5,
      searchKW:"", //搜索关键字,默认为空
      dialogFormVisible:false,
      form:{},
      multipleSelection:[],  //复选框选中时获得的数据
    })

    const load = () =>{
      request.get(`/user/page`,{
        params:{
          pageNum: data.value.pageNum,
          pageSize: data.value.pageSize,
          username: data.value.searchKW
        }
      }).then(res => {
        console.log(res)
        data.value.tableData = res.records
        data.value.total = res.total
      })

      //   fetch(`/user/page?pageNum=${pageNum.value}&pageSize=${pageSize.value}&username=${searchKW.value}`).then(res => res.json()).then(res =>{
      //   tableData.value = res.data
      //   total.value = res.total
      // })
    }

    //页面刚开始时调用渲染数据
    load()

    const reset = () => {
      data.value.searchKW = ""
      load()
    }

    //传输下拉栏选择按钮确定每页展示数量的值给后台并重新渲染数据列表
    const handleSizeChange = (PS) => {
      console.log(`${PS} items per page`)
      data.value.pageSize = PS //防止因为重名产生冲突
      load()

    }
    //传输页数给后台并重新渲染数据列表
    const handleCurrentChange = (PN) => {
      console.log(PN)
      data.value.pageNum = PN //防止因为重名产生冲突
      load()
    }

    //新增
    const handleAdd = () =>{
      data.value.dialogFormVisible = true;
      data.value.form = {}
    };

    const save = () =>{
      request.post(`/user`, data.value.form).then(res => {
        if(res){
          ElMessage.success("保存成功")
          data.value.dialogFormVisible = false
          load()
        }else {
          ElMessage.error("保存失败")
        }
      })

    };

    //编辑操作
    const handleEdit = (row) =>{
      data.value.form = {...row}  //使用ES6的扩展运算符来创建一个新的对象并将row所有属性复制到新对象中，这样row和form就指向了两个不同的对象，互不影响
      // data.value.form = row   出错，修改表单数据后未点击确认表格数据便更改，系因将该行的数据row赋给表格时是引用赋值，即它们指向同一对象
      data.value.dialogFormVisible = true
    };

    const handleAvatarSuccess = (res) =>{
      //res就是文件的路径
      data.value.form.avatarurl = res
    }

    const handleDelete = (id) =>{
      request.delete(`/user/${id}`).then(res =>{
        if(res){
          ElMessage.success("删除成功")
          load()
        }else {
          ElMessage.error("删除失败")
        }
      })
    };

    const handleSelectionChange = (val) => {
      data.value.multipleSelection = val
      // console.log(data.value.multipleSelection)
    };

    const delBath = () => {
      let ids = data.value.multipleSelection.map(v => v.id)
      request.post(`/user/del/batch`, ids).then(res =>{
        if(res){
          ElMessage.success("批量删除成功")
          load()
        }else {
          ElMessage.error("批量删除失败")
        }
      })
    }


    return{
      handleSizeChange,
      handleCurrentChange,
      handleAdd,
      handleEdit,
      handleDelete,
      delBath,
      handleAvatarSuccess,
      save,
      load,
      reset,
      handleSelectionChange,
      data,
    }
  }
});
</script>

<style scoped>

</style>