//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    logo: true, // 是否使用logo
    picnum:4, // 可选头像框数量
    cloud:true, // 是否进行云端统计
    cloudid:"0ab5303b6273a3520190ada07fb2eba4", // 云端数据库字段id
    slideColor: ['#ffffff','#999999'], // 滑动条颜色

    bgPic: null, // 头像图片地址
    center_x: 0, // 图片平移x距离
    center_y: 0, // 图片平移y距离
    rate: null, // 图片宽高比
    height: null, // 图片高度
    scale: 1, // 图片放大倍数
    currentId: 1, // 选择头像框遍号
  }
})