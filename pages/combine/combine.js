const app = getApp()

Page({
  data: {
    logo:null, // 是否有logo
    loc: wx.getSystemInfoSync().windowWidth / 2,
  },
  onLoad() {
    this.setData({
      logo:app.globalData.logo
    })
    // 通过 SelectorQuery 获取 Canvas 节点
    wx.createSelectorQuery()
      .select('#canvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(this.init.bind(this))
  },
  init(res) { // 画图初始化处理
    let res0 = res
    let that = this
    wx.getImageInfo({
      src: app.globalData.bgPic,
      success: res => {
        // 获取画图实例
        const canvas = res0[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        that.canvas = canvas
        canvas.width = 300 * dpr
        canvas.height = 300 * dpr
        ctx.scale(dpr, dpr)

        ctx.clearRect(0, 0, 300, 300);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 300, 300)
        const img1 = canvas.createImage()
        console.log(res['path'])
        img1.src = res['path']
        img1.onload = () => {
          let that = app.globalData
          ctx.drawImage(img1, that.center_x, that.center_y, that.height * that.rate * that.scale, that.height * that.scale);
          const img2 = canvas.createImage()
          img2.src = "../../image/" + app.globalData.currentId + ".png"
          img2.onload = () => {
            ctx.drawImage(img2, 0, 0, 300, 300);
          }
        }
        wx.showToast({
          title: '制作成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: () => {
        wx.showToast({
          title: '制作失败，请先保存头像至本地后从相册导入头像',
          icon: 'none',
          duration: 2000,
        })
      },
    })
  },
  savePic() { // 保存图片至本地相册
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      height: 300,
      width: 300,
      canvasId: 'canvas',
      canvas: this.canvas,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          },
          fail: (res) => {
            wx.showToast({
              title: '保存失败，请确认已打开相册保存权限',
              icon: 'none',
              duration: 2000,
            })
            console.log(res) // 输出错误信息
          }
        })
      }
    });
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