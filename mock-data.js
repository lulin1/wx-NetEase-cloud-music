var Mock = require('mock-min.js')
var Random = Mock.Random;
Random.extend({
  constellations: ['大海', '我的未来不是梦', '天天想你', '最爱的人伤我最深', '回忆', '执着', '自由歌', '健忘', '我期待', '序曲', '还以为', '他'],
  constellation: function (date) {
    return this.pick(this.constellations)
  }
})
Random.constellation()

export const searchSongs = Mock.mock({
  // 'result|1-10': [{
  //   // 属性 id 是一个自增数，起始值为 1，每次增 1
  //   'id|+1': 1
  // }]
  "result|15-20": [{
    "songs": [{
      'name': '@CONSTELLATION()',
      "id": 188057,
      "position": 6,
      "alias": [],
      "status": 0,
      "fee": 8,
      "copyrightId": 7002,
      "disc": "1",
      "no": 6,
      "artists": [{
        "name": "张雨生",
        "id": 6459,
        "picId": 0,
        "img1v1Id": 0,
        "briefDesc": "",
        "picUrl": "http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
        "img1v1Url": "http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
        "albumSize": 0,
        "alias": [],
        "trans": "",
        "musicSize": 0
      }],
      "album": {
        "name": "@CONSTELLATION()",
        "id": 19049,
        "type": "专辑",
        "size": 10,
        "picId": 106652627906340,
        "blurPicUrl": "http://p1.music.126.net/rTmIXtO0oWpu4RBT2wYTNg==/106652627906340.jpg",
        "companyId": 0,
        "pic": 106652627906340,
        "picUrl": "http://p1.music.126.net/rTmIXtO0oWpu4RBT2wYTNg==/106652627906340.jpg",
        "publishTime": 720547200000,
        "description": "",
        "tags": "",
        "company": "飞碟唱片",
        "briefDesc": "",
        "artist": {
          "name": "@CONSTELLATION()",
          "id": 0,
          "picId": 0,
          "img1v1Id": 0,
          "briefDesc": "",
          "picUrl": "http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
          "img1v1Url": "http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
          "albumSize": 0,
          "alias": [],
          "trans": "",
          "musicSize": 0
        }
      }
    }]
  }]
})
