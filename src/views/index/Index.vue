<template>
  <div>
    <van-sticky>
      <!-- 标题栏 -->
      <van-nav-bar title="仙贝影院">
        <template #right>
          <van-popover v-model:show="showPopover" :actions="actions" placement="bottom-end">
            <template #reference>
              <van-icon name="apps-o" size="22" />
            </template>
          </van-popover>
        </template>
      </van-nav-bar>

      <!-- AppHeader广告栏 -->
      <!-- <AppHeader></AppHeader> -->
      <!-- <appHeader></appHeader> -->
      <!-- <app-header></App-Header> -->
      <app-header></app-header>

      <!-- 顶部导航 -->

      <div class="nav">
        <p>北京</p>
        <span class="arrow"></span>
        <!-- 标签组 -->
        <van-tabs color="#f03d37" class="tabs" v-model:active="navActive">
          <van-tab title="热映" name="1"></van-tab>
          <van-tab title="待映" name="2"></van-tab>
          <van-tab title="经典" name="3"></van-tab>
        </van-tabs>
        <van-icon style="font-weight: bold;" size="22px" color="#f03d37" class="icon" name="search" />
      </div>
    </van-sticky>

    <!-- 电影列表 -->
    <movie-item v-for="item in movies" :key="item.id" :movie="item"></movie-item>
    <div style="height: 50px;"></div>

</div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import httpApi from '@/http'
import Movie from '@/types/Movie'

// 处理页面挂载完毕后，自动加载热映类别下的首页电影列表数据
const movies = reactive<Movie[]>([])
onMounted(() => {
  console.log('onMounted...1')
  // 发送请求，加载数据  
  let params = { cid: 1, page: 1, pagesize: 20 }
  httpApi.movieApi.queryByCategoryId(params).then(res => {
    movies.push(...res.data.data.result)
    console.log('加载首页热映列表', movies)
  })
})
onMounted(() => {
  console.log('onMounted...2')  // 可以重复调用
})



// 顶部标题栏相关
const showPopover = ref(false)
const actions = ref([{ text: '首页' }, { text: '热点' }, { text: '新闻' }])


// 顶部导航栏相关
const navActive = ref('1')

</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  padding: 0px 15px;
  border-bottom: 1px solid #e2e2e2;
  background-color: #fff;
}

.nav .arrow {
  display: block;
  border: 5px solid transparent;
  border-top-color: black;
  margin-top: 5px;
  margin-left: 5px;
}

.nav .tabs {
  flex: 1;
  margin: 0px 25px;
}
</style>




<style>
:root:root {
  --van-nav-bar-background: #f03d37;
  --van-nav-bar-title-text-color: #fff;
  --van-nav-bar-icon-color: #fff;
}
</style>
