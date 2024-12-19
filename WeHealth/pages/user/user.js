// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuItems: [
      {icon: "/assets/desc_test.png", title: "我的资料"},
      {icon: "/assets/desc_test.png", title: "我的团队"},
      {icon: "/assets/desc_test.png", title: "我的二维码"}
    ],
    modalVisible: false
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
  },

  menuItemClicked(e) {
    const title = e.currentTarget.dataset.title;
    if (title == "我的团队") {
      wx.navigateTo({
        url: '/pages/user/team/team',
      })
    } else if (title == "我的二维码") {
      this.setData({
        modalVisible: true
      });
    } else {
      wx.showToast({
        title: `点击了 ${title}`,
        icon: "none",
        duration: 2000,
      });
    }
  },

  onModalButtonTap() {
    this.setData({
      modalVisible: false
    });
  }
})