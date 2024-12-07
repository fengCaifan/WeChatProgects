// app.js
App({
  globalData: {
    sessionId: null,
    expiredTime: 0
  },

  // 小程序初始化完成
  onLaunch: function(options) { 
    console.log( "onLaunch" + options) 
    var sessionId = wx.getStorageSync('SESSIONID')
    var expiredTime = wx.getStorageSync('EXPIREDTIME')
    var now = +new Date()

    if (now - expiredTime <= 1*24*60*60*1000) {
      // 如果还在有效期内，则重新取出缓存，恢复登录态sessionId
      this.globalData.sessionId = sessionId
      this.globalData.expiredTime = expiredTime
    }
  },
  // 小程序启动，或从后台进入前台
  onShow: function(options) { console.log(options) },
  // 小程序从前台进入后台
  onHide: function(options) { console.log(options) },
  // 小程序发生脚本错误
  onError: function(options) { console.log(options) },
})
