//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    picnum:5,
    logo: true, // 是否使用logo
    slideColor: ['#ffffff','#aaaaaa'], // 滑动条颜色
    bgPic: null, // 头像图片地址
    center_x: 0, // 图片平移x距离
    center_y: 0, // 图片平移y距离
    rate: null, // 图片宽高比
    height: null, // 图片高度
    scale: 1, // 图片放大倍数
    currentId: 1, // 选择头像框遍号
  }
})