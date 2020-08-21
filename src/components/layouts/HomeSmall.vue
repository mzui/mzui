<template>
  <van-row style="margin-top: 20px;">
    <van-col span="22" offset="1" >
      <router-view />
    </van-col>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" replace to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o" replace to="/about">关于</van-tabbar-item>
      <van-tabbar-item icon="setting-o" replace to="/setting">设置</van-tabbar-item>
    </van-tabbar>
  </van-row>
</template>
<script>
export default {
    name: 'HomeSmall',
    components:{}, 
    props:{}, 
    data() {return {
        active: 0,
    }},
    created() { },
    mounted() { },
    methods: { },
    computed: { },
}
</script>
<style lang='less' scoped></style>
<style lang='less'></style>