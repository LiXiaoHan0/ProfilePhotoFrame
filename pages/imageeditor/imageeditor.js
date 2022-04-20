//index.js
const app = getApp()

Page({
  scale: 1,
  data: {
    piclist:null, // 头像框列表
    logo:null, // 是否有logo
    slideColor:null, // 滑动条颜色
    bgPic: null, // 头像图片地址
    scale: 1, // 图片放大倍数
    currentId: 1, // 当前选择的图片序号
    CenterX: 0, // 头像相对父元素x坐标
    CenterY: 0, // 头像相对父元素y坐标
    kCenterX: wx.getSystemInfoSync().windowWidth / 2 - 150, // 头像框相对父元素x坐标
    kCenterY: 0, // 头像框相对父元素x坐标
  },
  onReady() {
    this.center_x = this.data.CenterX;
    this.center_y = this.data.CenterY;

    this.touch_target = "";
    this.start_x = 0;
    this.start_y = 0;
  },
  onLoad() {
    let i = 1;
    let list=new Array(app.globalData.picnum).fill(i++);
    this.setData({
      piclist:list,
      rate: app.globalData.rate,
      height: app.globalData.height,
      bgPic: app.globalData.bgPic,
      logo:app.globalData.logo,
      slideColor:app.globalData.slideColor
    })
    wx.showToast({
      title: '拖动图片调整位置',
      icon: 'none',
      duration: 2000,
    })
  },

  draw(e) { //选择图片
    this.setData({
      currentId: e.target.dataset.id,
    })
  },

  // 移动工具组
  touchStart(e) { // 移动开始
    if (e.target.id == "bg") {
      this.touch_target = "bg";
    }
    if (this.touch_target != "") {
      this.start_x = e.touches[0].clientX;
      this.start_y = e.touches[0].clientY;
    }
  },
  touchEnd(e) { // 移动过程中
    this.center_x = this.data.CenterX;
    this.center_y = this.data.CenterY;
    this.touch_target = "";
  },
  touchMove(e) { // 移动结束
    var current_x = e.touches[0].clientX;
    var current_y = e.touches[0].clientY;
    var moved_x = current_x - this.start_x;
    var moved_y = current_y - this.start_y;
    if (this.touch_target == "bg") {
      this.setData({
        CenterX: this.data.CenterX + moved_x,
        CenterY: this.data.CenterY + moved_y,
      })
    };
    this.start_x = current_x;
    this.start_y = current_y;
  },
  changeScale(e) {
    let s = e.detail.value
    this.setData({
      height: s * app.globalData.height,
    })
    this.scale = s
    console.log(this.data.scale)
  },
  savePic() {
    app.globalData.center_x = this.center_x
    app.globalData.center_y = this.center_y
    app.globalData.currentId = this.data.currentId
    app.globalData.scale = this.scale
    console.log(app.globalData)
    wx.navigateTo({
      url: '../combine/combine',
    })
  },
  onShareAppMessage: function (options) { //分享
    return {
      path: 'pages/index/index',
      imageUrl: '/image/x.png'
    }
  },
  onShareTimeline() { //转发朋友圈
    return {
      query: 'pages/index/index',
      imageUrl: '/image/x.png'
    }
  }
})