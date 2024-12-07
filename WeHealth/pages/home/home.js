// pages/home/home.js
Page({
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  gotoCaseBookPage() {
    wx.navigateTo({
      url: '/pages/home/casebook/casebook',
    });
  },

  gotoApplyPage() {
    wx.navigateTo({
      url: '/pages/home/apply/apply',
    })
  },

})