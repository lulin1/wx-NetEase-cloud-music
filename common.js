const func = {
  playMusic: function (url,title,pic) {
    return new Promise((resolve,reject) => {
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46',
        title: title,
        coverImgUrl: pic,
        success: function () {
          resolve(true);
          console.log('yessss');
        },
        fail: function () {
          reject(new Error('播放错误~~'));
        }
      })
    })
  },
  asyncGetStorage: function (key) {
    return new Promise((resolve,reject) => {
      wx.getStorage({
        key: key,
        success: function (res) {
          resolve(res.data)
        },
        fail: function (err) {
          reject(err)
        }
      })
    })
  },
  getLyric : function (id) {
    return new Promise((resolve,reject) => {
      console.log('id:',id);
      let url = 'https://neteasemusic.leanapp.cn/lyric';
      wx.request({
        url: url,
        data: {
          id: id
        },
        method: 'GET',
        success: function (res) {
          if(!res.data.lrc.lyric) return false;
          let lyric = res.data.lrc.lyric;
          let timeArr = lyric.split('[');
          let obj = {};
          let lyricArr = [];
          // key 为键  歌词为value
          timeArr.forEach((item) => {
            let key = parseInt(item.split(']')[0].split(':')[0]) * 60 + parseInt(item.split(']')[0].split(':')[1]);
            let value = item.split(']')[1];
            obj[key] = value;
          })
          for (let key in obj) {
            lyricArr.push(obj[key])
          }
          resolve(lyricArr)
        },
        fail: function (err) {
          reject(err)
        },
        complete: function (res) {
          // complete
        }
      })
    })
  }
}
module.exports = func;