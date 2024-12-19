// app.js
const auth = require('./common/utils/auth.js');

App({
  onLaunch: function(options) {
    wx.setTabBarStyle({
      color: '#cdcdcd',
      selectedColor: '#3350f9', // bfbfbf
      borderStyle: 'white'
    });

    auth.login().then(data => {
      console.log('登录成功:', data);
    }).catch(err => {
      console.log('登录失败:', err);
    });
  }
})
