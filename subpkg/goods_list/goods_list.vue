<template>
  <view>
    <van-card :thumb-link="`/subpkg/goods_detail/goods_detail?id=`+item.goods_id" v-for="item in goods"
      :key="item.goods_id" :price="item.goods_price | toFixed" :title="item.goods_name"
      :thumb="item.goods_small_logo || defaultPic" />
  </view>
</template>

<script>
  import {
    getGoodsList
  } from '@/api/goods.js'
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {
        queryData: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goods: [],
        total: 0,
        isloading: false,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },
    methods: {
      // 加载商品列表页
      async loadGoodsList(stopPullDown) {
        this.isloading = true
        const {
          goods,
          total
        } = await getGoodsList(this.queryData)
        this.isloading = false
        this.goods = [...this.goods, ...goods]
        this.total = total
        stopPullDown && stopPullDown()
      },

    },
    onLoad({
      query
    }) {
      this.queryData.query = query
      this.loadGoodsList()
    },
    // 下拉刷新
    onPullDownRefresh() {
      this.queryData = {
          query: this.queryData.query,
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        this.goods = []
      this.total = 0

      this.loadGoodsList(() => {
        uni.stopPullDownRefresh()
      })
    },
    // 上拉触底
    onReachBottom() {
      if (this.queryData.pagenum * this.queryData.pagesize >= this.total) return toast('亲，无数据了~')
      if (this.isloading) return
      this.queryData.pagenum++
      this.loadGoodsList()
    }
  }
</script>

<style>

</style>
