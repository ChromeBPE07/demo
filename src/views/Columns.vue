<template>
  <div style="padding: 13px">

    <!--    搜索区域-->
    <div style="margin: 0 0 10px 0">
      <!--      //根据名字搜索-->
      <el-input
          v-model="data.title"
          clearable
          style="max-width: 20%; margin-right: 10px "
          placeholder="请输入名称"
      >
        <template #suffix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>

      <!--      根据作者搜索-->
      <el-input
          v-model="data.author"
          clearable
          style="max-width: 20%; margin-right: 10px"
          placeholder="请输入作者名"
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
              style="width: 100%"
              max-height="550px"
              @selection-change="handleSelectionChange"
              size="small"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" sortable width="80"/>
      <el-table-column prop="title" label="标题" sortable width="150" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="time" label="发布日期" sortable width="100"/>
      <el-table-column prop="address" label="发布地点" width="120"/>
      <el-table-column label="内容" width="280">
        <template #default="scope">
          <div>
            {{ truncateContent(scope.row.article) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="pic" label="图片" width="100"/>
      <el-table-column label="操作" width="185">
        <template #default="scope">
          <el-button size="small" @click="openDrawer(scope.row)">
            详细
          </el-button>
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
    <div style="margin: 10px 0; ">
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

    <!--    对话框，用以编辑内容-->
<!--    <el-dialog v-model="data.dialogFormVisible" title="文章信息" width="30%">-->
    <el-drawer
        title="文章信息"
        v-model="data.dialogFormVisible"
        direction="ltr"
        size="70%"
    >
      <el-form label-width="100px" size="large" required="true">
        <el-form-item label="标题" >
          <el-input v-model="data.form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="data.form.author" autocomplete="off" />
        </el-form-item>
        <el-form-item label="发布日期" >
          <el-date-picker v-model="data.form.time" type="date" placeholder="选择日期" :default-value="new Date()">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发布地点" >
          <el-input v-model="data.form.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="内容" >
          <el-input type="textarea" v-model="data.form.article" autocomplete="off" :autosize="{ minRows: 10, maxRows: 30}" />
        </el-form-item>
        <el-form-item label="图片" >
        <el-input v-model="data.form.pic" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>
<!--    </el-dialog>-->

<!--    抽屉，用以查看文章详情-->
    <el-drawer
        title="文章详情"
        v-model="data.drawerVisible"
        size="30%"
        :with-header="true">
      <div>
        <h2>{{ currentArticle.title }}</h2>
        <p><strong>作者：</strong>{{ currentArticle.author }}</p>
        <p style=" white-space: pre-wrap;word-spacing: 1em;">{{ currentArticle.article }}</p>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import {defineComponent,ref,getCurrentInstance} from "vue";
import {Refresh, Search} from '@element-plus/icons'
import {ElMessage } from 'element-plus'
import request from "@/utils/request";

export default defineComponent({
  name: 'Columns',
  components: {
    Search,
    Refresh
  },
  setup(){
    const data = ref({
      total:0, //分页总数
      tableData:[],
      pageNum:1,
      pageSize:5,
      title:"", //搜索标题,默认为空
      author:"", //搜索作者,默认为空
      dialogFormVisible:false,
      form:{},
      multipleSelection:[],  //复选框选中时获得的数据
      drawerVisible:false,
    })

    const currentArticle = ref({})

    const truncateContent = (content) => {
      return content.length > 100 ? content.slice(0, 100) + '...' : content
    }

    const openDrawer = (article) => {

      currentArticle.value = article
      data.value.drawerVisible = true
      console.log("已触发"+data.value.drawerVisible)
    }

    const load = () =>{
      request.get(`/columns/page`,{
        params:{
          pageNum: data.value.pageNum,
          pageSize: data.value.pageSize,
          title: data.value.title,
          author: data.value.author,
        }
      }).then(res => {
        console.log(res)
        data.value.tableData = res.records
        data.value.total = res.total
      })

    }

    //页面刚开始时调用渲染数据
    load()

    //重置搜索数据为空
    const reset = () => {
      data.value.title = ""
      data.value.author = ""
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

    const handleAdd = () =>{
      data.value.dialogFormVisible = true;
      data.value.form = {time:new Date()}//设置日期默认值
    };

    const save = () =>{
      request.post(`/columns`, data.value.form).then(res => {
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

    const handleDelete = (id) =>{
      request.delete(`/columns/${id}`).then(res =>{
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
      request.post(`/columns/del/batch`, ids).then(res =>{
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
      save,
      load,
      reset,
      handleSelectionChange,
      data,
      truncateContent,
      openDrawer,
      currentArticle,
    }
  }
});
</script>

<style scoped>
p{
  margin: 10px auto
}
</style>