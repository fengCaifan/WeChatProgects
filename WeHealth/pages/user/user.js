// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuItems: [
      {icon: "/assets/desc_test.png", title: "我的资料"},
      {icon: "/assets/desc_test.png", title: "团队患者"},
      {icon: "/assets/desc_test.png", title: "生成直播海报"},
      {icon: "/assets/desc_test.png", title: "线索收集"}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  clickUserHeader() {
    wx.showModal({
      title: '点击了头像昵称'
    })
  }
})