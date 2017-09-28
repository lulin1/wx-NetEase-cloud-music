// pages/now/now.js
var Common = require('../../common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster: "http://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg",
    isLyric: false,
    lyricArr: [],
    isPlaying: true,
    dataUrl: ''
  },

  showLyric: function () {
    console.log('isLyric is :',this.data.isLyric)
    this.setData({
      isLyric: false
    })
    console.log('isLyric is :', this.data.isLyric)
  },
  showCover: function () {
    console.log('isLyric is :', this.data.isLyric)
    this.setData({
      isLyric: true
    })
    console.log('isLyric is :', this.data.isLyric)
  },
  play: function () {
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        var status = res.status
        var dataUrl = res.dataUrl
        var currentPosition = res.currentPosition
        var duration = res.duration
        var downloadPercent = res.downloadPercent
        wx.playBackgroundAudio({
          dataUrl: dataUrl
        })
        console.log('res is:', res)
      }
    })
    
    this.setData({
      isPlaying: true
    })
  },
  pause: function () {
    wx.pauseBackgroundAudio();
    this.setData({
      isPlaying: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '正在播放'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    Common.asyncGetStorage('clickdata')//本地缓存
      .then(data => {
        console.log('clickdata is :', data);
        if(!data) return;
        that.setData({
          id: data.id,
          name: data.name,
          src: data.mp3Url,
          poster: data.picUrl,
          author: data.singer
        })
        return Common.playMusic(data.mp3Url, data.name, data.picUrl)
      })
      .then(status => {
        if(!status) return;
        console.log('id:',that.data.id)
        return Common.getLyric(that.data.id)
      })
      .then(lyricArr => {
        if(!lyricArr) return;
        console.log('lyricArr is :',lyricArr)
        that.setData({
          lyricArr: lyricArr
        })
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})