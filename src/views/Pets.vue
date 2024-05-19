<template>
  <el-container style="width: 80%; margin: 0 auto;">
<!--    //标题-->
    <el-header>
      <h1>领养中心</h1>
    </el-header>

<!--    //搜索区域-->
    <div style="margin-left: 20%;margin-top: 25px">
      <!--      //根据名字搜索-->
      <el-input
          v-model="data.petname"
          clearable
          style="max-width: 20%; margin-right: 10px "
          placeholder="请输入名称"
      >
        <template #suffix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>

      <!--      根据性别搜索-->
      <el-select
          v-model="data.sex"
          clearable
          placeholder="性别"
          style="max-width: 7%; margin-right: 10px "
      >
        <el-option
            v-for="item in sexchs"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

      <!--      根据品种搜索-->
      <el-input
          v-model="data.pettype"
          clearable
          style="max-width: 20%; margin-right: 10px"
          placeholder="请输入品种"
      >
        <template #suffix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>

      <!--      根据领养状态-->
      <el-select
          v-model="data.state"
          clearable
          placeholder="领养状态"
          style="width: 10%; margin-right: 10px"
      >
        <el-option
            v-for="item in statechs"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

      <el-button type="primary" @click="load">
        搜索<el-icon class="el-input__icon"><search /></el-icon>
      </el-button>

      <el-button type="warning" @click="reset">
        重置<el-icon><Refresh /></el-icon>
      </el-button>

    </div>
<!--    分割线-->
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>

<!--    卡片展示-->
    <el-main>
      <el-row style="margin: 0 5%"  :gutter="40" v-for="(row, rowIndex) in petRows" :key="rowIndex">
        <el-col :span="12" v-for="pet in row" :key="pet.id">
          <el-card class="pet-card" @click="goToPetDetail(pet.id)">
            <div class="pet-card-content">
              <img :src="pet.pic" class="pet-image" alt="Pet Image">
              <div class="pet-info">
                <h2>{{ pet.petname }}</h2>
                <p>{{ pet.sex }} - {{ pet.age }}岁 - {{getAdoptionStatus(pet.state)}}</p>
                <p>{{pet.remark}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <!--    分页区域-->
    <div style="margin: 10px 0; ">
      <el-pagination
          :current-page="data.pageNum"
          :total="data.total"
          :page-size="data.pageSize"
          :page-sizes="[4, 8, 16, 24]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="margin:0 auto; width: 500px"
      />
    </div>

  </el-container>
</template>

<script>
import { ref } from 'vue';
import { ElContainer, ElHeader, ElMain, ElRow, ElCol, ElCard } from 'element-plus';
import router from "@/router";
import request from "@/utils/request";
import {Refresh, Search} from '@element-plus/icons'

export default {
  name: "Petmanage",

  components: {
    ElContainer,
    ElHeader,
    ElMain,
    ElRow,
    ElCol,
    ElCard,
    Search,
    Refresh
  },

  setup() {
    const data = ref({
      total:0, //分页总数
      pets:[],
      pageNum:1,
      pageSize:8,
      petname:"", //搜索名字,默认为空
      pettype:"", //搜索品类,默认为空
      sex:"",//搜索性别，默认为空
      state:"",//领养状态，默认为空
    })

    //性别选择下拉栏数据
    const sexchs = [
      {
        value: '雌性',
        label: '雌性',
      },
      {
        value: '雄性',
        label: '雄性',
      }
    ]

    //领养状态选择下拉栏数据
    const statechs = [
      {
        value: '0',
        label: '待领养',
      },
      {
        value: '1',
        label: '领养人竞选中',
      },
      {
        value: '2',
        label: '已被领养',
      }

    ]

    const petRows = ref([]);

    //处理领养状态将数字转换为文字
    const getAdoptionStatus = (state) => {
      switch (state) {
        case 0:
          return '待领养';
        case 1:
          return '领养人竞选中';
        case 2:
          return '已被领养';
      }
    };

    //点击跳转至对应页面
    const goToPetDetail = (id) => {
      router.push({ path: '/petinfo', params: { id } });
    };

    const load = () =>{
      request.get(`/pet/page`,{
        params:{
          pageNum: data.value.pageNum,
          pageSize: data.value.pageSize,
          petname: data.value.petname,
          pettype: data.value.pettype,
          sex: data.value.sex,
          state: data.value.state,
        }
      }).then(res => {
        data.value.pets = res.records
        data.value.total = res.total
        petRows.value = []
          for (let i = 0; i < data.value.pets.length; i += 2) {
              petRows.value.push(data.value.pets.slice(i, i + 2));
        }
      })

    }

    //页面刚开始时调用渲染数据
    load()

    //重置搜索数据为空
    const reset = () => {
      data.value.petname = ""
      data.value.pettype = ""
      data.value.state = ""
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

    return {
      petRows,
      data,
      goToPetDetail,
      sexchs,
      statechs,
      getAdoptionStatus,
      handleSizeChange,
      handleCurrentChange,
      load,
      reset
    };
  },
}

</script>

<style scoped>

.el-header {
  text-align: center;
  padding: 20px 0;
}

.pet-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px; /* 行与行的间隔 */
  width: 100%;
  height: 150px;
}

.pet-card-content {
  display: flex;
  flex-direction: row;
}

.pet-image {
  width: 150px;
  height: 100px;
  margin-right: 40px;
  object-fit: cover; /* 确保图片覆盖整个区域，同时保持宽高比 */
  object-position: center; /* 确保图片以中心为锚点进行缩放 */
}

.pet-info {
  display: flex;
  flex-direction: column;
}

.pet-info h2 {
  margin: 0;
  font-size: 1.5em;
}

.pet-info p {
  margin-top: 3px;
  font-size: 1em;
  color: #666;
}

.el-card__body {
  padding: 0 !important; /* Remove default padding */
  display: flex; /* Ensure content stretches to full height */
  flex-direction: row;
  align-items: center;
  justify-content: start;
}
</style>