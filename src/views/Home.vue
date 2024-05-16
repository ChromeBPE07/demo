<template>
  <div style="width: 100%;height: 100%">
    <el-carousel>
      <el-carousel-item v-for="(item, index) in data.items" :key="index">
        <img :src="item.src" @click="linkTo(item.path)" style="width: 600px;height: 350px">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {ref} from "vue";
export default {
  name: "Home",
  setup(){
    const data = ref({
      items:[
        {src:'https://th.bing.com/th/id/OIP.z5zTAiFkggzKjJn8rR9g1wHaEo?w=313&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7'}
      ]
        })

    const linkTo = (path)=>{};
    return{
      data
    }
  }
}
</script>

<style scoped>
img {
  height: 300px;
  width: 600px;
  margin: 0;
}
</style>