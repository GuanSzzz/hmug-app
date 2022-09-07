<template>
  <view>
    <view class="topSearch">
      <view class="search_btn">
        搜索
      </view>
    </view>

    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item @click="goGoodsDetail(item.goods_id)" v-for="(item, i) in banners" :key="i">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" @click="goCateClick(item)" v-for="(item, i) in navList" :key="i">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>


    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item,i) in floors" :key="i">
        <!-- 楼层标题 -->
        <image class="floor-title" :src="item.floor_title.image_src"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box">
            <image class="left-img" :src="item.product_list[0].image_src"
              @click="goGoodsList(item.product_list[0].navigator_url)"
              :style="{width:item.product_list[0].image_width+'rpx'}"></image>
          </view>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2,i) in item.product_list" :key="i" v-if="i!==0">
              <image class="image" @click="goGoodsList(item2.navigator_url)" :src="item2.image_src"
                :style="{width:item2.image_width+'rpx'}"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
  import {
    getBanners,
    getNavsList,
    getFloors
  } from '@/api/home.js'
  export default {
    data() {
      return {
        banners: [],
        navList: [],
        floors: []
      };
    },

    methods: {
      // 获取轮播图
      async loadBanners() {
        const res = await getBanners()

        this.banners = res
      },
      // 获取nav
      async loadNavsList() {
        const res = await getNavsList()
        this.navList = res
      },
      // 获取楼层图
      async getFloorsList() {
        const res = await getFloors()
        // console.log(res);
        this.floors = res
      },
      // 跳转详情
      goGoodsDetail(id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?id=' + id
        })
      },
      // 跳分类页
      goCateClick(item) {
        if (item == '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 跳商品列表页
      goGoodsList(url) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?' + url.split('?')[1]
        })
      }
    },
    onLoad() {
      this.loadBanners()
      this.loadNavsList()
      this.getFloorsList()
    }
  }
</script>

<style lang="scss">
  .topSearch {
    width: 750rpx;
    height: 70px;
    background-color: #c00000;
    display: flex;
    justify-content: center;
    overflow: hidden;

    .search_btn {
      width: 450rpx;
      height: 30px;
      margin-top: 25px;
      margin-right: 50px;
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }


  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .image {
      height: 190rpx;
    }
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .left-img {
      height: 392rpx !important;
    }
  }
</style>
