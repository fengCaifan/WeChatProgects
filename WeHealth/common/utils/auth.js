const api = {
  login: 'https://your-backend-server.com/wxlogin',
  saveUserInfo: 'https://your-backend-server.com/saveUserInfo'
};


function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        if (res.code) {
          // 发送 res.code 到后台换取 openid, session_key, unionid
          wx.request({
            url: api.login,
            method: 'POST',
            data: { code: res.code },
            success: res => {
              if (res.statusCode === 200 && res.data) {
                wx.setStorageSync('session_key', res.data.session_key);
                wx.setStorageSync('openid', res.data.openid);
                resolve(res.data);
              } else {
                reject('登录失败');
              }
            },
            fail: err => {
              reject(err);
            }
          });
        } else {
          reject('登录失败！' + res.errMsg);
        }
      },
      fail: err => {
        reject(err);
      }
    });
  });
}

function getUserProfile() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: res => {
        wx.setStorageSync('userInfo', res.userInfo);
        // 可以将用户信息发送到后台
        wx.request({
          url: api.saveUserInfo,
          method: 'POST',
          data: {
            userInfo: res.userInfo,
            openid: wx.getStorageSync('openid')
          },
          success: res => {
            console.log('用户信息保存成功');
          },
          fail: err => {
            console.error('用户信息保存失败: ', err);
          }
        });
        resolve(res.userInfo);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}

module.exports = {
  login,
  getUserProfile
};