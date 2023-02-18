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
    <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onPullRefresh">
      <van-list v-if="movies && movies.length > 0" v-model:loading="loading" :finished="finished" finished-text="暂无更多数据"
        @load="onLoad">
        <movie-item v-for="item in movies" :key="item.id" :movie="item" @click="router.push(`/detail/${item.id}`)">
        </movie-item>

      </van-list>
      <van-empty v-else>暂无数据</van-empty>
    </van-pull-refresh>
    <div style="height: 50px;"></div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import httpApi from '@/http'
import Movie from '@/types/Movie'
import { useRouter } from 'vue-router';
//获取路由管理器
const router = useRouter()



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


// 顶部导航栏切换相关
const navActive = ref('1')
watch(navActive, (newVal, oldval) => {
  console.log(newVal, oldval)//newVal就是cid类别的id
  //切换时回到顶部,且让其仍能加载更多
  window.scrollTo(0, 0)
  finished.value = false
  //去缓存中寻找数据,若存在就不再发送请求
  let str = localStorage.getItem(newVal)
  if (str != null) {
    let data: Movie[] = JSON.parse(str)
    movies.splice(0, movies.length, ...data)
    return;
  }

  //发送请求
  let params = { cid: parseInt(newVal), page: 1, pagesize: 20 }
  httpApi.movieApi.queryByCategoryId(params).then(res => {
    console.log('加载首页相关列表', res)
    movies.splice(0, movies.length, ...res.data.data.result)
    // 处理客户端缓存，将下载的数据存到LocalStorage中
    let value = JSON.stringify(res.data.data.result)
    localStorage.setItem(newVal, value)
  })


})
//触底加载
const loading = ref(false)
const finished = ref(false)
const onLoad = function () {
  console.log('onLoad...')
  let cid = parseInt(navActive.value)
  let page = Math.floor(movies.length / 20) + 1
  let params = { cid, page, pagesize: 20 }
  httpApi.movieApi.queryByCategoryId(params).then(res => {
    console.log(`加载到了第${page}页的数据`, res)
    movies.push(...res.data.data.result)
    loading.value = false
    //判断是否加载完毕,否则将一直加载
    if (movies.length == res.data.data.total) {
      finished.value = true
    }
  })
}

//下拉刷新
const refreshing = ref(false);
const onPullRefresh = function () {
  console.log('下拉刷新')
  let params = { cid: parseInt(navActive.value), page: 1, pagesize: 20 }
  httpApi.movieApi.queryByCategoryId(params).then(res => {
    movies.splice(0, movies.length, ...res.data.data.result)
    finished.value = false
    refreshing.value = false
    //更新缓存
    localStorage.setItem(
      navActive.value, JSON.stringify(res.data.data.result)
    )
  })
}

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
