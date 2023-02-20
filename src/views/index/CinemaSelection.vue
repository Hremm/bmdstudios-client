<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="" left-arrow></van-nav-bar>

    <!-- 广告 -->
    <app-header></app-header>

    <!-- 电影详细描述 -->
    <movie-desc v-if="movie" :movie="movie"></movie-desc>

    <!-- 顶部时间导航条 -->
    <van-sticky>
      <van-tabs v-model:active="activeDate" swipe-threshold="1" line-width="80px">
        <van-tab v-for="item in dateAry" name="item.format('YYYY-MM-DD')"
          :title="item.format(`周${Week[parseInt(item.format('e'))]} MM月DD日`)"></van-tab>
      </van-tabs>
    </van-sticky>

    <!-- 电影院列表项 -->
    <van-empty v-if="cinemas.length == 0">暂无数据</van-empty>
    <div class="item mb-line-b" v-for="item in cinemas" @click.native="$router.push('/plan-selection')">
      <div class="title-block">
        <div class="title line-ellipsis">{{ item.cinema_name }}</div>
        <div class="location-block">
          <div class="flex line-ellipsis">{{ item.address }}</div>
          <!-- <div class="distance">8.6 km</div> -->
        </div>
        <div class="label-block">
          <p class="vipTag" v-for="tag in item.tags.split('/')">{{ tag }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import moment from 'moment'
import MovieDetail from './MovieDetail.vue';
import httpApi from '@/http';
import { useRoute } from 'vue-router';
import Cinema from '@/types/cinema';
import Movie from '@/types/Movie';
const route = useRoute()
const cinemas = reactive<Cinema[]>([])



//准备一个时间数组
enum Week { '日', '一', '二', '三', '四', '五', '六' }//枚举来替换星期
let dateAry: moment.Moment[] = []
for (let i = 0; i <= 7; i++) {
  dateAry.push(moment().add(i, 'days'))
}
console.log(dateAry)

//时间标签组
const activeDate = ref('2023-02-20')
watch(activeDate, (newval, oldval) => {
  // console.log(newval)
  let params = { movie_id: parseInt(movieId), showingon_date: newval }
  httpApi.cinemaApi.queryByMovieIdAndDate(params).then(res => {
    console.log('查到的电影列表如下', res)
    cinemas.splice(0, cinemas.length, ...res.data.data)
  })
})

// mounted 加载电影详情数据
const movieId = route.params.id as string
const movie = ref<Movie>()
onMounted(() => {
  httpApi.movieApi.queryById({ id: movieId }).then(res => {
    console.log('加载电影详情：', res)
    movie.value = res.data.data
  })
})

</script>

<style scoped>
.buyblock {
  padding: 10px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}

.container {
  background-color: #f5f5f5;
}

.movie-detail {
  overflow: hidden;
  z-index: 1;
  height: 188px;
  position: relative;
  cursor: pointer;
}

.movie-detail .movie-filter {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #333;
}

.poster-background {
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  position: absolute;
  -webkit-filter: blur(1.2rem);
  filter: blur(1.2rem);
  background-size: cover;
  background-repeat: no-repeat;
  opacity: .55;
}

.movie-detail .detail {
  height: 150px;
  padding: 19px 30px 19px 15px;
}

.movie-detail .detail {
  display: flex;
  height: 150px;
  padding: 19px 30px 19px 15px;
}

.movie-detail .detail .poster img {
  width: 110px;
  height: 150px;
  box-sizing: border-box;
}

.movie-detail .detail .content {
  flex: 1;
  overflow-x: hidden;
  margin-left: 12.5px;
  line-height: 1;
  color: #fff;
}

.movie-detail .detail .content .title {
  font-size: 20px;
  margin-top: 2px;
  font-weight: 700;
  overflow: hidden;
}

.line-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.movie-detail .detail .content .score {
  font-size: 18px;
  font-weight: 700;
  color: #fc0;
  margin-top: 17px;
}

.movie-detail .detail .content .type {
  margin-top: 17px;
  font-size: 12px;
  color: #fff;
  opacity: .8;
}


.mb-line-b {
  padding: 10px;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.title-block {
  line-height: 1.5;
}

.title {
  height: 23px;
  line-height: 23px;
  font-size: 16px;
  color: #000;
}

.line-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.location-block {
  display: flex;
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}

.flex {
  -webkit-box-flex: 1;
  flex: 1;
}

.line-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.distance {
  margin-left: 5px;
}

.label-block {
  height: 24px;
  line-height: 22px;
  margin-top: 4px;
  margin-bottom: 4px;
  overflow: hidden;
}

.label-block p {
  position: relative;
  display: inline-block;
  padding: 3px;
  height: 13px;
  line-height: 15px;
  border-radius: 2px;
  font-size: 12px;
  margin-right: 5px;
}

.allowRefund,
.endorse,
.hallType {
  color: #589daf;
  border: 1px solid #589daf;
}

.vipTag,
.snack {
  color: #f90;
  border: 1px solid #f90;
}
</style>