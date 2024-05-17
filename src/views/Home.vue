<template>

  <div style="width: 100%;height: 100%;margin: 0 5%">
<!--    轮播图-->
    <el-carousel style="width: 100%;height:500px;margin: 20px auto;">
      <el-carousel-item v-for="(item, index) in data.items" :key="index" style="height:500px;">
        <img :src="item.src" @click="linkTo(item.path)" style="width: 100%;height: auto;cursor: pointer;">
      </el-carousel-item>
    </el-carousel>

<!--    卡片展示-->
    <el-row justify="space-between">
      <el-col :span="7" >
        <el-card shadow="hover" class="adopt-card">
          <el-row type="flex" align="middle">
            <el-col :span="10">
              <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="card-img"
              />
            </el-col>
            <el-col :span="14">
              <div class="card-content">
                <h3>前去领养</h3>
                <p>点击这里了解更多信息</p>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="hover" class="adopt-card">
          <el-row type="flex" align="middle">
            <el-col :span="10">
              <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="card-img"
              />
            </el-col>
            <el-col :span="14">
              <div class="card-content">
                <h3>学习知识</h3>
                <p>点击这里了解更多信息</p>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="hover" class="adopt-card">
          <el-row type="flex" align="middle">
            <el-col :span="10">
              <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="card-img"
              />
            </el-col>
            <el-col :span="14">
              <div class="card-content">
                <h3>了解更多</h3>
                <p>点击这里了解更多信息</p>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ref} from "vue";
import router from "@/router";
export default {
  name: "Home",
  setup(){
    const data = ref({
      items:[
        {src:'https://www.imgur.la/images/2024/05/18/NSHM_PHOTO_2024_5_15_01_03_20.jpg', path:'/user'},
        {src:'https://www.imgur.la/images/2024/03/28/74b0d8771b847868061493dcb602fe93.png', path:'/user'},
        {src:'https://www.imgur.la/images/2024/03/28/74b0d8771b847868061493dcb602fe93.png', path:'/user'},
        {src:'https://www.imgur.la/images/2024/03/28/74b0d8771b847868061493dcb602fe93.png', path:'/user'}
      ]
        })

    const linkTo = (path)=>{ router.push(path); };

    return{
      data,
      linkTo
    }
  }
}
</script>

<style scoped>
.adopt-card {
  width: 100%;
  max-width: 480px;
}

.card-img {
  width: 100%;
  object-fit: cover;
}

.card-content {
  padding-left: 10px;
  word-wrap: break-word; /* 确保长单词在必要时换行 */
  word-break: break-all; /* 确保长单词在必要时换行 */
}

.card-content h3 {
  margin: 0;
}

.card-content p {
  margin: 0;
  overflow-wrap: break-word; /* 确保长单词在必要时换行 */
}
</style>