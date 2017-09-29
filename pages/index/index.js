//index.js
//获取应用实例
// var Mock = require('../../mock-min.js')
// import * as res from '../../mock-data.js';
// console.log(res.searchSongs.result)
var app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    tabs: ["个性推荐", "歌单", "主播电台", "排行榜"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    //   歌曲搜索的结果
    searchResult: []
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    let that = this
    // console.log(e.detail)
    this.setData({
      inputVal: e.detail.value
    });
    // let url = `http://localhost:3000/search?keywords=${e.detail.value}`
    wx.request({
        url: 'https://neteasemusic.leanapp.cn/search',
        data: {
            keywords: e.detail.value
        },
        method: 'GET',
        success: function (res) {
            let temp = []
            if(!res.data.result.songs){
                return ;
            }
            res.data.result.songs.forEach((song, index) => {
                temp.push({
                    id: song.id,
                    name: song.name,
                    mp3Url: song.mp3Url,
                    picUrl: song.album.picUrl,
                    singer: song.artists[0].name
                })
                that.setData({
                    searchResult: temp
                })
            })
            // 将搜索的结果存进缓存
            wx.setStorage({
                key: "searchResult", 
                data: temp
            })
            console.log('res is:', res)
            console.log('temp is: ',temp)
        },
        fail: function (res) {
            // fail
        },
        complete: function (res) {
            // complete

        }
    })

    // let temp = []
    // if (!res.searchSongs.result) {
    //   return;
    // }
    // res.searchSongs.result.forEach((Songs, index) => {
    //   Songs.songs.forEach((song, index) => {
    //     temp.push({
    //       id: song.id,
    //       name: song.name,
    //       mp3Url: song.mp3Url,
    //       picUrl: song.album.picUrl,
    //       singer: song.artists[0].name
    //     })
    //     that.setData({
    //       searchResult: temp
    //     })
    //   })
    // }) 
  },
  onShow: function () {
    wx.hideLoading()
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  toggleNavBar: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id,
      sliderOffset: e.currentTarget.offsetLeft
    })
  },
  tonow: function (event) {
    let songData = {
      id: event.currentTarget.dataset.id,
      name: event.currentTarget.dataset.name,
      mp3Url: event.currentTarget.dataset.songurl,
      picUrl: event.currentTarget.dataset.picurl,
      singer: event.currentTarget.dataset.singer
    }
    console.log('id is : ' + event.currentTarget.dataset.id)
    // 将当前点击的歌曲保存在缓存中
    wx.setStorageSync('clickdata', songData)
    wx.switchTab({
      url: '../now/now'
    })
  }
});
