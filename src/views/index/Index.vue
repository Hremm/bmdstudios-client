<template>
    <div>
        <!-- 标题栏 -->
        <van-nav-bar title="仙贝影城">
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
            <van-tabs v-model:active="navActive">
                <van-tab title="热映" name="1"></van-tab>
                <van-tab title="待映" name="2"></van-tab>
                <van-tab title="经典" name="3"></van-tab>
            </van-tabs>
            <van-icon name="search" />
        </div>


</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 顶部标题栏相关
const showPopover = ref(false)
const actions = ref([{ text: '首页' }, { text: '热点' }, { text: '新闻' }])

// 顶部导航栏相关
const navActive = ref('1')

</script>

<style scoped>
.nav {
    display: flex;
}
</style>




<style>
:root:root {
    --van-nav-bar-background: #f03d37;
    --van-nav-bar-title-text-color: #fff;
    --van-nav-bar-icon-color: #fff;
}
</style>
