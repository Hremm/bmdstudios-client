<template>
  <div>
    <van-tabbar v-model="active" @change="tabChange">
      <van-tabbar-item name="/home/index">
        <span>电影</span>
        <template #icon="props">
          <img :src="require(`@/assets/tabs/index_${props.active ? 1 : 0}.png`)">
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="/home/show">
        <span>视频</span>
        <template #icon="props">
          <img v-show="!props.active" src="@/assets/tabs/show_0.png">
          <img v-show="props.active" src="@/assets/tabs/show_1.png">
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="/home/video">
        <span>演出</span>
        <template #icon="props">
          <img v-show="!props.active" src="@/assets/tabs/video_0.png">
          <img v-show="props.active" src="@/assets/tabs/video_1.png">
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="/home/me">
        <span>我的</span>
        <template #icon="props">
          <img v-show="!props.active" src="@/assets/tabs/me_0.png">
          <img v-show="props.active" src="@/assets/tabs/me_1.png">
        </template>
      </van-tabbar-item>
    </van-tabbar>

</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()


const active = ref('/home/index');
const tabChange = function (index: string) {
  router.push(index)
}


</script>
