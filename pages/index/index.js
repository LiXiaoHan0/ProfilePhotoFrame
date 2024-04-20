// pages/index/index.js
const app = getApp();

Page({
    data: {
        logo: null, // 是否有logo
        bgPic: null, // 头像图片地址
        picChoosed: false, // 图片是否完成选择
    },
    onLoad() {
        this.setData({
            logo: app.globalData.logo
        })
    },
    assignPicChoosed() { // 设置图片选择
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
    chooseImage(e) { // 选择图片
        // 普通方案，头像不清晰
        // const {
        //     avatarUrl
        // } = e.detail
        // if (avatarUrl) {
        //     this.setData({
        //         bgPic: avatarUrl
        //     });
        //     this.assignPicChoosed();
        // } else {
        //     this.assignPicChoosed();
        //     wx.showToast({
        //         title: '读取失败',
        //         icon: 'error'
        //     })
        // }

        // 备选方案
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            sizeType:['original'],
            success: res => {
                const avatarUrl = res.tempFiles[0].tempFilePath
                console.log(avatarUrl)
                if (avatarUrl) {
                    this.setData({
                        bgPic: avatarUrl
                    });
                    this.assignPicChoosed();
                } else {
                    this.assignPicChoosed();
                    wx.showToast({
                        title: '读取失败',
                        icon: 'error'
                    })
                }
            }
        })
    },
    nextPage() { // 进入下一页
        app.globalData.bgPic = this.data.bgPic;
        wx.getImageInfo({
            src: this.data.bgPic,
            success: res => {
                app.globalData.rate = res.width / res.height
            } 
        })
        wx.navigateTo({
            url: '../imageeditor/imageeditor',
        })
    },
    // onShareAppMessage: function (options) { // 分享
    //     return {
    //         path: 'pages/index/index',
    //         imageUrl: '/image/x.png'
    //     }
    // },
    // onShareTimeline() { // 转发朋友圈
    //     return {
    //         query: 'pages/index/index',
    //         imageUrl: '/image/x.png'
    //     }
    // }
})