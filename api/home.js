import fly from '@/utils/request.js'

// 获取首页轮播图
export const getBanners = () => fly.get('/home/swiperdata')
// 获取导航
export const getNavsList = () => fly.get('/home/catitems')
// 获取楼层
export const getFloors = () => fly.get('/home/floordata')
