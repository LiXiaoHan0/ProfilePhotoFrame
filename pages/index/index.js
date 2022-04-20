// pages/index/index.js
const app = getApp();

Page({
  data: {
    logo:null, // 是否有logo
    bgPic: null, // 头像图片地址
    picChoosed: false, // 图片是否完成选择
    canIUseGetUserProfile: false, // 小程序是否有获取用户头像权限
  },
  onLoad() { //预加载
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
        logo:app.globalData.logo
      })
    }
  },
  assignPicChoosed() { //设置图片选择
    if (this.data.bgPic) {
      this.setData({
        picChoosed: true
      })
    } else {
      this.setData({
        picChoosed: false
      })
    }
  },
  getAvatar() { //获取用户头像
    wx.getUserProfile({
      desc: '生成头像框',
      success: (res) => {
        this.setData({
          bgPic: res.userInfo.avatarUrl.replace("132", "0").replace("thirdwx", "wx"),
          picChoosed: true,
        })
      },
      fail: () => {
        wx.showToast({
          title: '读取失败',
          icon: 'error'
        })
      }
    })
  },
  chooseImage(from) { //相册中选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [from.target.dataset.way],
      success: (res) => {
        this.setData({
          bgPic: res.tempFilePaths[0]
        });
        this.assignPicChoosed();
      },
      fail: (res) => {
        this.assignPicChoosed();
        wx.showToast({
          title: '读取失败',
          icon: 'error'
        })
        console.log(res)
      },
    })
  },
  finish(e) { //图片加载成功后回调
    var rate = e.detail.width / e.detail.height
    if (rate > 1) {
      app.globalData.height = 300 / rate
    } else {
      app.globalData.height = 300
    }
    app.globalData.rate = rate
  },
  nextPage() { //进入下一页
    app.globalData.bgPic = this.data.bgPic;
    wx.navigateTo({
      url: '../imageeditor/imageeditor',
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