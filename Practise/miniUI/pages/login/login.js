// pages/login.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    storageValue1: '',
    storageValue2: '',
    list: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    var list = wx.getStorageSync('list')
    if (list) {
      // 本地有缓存
      that.setData({
        list: list
      })
    }
    wx.request({
      url: 'https://test.com/getproductlist',
      success: function(res) {
        if (res.statusCode == 200) {
          list = res.data.list
          that.setData({
            list: list
          })
          wx.setStorageSync('list', list) // 缓存
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  tapLogin: function() {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: 'https://test.com/login',
            data: { code: res.code },
            success: function(res) {
              if (res.statusCode == 200) {
                var data = res.data
                // 把Sessionid和过期时间放在内存中的全局对象和本地缓存里
                app.globalData.sessionId = data.sessionId
                wx.setStorageSync('SESSIONID', data.sessionId)

                // 假设登录态保持1天
                var expiredTime = +new Date() + 1*24*60*60*1000
                app.globalData.expiredTime = expiredTime
                wx.setStorageSync('EXPIREDTIMEE', expiredTime)
              }
            }
          })
        } else {
          console.log('获取用户登录态失败' + res.errMsg)
        }
      },
    })
  },

  storageWrite: function() {
    // 异步写入
    wx.setStorage({
      key: 'key1',
      data: 'value1',
      success: function() {
        console.log('写入value1成功')
      },
      fail: function() {
        console.log('写入value1错误')
      }
    })

    // 同步写入
    try {
      wx.setStorageSync('key2', 'value2')
      console.log('写入value2成功')
    } catch (e) {
      console.log('写入value2错误')
    }
  },

  storageRead: function() {
    // 异步获取
    let that = this
    wx.getStorage({
      key: 'key1',
      success: function(res) {
        console.log('获取到缓存:'+res.data)
        that.setData({ // 注意这里是异步回调，不能直接使用this，应该用一个临时变量承接一下。
          storageValue1: res.data
        })
      },
      fail: function() {
        console.log('获取缓存失败')
      }
    })

    // 同步获取
    try{
      var value2 = wx.getStorageSync('key2')
      console.log('获取到缓存:'+value2)
      this.setData({
        storageValue2: value2
      })
    } catch (e) {
      console.log('获取缓存失败')
    }
  },
})