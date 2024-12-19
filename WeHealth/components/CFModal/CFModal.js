// components/CFModal.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: '标题'
    },
    image: {
      type: String,
      value: ''
    },
    buttonText: {
      type: String,
      value: '确定'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal() {
      this.setData({
        visible: false
      });
    },

    onButtonTap() {
      this.triggerEvent('buttontap');
    },

    preventTouchMove() {
      // Prevent touch move
    }
  }
})